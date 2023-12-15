{
  /* eslint-disable @next/next/no-img-element */
}

import React, { useCallback, useEffect } from "react";
import "./Blackbox.scss";
import { create } from "zustand";
import { FullscreenSVG } from "@/assets/FullscreenSVG";

interface BlackboxState {
  images: string[];
  isShowing: boolean;
  show: (idx: number) => void;
  hide: () => void;

  selectedIdx: number;
  selectImageByIdx: (idx: number) => void;

  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;

  toggleHeader: () => void;
  isHeaderShow: boolean;
}

export const useBlackboxStore = create<BlackboxState>((set) => ({
  images: [],
  isShowing: false,
  show: (idx: number) => set({ isShowing: true, selectedIdx: idx }),
  hide: () => set({ isShowing: false }),

  selectedIdx: 0,
  selectImageByIdx: (idx: number) => set({ selectedIdx: idx }),

  zoomLevel: 1,
  zoomIn: () => set((state) => ({ zoomLevel: state.zoomLevel * 2 })),
  zoomOut: () => set({ zoomLevel: 1 }),

  toggleHeader: () => set((state) => ({ isHeaderShow: !state.isHeaderShow })),
  isHeaderShow: false,
}));

interface Props {
  images: string[];
}
export const Blackbox: React.FC<Props> = ({ images }) => {
  const { isShowing, selectedIdx, selectImageByIdx, hide, toggleHeader, isHeaderShow } = useBlackboxStore();

  const selectNext = useCallback(
    (idx: number) => {
      const nextIdx = idx + 1;
      if (nextIdx >= images.length) return selectImageByIdx(0); // cycle back to first image
      selectImageByIdx(nextIdx);
    },
    [images.length, selectImageByIdx]
  );

  const selectPrev = useCallback(
    (idx: number) => {
      const prevIdx = idx - 1;
      if (prevIdx < 0) return selectImageByIdx(images.length - 1); // cycle back to last image
      selectImageByIdx(prevIdx);
    },
    [images.length, selectImageByIdx]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") selectNext(selectedIdx);
      if (e.key === "ArrowLeft") selectPrev(selectedIdx);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectNext, selectPrev, selectedIdx]);

  const showFullscreen = useCallback(() => {
    const element: any = document.documentElement;
    if (!element) return;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }, []);

  if (!isShowing) return null;

  return (
    <section
      className="blackbox-container"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        hide();
      }}
    >
      {isHeaderShow && (
        <div
          className="header"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="left">
            {selectedIdx + 1}/{images.length}
          </div>
          <div className="right">
            <FullscreenSVG onClick={showFullscreen} />
            <div className="close" onClick={hide}>
              &times;
            </div>
          </div>
        </div>
      )}
      <div
        className="content"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="arrow" onClick={() => selectPrev(selectedIdx)}>
          &#8592;
        </div>
        <img onClick={toggleHeader} className="image" src={images[selectedIdx]} alt="" />
        <div className="arrow" onClick={() => selectNext(selectedIdx)}>
          &rarr;
        </div>
      </div>
    </section>
  );
};

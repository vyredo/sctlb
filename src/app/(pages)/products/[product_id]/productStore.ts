import { Product } from "@/app/model/Product";
import { create } from "zustand";

interface ProductStoreState {
  product: Product | undefined;
  viewProductById: (p: Product) => void;
  unviewProduct: () => void;

  numberOfProductToCart: number;
  incNumberProduct: (stock: number) => void;
  decNumberProduct: () => void;
}

export const useProductStore = create<ProductStoreState>()((set) => ({
  product: undefined,
  viewProductById: (p: Product) => set({ product: p }),
  unviewProduct: () => set({ product: undefined }),

  numberOfProductToCart: 1,
  incNumberProduct: (stock: number) =>
    set((state) => {
      if (state.numberOfProductToCart < stock) {
        // cannot be more than stock
        return { numberOfProductToCart: state.numberOfProductToCart + 1 };
      }
      return { numberOfProductToCart: stock };
    }),
  decNumberProduct: () =>
    set((state) => {
      if (state.numberOfProductToCart > 1) {
        // cannot be less than 1
        return { numberOfProductToCart: state.numberOfProductToCart - 1 };
      }
      return { numberOfProductToCart: 1 };
    }),
}));

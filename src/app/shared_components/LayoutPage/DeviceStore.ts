import { create } from "zustand";

export enum Device {
  Mobile = <any>"mobile",
  Tablet = <any>"tablet",
  Desktop = <any>"desktop",
}

interface DeviceStoreState {
  device: Device;
  setDevice: (device: Device) => void;
}

export const useDeviceStore = create<DeviceStoreState>()((set) => ({
  device: Device.Mobile,
  setDevice: (device: Device) => set({ device }),
}));

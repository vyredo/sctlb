import { create } from "zustand";

export enum Device {
  Mobile = <any>0,
  Tablet = <any>1,
  Desktop = <any>2,
}

interface DeviceStoreState {
  device: Device;
  setDevice: (device: Device) => void;
}

export const useDeviceStore = create<DeviceStoreState>()((set) => ({
  device: Device.Mobile,
  setDevice: (device: Device) => set({ device }),
}));

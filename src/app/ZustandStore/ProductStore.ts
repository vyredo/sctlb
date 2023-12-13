import { create } from "zustand";
import { Product } from "./model/Product";
import { useShallow } from "zustand/react/shallow";

interface ProductsStoreState {
  products: Product[];
  updateProducts: (p: Product) => void;
  deleteProducts: (p: Product) => void;
  addProducts: (p: Product) => void;
  clearProducts: () => void;
}

// todo: write unit tes for this
export const useProductsStore = create<ProductsStoreState>()((set) => ({
  products: [],
  updateProducts: (p: Product) =>
    set((state) => {
      const index = state.products.findIndex((x) => x.id === p.id);
      if (index === -1) {
        return { products: [...state.products, p] };
      }
      state.products[index] = p;
      return { products: state.products };
    }),
  deleteProducts: (p: Product) => set((state) => ({ products: state.products.filter((x) => x.id !== p.id) })),
  addProducts: (p: Product) => set((state) => ({ products: [...state.products, p] })),
  clearProducts: () => set({ products: [] }, true),
}));

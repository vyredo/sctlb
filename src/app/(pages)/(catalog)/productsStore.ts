import { create } from "zustand";
import { Product } from "../../Type/Product";

interface ProductsStoreState {
  products: Product[];
  updateProducts: (p: Product) => void;
  deleteProducts: (p: Product) => void;
  addProduct: (p: Product) => void;
  addProducts: (p: Product[]) => void;
  clearProducts: () => void;
}

// todo: write unit tes for this
export const useProductsStore = create<ProductsStoreState>()((set, get) => ({
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
  addProduct: (p: Product) => {
    // upsert
    const { products, updateProducts } = get();
    const index = products.findIndex((x) => x?.id === p.id);
    if (index === -1) {
      set((state) => ({ products: [...state.products, p] }));
    } else {
      updateProducts(p);
    }
  },
  addProducts: (p: Product[]) => set((state) => ({ products: [...state.products, ...p] })),
  clearProducts: () => set({ products: [] }, true),
}));

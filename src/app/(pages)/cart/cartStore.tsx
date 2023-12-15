import { create } from "zustand";

interface CartState {
  products: {
    id: number;
    quantity: number;
  }[];
  getTotal: () => number;
  add: (id: number) => void;
  removeAllById: (id: number) => void;
  removeOneById: (id: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  products: [],
  getTotal: () => {
    const products = get().products;
    return products.reduce((acc, curr) => {
      const product = products.find((product) => product.id === curr.id);
      if (!product) return acc;
      return acc + product.quantity;
    }, 0);
  },
  clear: () => set({ products: [] }),
  removeAllById: (id: number) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
  removeOneById(id) {
    set((state) => {
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          return { products: state.products.filter((product) => product.id !== id) };
        }
        return { products: [...state.products] };
      }
      return state;
    });
  },
  add(id: number) {
    set((state) => {
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity += 1;
        return { products: [...state.products] };
      }
      return { products: [...state.products, { id, quantity: 1 }] };
    });
  },
}));

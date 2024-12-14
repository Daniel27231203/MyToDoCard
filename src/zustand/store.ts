import { create } from "zustand";

interface LocalData {
  basket: ProductBasket[];
  addToCart: (value: ProductBasket) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  deleteMap: (id: number) => void;
  deleteAll: () => void;
  search: string;
  setSearch: (value: string) => void;
}

const useStore = create<LocalData>((set) => ({
  basket: JSON.parse(localStorage.getItem("basket") || "[]"),

  addToCart: (value) =>
    set((state) => {
      const existingItem = state.basket.find((item) => item.id === value.id);

      let updatedBasket;
      if (existingItem) {
        updatedBasket = state.basket.map((item) =>
          item.id === value.id
            ? { ...item, quantity: item.quantity + value.quantity }
            : item
        );
      } else {
        updatedBasket = [...state.basket, value];
      }

      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      return { basket: updatedBasket };
    }),

  increase: (id) =>
    set((state) => {
      const updatedBasket = state.basket.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      return { basket: updatedBasket };
    }),

  decrease: (id) =>
    set((state) => {
      const updatedBasket = state.basket
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      return { basket: updatedBasket };
    }),
  deleteMap: (id) =>
    set((state) => {
      const updatedBasket = state.basket.filter((item) => item.id !== id);
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      return { basket: updatedBasket };
    }),
  deleteAll: () => {
    set(() => {
      localStorage.removeItem("basket");
      return { basket: [] };
    });
  },
  search: "",
  setSearch: (value) =>
    set(() => {
      return { search: value };
    }),
}));

export default useStore;

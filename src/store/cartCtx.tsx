import { useContext, createContext, type ReactNode, useState } from "react";
type ShoppingCartProviderProps = {
  children: ReactNode;
};
type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  mainImage: string;
  images: { product_id: number; source: string; image_id: number }[];
  isDigital: boolean;
  quantity: number;
  categories: { id: number; name: string }[];
};
type CartItem = {
  product: Product;
  quantity: number;
};

type ShoppingCartContext = {
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (product: Product) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getItemQuantity = (id: number) => {
    return (
      cartItems.find((item) => item.product.product_id === id)?.quantity ?? 0
    );
  };

  const increaseCartQuantity = (product: Product) => {
    setCartItems((currItems) => {
      if (
        currItems.find(
          (item) => item.product.product_id === product.product_id,
        ) == null
      ) {
        return [...currItems, { product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.product.product_id === product.product_id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.product.product_id === id)?.quantity === 1
      ) {
        return currItems.filter((item) => item.product.product_id !== id);
      } else {
        return currItems.map((item) => {
          if (item.product.product_id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.product.product_id !== id);
    });
  };

  const contextValue: ShoppingCartContext = {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
  };
  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

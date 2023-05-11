import { createContext, ReactNode } from 'react';
import { CartItemModel } from '../models/CartItemModel';
import { LocalStorageKey } from '../models/LocalStorageKey';
import { useLocalStorage } from 'usehooks-ts';

type ShoppingCartContextType = {
  cartQuantity: number;
  cartItems: CartItemModel[];
  geItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

export type ShoppingCartProviderProps = {
  children: ReactNode;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItemModel[]>(
    LocalStorageKey.shoppingCart,
    [],
  );

  function geItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...cartItems, { id, quantity: 1 }];
      }

      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });
    });
  }

  function decreaseQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      }

      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });
    });
  }
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );
  function removeFromCart(id) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        geItemQuantity,
        cartQuantity,
        cartItems,
        increaseQuantity,
        removeFromCart,
        decreaseQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

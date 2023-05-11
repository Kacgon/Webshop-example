import { useContext } from 'react';
import { ShoppingCartContext } from '../Contexts/ShoppingCartContext';

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

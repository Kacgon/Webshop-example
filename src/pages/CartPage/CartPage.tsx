import { Stack } from 'react-bootstrap';
import { CartItem } from '../../components/CartItem/CartItem';
import { useShoppingCart } from '../../hooks/use-shopping-cart.hook';

export function CartPage() {
  const { cartItems } = useShoppingCart();

  return (
    <>
      <section>
        <Stack>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
      </section>
    </>
  );
}

import { Grid, Link } from '@material-ui/core';
import { Button, Stack } from 'react-bootstrap';
import useApiHook from '../../hooks/use-api.hook';
import { useShoppingCart } from '../../hooks/use-shopping-cart.hook';
import './CartItem.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type CartItemProps = {
  quantity: number;
  id: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const ENDPOINT = `/products/`;
  const { data } = useApiHook(ENDPOINT);
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useShoppingCart();
  const item = data?.products.find((i) => i.id === id);
  const CurrentPrice = JSON.parse(localStorage.getItem('price'));

  function fullDecrease() {
    decreaseQuantity(item.id);
    localStorage.setItem('price', CurrentPrice - item.price);
  }
  function fullIncrease() {
    increaseQuantity(item.id);
    localStorage.setItem('price', CurrentPrice + item.price);
  }
  function fullRemove() {
    removeFromCart(item.id);
    localStorage.setItem('price', CurrentPrice - item.price * quantity);
  }
  return (
    item && (
      <>
        <section className="full-item-and-widgets">
          <section className="item-with-buttons">
            <Grid item lg={6} xs={8}>
              <div className="item">
                <Stack direction="horizontal" className="stack-of-item" gap={2}>
                  <img src={item.images[0]} className="cart-item-img"></img>
                  <p className="title">{item.title}</p>
                  <div className="quantity-controls">
                    <span className="decrease-item">
                      <RemoveIcon fontSize="medium" onClick={fullDecrease} />
                    </span>
                    <p>{quantity}</p>
                    <span className="increase-item">
                      <AddIcon fontSize="medium" onClick={fullIncrease} />
                    </span>
                  </div>
                  <div className="price-and-bin">
                    <p className="price-of-item">
                      {(item.price * quantity).toFixed(2)} zł
                    </p>
                    <p className="bin-icon">
                      <DeleteForeverIcon
                        fontSize="large"
                        onClick={fullRemove}
                      />
                    </p>
                  </div>
                </Stack>
              </div>
            </Grid>
            <div className="bottom-texts">
              <div className="back-and-icon">
                <p onClick={fullRemove}>CLEAR CART</p>{' '}
                <NavigateNextIcon fontSize="large" onClick={fullRemove} />
              </div>
              <div className="back-and-icon">
                <Link underline="none" color="inherit" href={'/?page=1'}>
                  <p>BACK TO MAIN PAGE</p>
                </Link>
                <Link underline="none" color="inherit" href={'/?page=1'}>
                  <NavigateNextIcon fontSize="large" />
                </Link>
              </div>
            </div>
          </section>
          <div className="widgets">
            <Grid item lg={12}>
              <div className="buy-now-total-cost">
                <p>
                  <span className="total">Total cost:</span>{' '}
                  <span className="price">
                    {(item.price * quantity).toFixed(2)} zł
                  </span>
                </p>
                <button>BUY NOW</button>
              </div>
            </Grid>
            <div className="protection">
              <p className="umbrella-icon">
                <BeachAccessIcon />
              </p>
              <p>Your payment is protected</p>
            </div>
          </div>
        </section>
      </>
    )
  );
}

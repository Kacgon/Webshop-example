import { useSearchParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { ProductProps } from '../MainPage/MainPage';
import useApiHook from '../../hooks/use-api.hook';
import '../ProductPage/ProductPage.css';
import { useState, useEffect } from 'react';
import { useShoppingCart } from '../../hooks/use-shopping-cart.hook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const ENDPOINT = `/products/${searchParam.get('id')}`;
  const { data } = useApiHook(ENDPOINT);
  const [img, setImg] = useState(``);
  const { geItemQuantity, increaseQuantity } = useShoppingCart();
  const quantity = geItemQuantity(data?.title);
  const CurrentPrice = JSON.parse(localStorage.getItem('price'));

  function notify() {
    toast.warning('Dodano do koszyka!', {
      icon: '✔️',
    });
  }

  function fullAdd() {
    notify();
    increaseQuantity(data?.id);
    localStorage.setItem('price', CurrentPrice + data?.price);
  }

  useEffect(() => {
    setImg(`${data?.images[0]}`);
  }, [data?.images[0]]);

  const changeMainImg = (num: string) => {
    setImg(num);
  };

  return (
    <>
      <section className="whole-main-page">
        {data && (
          <Grid container>
            <div className="product-page-card">
              <img className="product-page-img" src={img} alt={img}></img>
              <li>
                <ul>
                  <h3 className="product-page-card-title">{data.title}</h3>
                </ul>
                <ul>
                  <p>
                    <span className="header-of-infos">Category:</span>{' '}
                    {data.category}{' '}
                    <span className="header-of-infos">Rating:</span>{' '}
                    {data.rating}
                  </p>
                </ul>
                <ul>
                  <p>{data.description}</p>
                </ul>
                <ul>
                  <h4>Price: {data.price} zł</h4>
                </ul>
                <ul>
                  <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                  <button className="add-btn" onClick={fullAdd}>
                    Add to cart
                  </button>
                </ul>
                <ul className="small-imgs-container">
                  {data.images.map((image) => {
                    return (
                      <img
                        className="product-page-small-imgs"
                        onClick={() => changeMainImg(image)}
                        src={image}
                      ></img>
                    );
                  })}
                </ul>
              </li>
            </div>
          </Grid>
        )}
      </section>
    </>
  );
};

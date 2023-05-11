import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Link } from '@material-ui/core';
import useApiHook from '../../hooks/use-api.hook';

export const SearchPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const ENDPOINT = `/products/search?q=${searchParam.get('q')}`;
  const { data } = useApiHook(ENDPOINT);

  return (
    <>
      <section className="whole-main-page">
        {data?.products ? (
          data.products.map((product: { ProductProps: any }) => {
            return (
              <>
                <Grid container xl={4} lg={4}>
                  <div className="single-prod-mainpage">
                    <Link href={`/product/?id=${+product.id}`}>
                      <img
                        className="single-product-img"
                        src={product.images[0]}
                      ></img>
                    </Link>
                    <p>{product.title}</p>
                    <p>Cena: {product.price} zł</p>
                    <Link href={`/product/?id=${+product.id}`}>
                      <button className="show-btn">Zobacz</button>
                    </Link>
                  </div>
                </Grid>
              </>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
};

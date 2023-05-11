import React from 'react';
import { v4 as uuid } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { Grid, Link } from '@material-ui/core';
import { config } from '../../config';
import Pagination from '@mui/material/Pagination';
import './MainPage.css';
import useApiHook from '../../hooks/use-api.hook';

export type ProductProps = {
  images?: string[];
  title: string | null;
  price: number | null;
  id: number;
};

export const productsPerPage = 6;

export const MainPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const ENDPOINT = `/products?limit=${productsPerPage}&skip=${
    productsPerPage * searchParam.get('page')
  }`;

  const { data } = useApiHook(ENDPOINT);

  const handleChange = (previous: any, next: any) => {
    setSearchParam({ page: previous });
    setSearchParam({ page: next });
  };

  const quantityOfPages = (data?.total / productsPerPage) >> 0;

  return (
    <>
      <section className="whole-main-page">
        {data?.products ? (
          data.products.map((product: { ProductProps: any }) => {
            return (
              <>
                <Grid container xl={4}>
                  <div className="single-prod-mainpage">
                    <Link href={`/product/?id=${+product.id}`}>
                      <img
                        className="single-product-img"
                        src={product.images[0]}
                      ></img>
                    </Link>
                    <p key={uuid}>{product.title}</p>
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

        <Pagination
          count={quantityOfPages}
          boundaryCount={1}
          siblingCount={1}
          variant="outlined"
          color="primary"
          shape="rounded"
          className="pages-btns"
          hidePrevButton
          hideNextButton
          onChange={handleChange}
        ></Pagination>
      </section>
    </>
  );
};

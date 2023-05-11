import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './components/SearchPage/SearchPage';
import { CartPage } from './pages/CartPage/CartPage';
import { MainPage } from './pages/MainPage/MainPage';
import { ProductPage } from './pages/ProductPage/ProductPage';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

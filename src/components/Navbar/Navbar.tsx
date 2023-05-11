import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { useShoppingCart } from '../../hooks/use-shopping-cart.hook';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const [phrase, setPhrase] = useState();
  const { cartQuantity } = useShoppingCart();
  const [cartinfo, setCartInfo] = useState<string | number>(0);
  const navigate = useNavigate();
  const goToSearch = () => navigate(`/search/?q=${phrase}`);
  const CurrentCart = JSON.parse(localStorage.getItem('price'));

  function onChange(event: { target: { value: any } }) {
    setPhrase(event.target.value);
  }
  useEffect(() => {
    if (cartQuantity == 0) {
      setCartInfo('pusty :(');
    } else {
      setCartInfo(CurrentCart);
    }
  });

  return (
    <div className="full-search">
      <Nav className="nav-bar">
        <Nav.Link className="NavLink" to="/?page=1" as={NavLink}>
          <p>Strona główna</p>
        </Nav.Link>
        <Nav.Link className="NavLink" to="/cart" as={NavLink}>
          <p>
            Koszyk : {cartinfo} (pozycje : {cartQuantity})
          </p>
        </Nav.Link>
        <div className="searchbar">
          <p className="small-line"></p>
          <div>
            <input
              type="text"
              
              onChange={onChange}
              placeholder="Szukaj..."
            ></input>
          </div>
          <div>
            <SearchIcon className="search-icon" onClick={goToSearch} />
          </div>
        </div>
      </Nav>
    </div>
  );
}

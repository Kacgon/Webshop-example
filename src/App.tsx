import './App.css';
import { Router } from './Router';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ShoppingCartProvider } from './Contexts/ShoppingCartContext';

function App() {
  return (
    <ShoppingCartProvider>
      <>
        <section className="fullpage">
          <Header />
          <Router />
          <Footer />
        </section>
      </>
    </ShoppingCartProvider>
  );
}

export default App;

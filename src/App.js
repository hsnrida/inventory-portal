import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ItemsPage from './pages/ItemsPage';

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route exact path="/products" element={<ProductsPage/>} />
            <Route exact path="/products/:productId/items" element={<ItemsPage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
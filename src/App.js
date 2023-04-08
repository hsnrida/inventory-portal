import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route exact path="/home" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
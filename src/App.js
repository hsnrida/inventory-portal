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
    <div className=" flex items-center justify-center ">
    <div className="">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route exact path="/home" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;
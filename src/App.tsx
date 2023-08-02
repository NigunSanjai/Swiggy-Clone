import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Menupage from './components/MenuPage/Menupage';
import Cartpage from './components/Cartpage/Cartpage';

// Four main Routing pages which are Home, Dashboard, MenuPage and CartPage

// Import the functions you need from the SDKs you need
function App() {
  sessionStorage.setItem('userloggedin', 'false');
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* Route for Home Page */}
            <Route path="/" element={<Home></Home>}></Route> 
            {/* Route for Dashboard Page */}
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            {/* Route for Resturant Page */}
            <Route
              path="/resturantmenu"
              element={<Menupage></Menupage>}
            ></Route>
            {/* Route for Cart Page */}
            <Route path="/cart" element={<Cartpage></Cartpage>}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;

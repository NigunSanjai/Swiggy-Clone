import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Menupage from './components/MenuPage/Menupage';
import Cartpage from './components/Cartpage/Cartpage';

// Import the functions you need from the SDKs you need
function App() {
  sessionStorage.setItem('userloggedin', 'false');
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route
              path="/resturantmenu"
              element={<Menupage></Menupage>}
            ></Route>
            <Route path="/cart" element={<Cartpage></Cartpage>}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;

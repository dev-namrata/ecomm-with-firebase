import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigation,
} from 'react-router-dom';
import { CartProvider } from 'react-use-cart';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { auth } from './firebase_setup/firebase';

import { ForgotPassword, Home, Login, Signup } from './pages';
import { Cart, CrousalImg, Footer, Header } from './Components';

function App() {
  const defaultTheme = createTheme();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        console.log(user, 'user');

        setUserName(user?.displayName);
      }
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Header user={userName} />
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Home name={userName} />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/reset" element={<ForgotPassword />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      {/* <CrousalImg /> */}
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store} from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './header';
import Home from './components/home';
import Login from './components/Authentication/login/login';
import Register from './components/Authentication/register/register';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
  <Router>
      <Header />
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
      </Routes>
  </Router>
  </PersistGate>
  </Provider>
);


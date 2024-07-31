import './index.css';
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
import MyAccount from './components/profile/myaccount';
import ManageProfile from './components/profile/manageprofile/manageprofile';
import ProtectedRoutes from './utils/protectedRoutes';
import ChangePassword from './components/profile/manageprofile/change-password';
import AddAddress from './components/profile/address/addAddress';
import ViewEducation from './components/profile/education/view-education';
import AddEducation from './components/profile/education/add';
import ViewAddress from './components/profile/address/viewAddress';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
  <Router>
      <Header />
      <Routes>
          <Route element={<ProtectedRoutes />}>
              <Route path='/myaccount' element={<MyAccount />}></Route>
              <Route path='/myaccount/manage-profile' element={<ManageProfile />}></Route>
              <Route path='/myaccount/manage-profile/change-password' element={<ChangePassword />}></Route>
              <Route path='/myaccount/manage-address' element={<ViewAddress />}></Route>
              <Route path='/myaccount/manage-address/add-address' element={<AddAddress />}></Route>
              <Route path='/myaccount/manage-address/edit-address' element={<AddAddress />}></Route>
              <Route path='/myaccount/manage-education' element={<ViewEducation />}></Route>
              <Route path='/myaccount/manage-education/add' element={<AddEducation />}></Route>
          </Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
      </Routes>
  </Router>
  </PersistGate>
  </Provider>
);


import logo from './logo.svg';
import './App.css';
import store from "./app/features/store"

import { Provider } from 'react-redux';
import LoginPage from './app/pages/Login';
import RegisterPage from './app/pages/Register';
import PageNotFound from './app/pages/NotFound';
import PageAccount from './app/pages/Account';
import Profile from './app/components/Profile';
import { ProtectedRouteAuth, ProtectedRouteUser } from './app/ProtectedRoute';
import Address from './app/components/Address';



const { BrowserRouter, Routes, Route } = require("react-router-dom");
function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <BrowserRouter>
                    <Routes>
                         
                        <Route path="/" element={ <ProtectedRouteAuth> <LoginPage /> </ProtectedRouteAuth> } />
                        <Route path="/login" element={ <ProtectedRouteAuth> <LoginPage /> </ProtectedRouteAuth>} />
                        <Route path="/register" element={<ProtectedRouteAuth> <RegisterPage /> </ProtectedRouteAuth>} />
                        <Route path="/account" element={ <ProtectedRouteUser> <PageAccount /> </ProtectedRouteUser> }>
                          <Route path="" element={<Profile />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="address" element={<Address />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                  
                    </Routes>
                 </BrowserRouter>

        </Provider>
    </div>
  );
}

export default App;

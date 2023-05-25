import { Route, Routes } from "react-router-dom";
import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "redux/auth/operations";
import { useAuth } from "hooks/useAuth";
import { Layout } from "./Layout/Layout";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";

const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts/Contacts'));
const HomePage = lazy(() => import('../pages/Home/Home'));

export const App = () => {

  const dispatch = useDispatch();
  const { isRefredhing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefredhing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage/>} />
        <Route 
          path="/register" 
          element={ 
            <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
          } 
        />
        <Route 
          path="/login" 
          element={ 
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          } 
        />
        <Route 
          path="/contacts" 
          element={ 
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          } 
        />
      </Route>
    </Routes>
  )
}

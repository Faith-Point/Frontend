import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/user';
import CountryPage from './pages/Addresses/Country/index';
import StatePage from './pages/Addresses/State/index';
import CityPage from './pages/Addresses/City/index';
import AddressPage from './pages/Addresses/Address/index';
import RolePage from './pages/Role';
import FaithPointImagePage from './pages/faithPoint/Image/index';
import FaithPointRatingPage from './pages/faithPoint/Rating/index';
import FaithPointReligionsPage from './pages/faithPoint/Religions/index';
import FaithPointSchedulePage from './pages/faithPoint/Schedule/index';
import FaithPointServicePage from './pages/faithPoint/Services/index';
import FaithPointSubscriptionPage from './pages/faithPoint/Subscription/index';
import ContactPage from './pages/Contacts/Contact/index';
import SocialMediaPage from './pages/Contacts/SocialMedia/index';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { token } = useAuth();
  return token ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/country"
            element={<PrivateRoute element={<CountryPage />} />}
          />
          <Route
            path="/state"
            element={<PrivateRoute element={<StatePage />} />}
          />
          <Route
            path="/city"
            element={<PrivateRoute element={<CityPage />} />}
          />
          <Route
            path="/address"
            element={<PrivateRoute element={<AddressPage />} />}
          />
          <Route
            path="/role"
            element={<PrivateRoute element={<RolePage />} />}
          />
          <Route
            path="/faithPointImage"
            element={<PrivateRoute element={<FaithPointImagePage />} />}
          />
          <Route
            path="/faithPointRating"
            element={<PrivateRoute element={<FaithPointRatingPage />} />}
          />
          <Route
            path="/faithPointReligions"
            element={<PrivateRoute element={<FaithPointReligionsPage />} />}
          />
          <Route
            path="/faithPointSchedule"
            element={<PrivateRoute element={<FaithPointSchedulePage />} />}
          />
          <Route
            path="/faithPointService"
            element={<PrivateRoute element={<FaithPointServicePage />} />}
          />
          <Route
            path="/faithPointSubscription"
            element={<PrivateRoute element={<FaithPointSubscriptionPage />} />}
          />
          <Route
            path="/contact"
            element={<PrivateRoute element={<ContactPage />} />}
          />
          <Route
            path="/socialMedia"
            element={<PrivateRoute element={<SocialMediaPage />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

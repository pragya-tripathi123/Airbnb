import './App.css'
import {Route,Routes} from "react-router-dom";
import Indexpage from './pages/Indexpage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Indexpage />}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/account" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path="/account/places"
            element={<PlacesPage></PlacesPage>}
          ></Route>
          <Route
            path="/account/places/new"
            element={<PlacesFormPage></PlacesFormPage>}
          ></Route>
          <Route
            path="/account/places/:id"
            element={<PlacesFormPage></PlacesFormPage>}
          ></Route>
          <Route path="/place/:id" element={<PlacePage></PlacePage>}></Route>
          <Route
            path="/account/bookings"
            element={<BookingsPage></BookingsPage>}
          ></Route>
          <Route
            path="/account/bookings/:id"
            element={<BookingPage></BookingPage>}
          ></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App

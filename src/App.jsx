import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import SpecificVenue from './pages/SpecificVenuePage';
import NewVenue from './pages/NewVenuePage';
import Layout from './components/Layout/Layout.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/venues/:id' element={<SpecificVenue />} />
          <Route path='/profile/newvenue' element={<NewVenue />} />
        </Route>
      </Routes>
      <ToastContainer className='w-48' />
    </div>
  );
}

export default App;

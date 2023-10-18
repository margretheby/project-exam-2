import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import Layout from './components/Layout/Layout.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

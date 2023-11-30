import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/**
 * A Layout component that wraps the structure of the application
 * @returns {JSX.Element}} Layout
 */
function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
  }
  
  export default Layout;
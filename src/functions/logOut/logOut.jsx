import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Logs out the user
 * Removes login information from localStorage
 */
function logOut() {
    toast.success('You are logged out.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
    const loggedOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    
    setTimeout(loggedOut, 3000);
    
}

export default logOut;

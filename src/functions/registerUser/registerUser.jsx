import { registerUrl } from '../../variables/api.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * User registration information is sent to the API using a POST request
 * @param {object} user information sent to the API in the request body
 * @returns promise that resolves with the registration attempt, and displays success/error messages
 */
async function registerUser(user) {
    try {
        const response = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json();
        
        // checks if the API response is successful
        if (response.ok) {
            const { name } = responseData;

            toast.success(`Success! You are now registered. Welcome, ${name}!`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            function locateToLogin() {
                window.location.href = "login"
            }

            setTimeout(locateToLogin, 3000);
            
            return { name };
        } else {
            // Log the error details
            console.error('Registration failed:', responseData);

            return { success: false, error: 'Ooobs! Something went wrong, please try again.' };
        } 
    } catch (error) {
        // Log the error details
        console.error(error);

        return { success: false, error: 'Something went wrong, please try again.' };
    }
}


export default registerUser;
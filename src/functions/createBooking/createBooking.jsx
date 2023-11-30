import { accessToken } from '../../variables/localStorage.jsx'
import { bookingsUrl } from '../../variables/api.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Sends a POST request to the API to create a new booking
 * @param {Object} booking data to be sent in the request body
 * @returns a promise that resolves when the booking is attempted
 */
async function createBooking(booking) {
    try {
        const response = await fetch(bookingsUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(booking)
        });

        if (response.ok) {
            toast.success('Success! Your booking was successful', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
            });
        } else {
            toast.error('Ooobs! Something went wrong. Are you logged in? If so, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
            });
        }

    } catch(error) {
        toast.error('Something went wrong, please try again.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    }
}

export default createBooking;
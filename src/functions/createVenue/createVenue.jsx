import { accessToken } from '../../variables/localStorage.jsx'
import { venueUrl } from '../../variables/api.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Sends a POST request to the API to create a new venue
 * @param {Object} venue data to be sent in the request body
 * @returns a promise that resolves when the venue creation is attempted
 */
async function createVenue(venue) {
    try {
        const response = await fetch(venueUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(venue)
        });

        const result = await response.json();

        if (response.ok) {
            toast.success('Success! Your venue is now available for bookings.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
            });
        } else {
            toast.error('Ooobs! Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
            });
        }

        return result;
    } catch(error) {
        return error;
    }
}

export default createVenue;
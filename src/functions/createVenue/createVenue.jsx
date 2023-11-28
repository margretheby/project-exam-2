import { accessToken } from '../../variables/localStorage.jsx'
import { venueUrl } from '../../variables/api.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        console.log(result);
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
        console.log(error);
    }
}

export default createVenue;
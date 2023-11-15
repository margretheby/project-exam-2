import { accessToken } from '../../variables/localStorage.jsx'
import { bookingsUrl } from '../../variables/api.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            console.log(response);
            toast.error('Ooobs! Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
            });
        }

    } catch(error) {
        console.log(error);
    }
}

export default createBooking;
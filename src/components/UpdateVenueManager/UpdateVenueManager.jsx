import { accessToken } from '../../variables/localStorage.jsx'
import { profileDataUrl } from '../../variables/api.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function UpdateVenueManager() {
    try {
        const updateVenueManagerStatus = {
            venueManager: true,
        }

        const response = await fetch(profileDataUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(updateVenueManagerStatus)
        });

        const result = await response.json();

        if(response.ok) {
            toast.success('Success! You are now a venue manager.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });          
        } else {
            toast.error('Ooobs! Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }

        return result;
    } catch(error) {
        toast.error('Something went wrong, please try again.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    }
}

export default UpdateVenueManager;
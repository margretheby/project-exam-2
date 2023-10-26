import { accessToken } from '../../variables/localStorage.jsx'
import { profileDataUrl } from '../../variables/api.jsx'

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

        return result;
    } catch(error) {
        console.log(error);
    }
}

export default UpdateVenueManager;
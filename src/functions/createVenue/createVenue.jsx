import { accessToken } from '../../variables/localStorage.jsx'
import { venueUrl } from '../../variables/api.jsx'

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

        return result;
    } catch(error) {
        console.log(error);
    }
}

export default createVenue;
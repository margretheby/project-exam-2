import { accessToken } from '../../variables/localStorage.jsx'

async function updateVenue(url, updatedInfo) {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(updatedInfo)
        });

        const result = await response.json();
        console.log(result);

        return result;
    } catch(error) {
        console.log(error);
    }
}

export default updateVenue;
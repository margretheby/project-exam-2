import { accessToken } from '../../variables/localStorage.jsx'

/**
 * Updates venue information using a PUT request to an url
 * @param {string} url endpoint for updating the venue
 * @param {object} updatedInfo information to be sent in the request body
 * @returns a promise that resolves to the JSON response from the server
 */
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

        return result;
    } catch(error) {
        return error;
    }
}

export default updateVenue;
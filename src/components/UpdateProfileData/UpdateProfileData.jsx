import { accessToken } from '../../variables/localStorage.jsx'
import { profileMediaUpdateUrl } from '../../variables/api.jsx'

async function UpdateProfileMedia(avatar) {
    try {
        const response = await fetch(profileMediaUpdateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(avatar)
        });

        const result = await response.json();

        return result;
    } catch(error) {
        console.log(error);
    }
}

export default UpdateProfileMedia;
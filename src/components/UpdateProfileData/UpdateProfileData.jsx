import { accessToken } from '../../variables/localStorage.jsx'
import { profileMediaUpdateUrl } from '../../variables/api.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile.jsx'

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

        if(response.ok) {
            toast.success('Success! Your avatar is updated.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            setTimeout(window.location.href = '/profile', 3000)       
        } else {
            toast.error('Ooobs! Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }

        return result;
    } catch(error) {
        console.log(error);
    }
}

export default UpdateProfileMedia;
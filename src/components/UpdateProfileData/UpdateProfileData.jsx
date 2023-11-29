import { accessToken } from '../../variables/localStorage.jsx'
import { profileMediaUpdateUrl } from '../../variables/api.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            window.location.href = '/profile';      
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

export default UpdateProfileMedia;
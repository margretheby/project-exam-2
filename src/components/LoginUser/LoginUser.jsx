import { loginUrl } from '../../variables/api.jsx';
import { useState } from 'react';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile.jsx';
import saveToStorage from '../../functions/saveToStorage/saveToStorage.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(response.ok) {
                const loginData = await response.json();
                const username = loginData.name;
                const userAvatar = loginData.avatar;
                const userManager = loginData.venueManager;
                const accessToken = loginData.accessToken;

                // Saving user information in localStorage
                saveToStorage(accessToken, username, userAvatar, userManager)

                // User feedback on login successfull
                toast.success('You are logged in', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
                
                
                // Relocating when logging in.
                setTimeout(relocateToProfile, 3000);
                
            } else {
                toast.error('Ooobs! Something went wrong, please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="w-48">
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="email">E-mail *</label>
            <input 
                type='email' 
                name='email'
                placeholder='example@stud.noroff.no'
                value={formData.email}
                onChange={handleChange} 
                className="border" 
                required />
            <label htmlFor="password">Password *</label>
            <input 
                type='password' 
                name='password' 
                placeholder='********'
                value={formData.password}
                onChange={handleChange}
                className="border" 
                required />
            <button type='submit' className="border bg-gray-200">Login</button>
        </form>
    </div>
    )
}

export default LoginForm;
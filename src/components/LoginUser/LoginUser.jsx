import { loginUrl } from '../../variables/api.jsx';
import { useState } from 'react';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile.jsx';
import saveToStorage from '../../functions/saveToStorage/saveToStorage.jsx';

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
                
                // Relocating when logging in.
                relocateToProfile();
            } else {
                console.log('Not success')
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
                value={formData.email}
                onChange={handleChange} 
                className="border" 
                required />
            <label htmlFor="password">Password *</label>
            <input 
                type='password' 
                name='password' 
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
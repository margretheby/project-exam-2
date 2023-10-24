import { registerUrl } from '../../variables/api.jsx';
import { useState } from 'react';
import saveToStorage from '../../functions/saveToStorage/saveToStorage.jsx';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile.jsx';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
        venueManager: false,
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
            const response = await fetch(registerUrl, {
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
            <label htmlFor="name">Username *</label>
            <input 
                type='text' 
                name='name' 
                value={formData.name}
                onChange={handleChange}
                className="border" 
                required />
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
            <label htmlFor="avatar">Avatar (url)</label>
            <input 
                type='url' 
                name='avatar' 
                value={formData.avatar}
                onChange={handleChange}
                className="border" />
            <p>Do you wish to be a venue manager?</p>
            <div>
                <input 
                    type='checkbox' 
                    name='venueManager' 
                    value={formData.venueManager === true}
                    onChange={handleChange}
                    className="border mr-2" />
                <label htmlFor="venueManager" className='mr-2'>Yes</label>
                <input 
                    type='checkbox' 
                    name='venueManager' 
                    value={formData.venueManager === false}
                    onChange={handleChange}
                    className="border ml-2" />
                <label htmlFor="venueManager" className='ml-2'>No</label>
            </div>
            <p>You can update this later on your profile page if you change your mind.</p>
            <button type='submit' className="border bg-gray-200">Registrer</button>
        </form>
    </div>
    )
}

export default RegisterForm;
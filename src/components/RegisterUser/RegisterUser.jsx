import { registerUrl } from '../../variables/api.jsx';
import { useState } from 'react';
import saveToStorage from '../../functions/saveToStorage/saveToStorage.jsx';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile.jsx';
import UpdateVenueManager from '../UpdateVenueManager/UpdateVenueManager.jsx';

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
                title='Your username must not contain punctuation symbols, other than underscore (_).'
                placeholder='your_username'
                value={formData.name}
                onChange={handleChange}
                className="border" 
                required />
            <label htmlFor="email">E-mail *</label>
            <input 
                type='email' 
                name='email'
                title='You can only register with a Noroff e-mail. Example: studentname@noroff.no or studentname@stud.noroff.no'
                placeholder='example@stud.noroff.no'
                pattern='^[\w\-.]+@(stud\.)?noroff\.no$'
                value={formData.email}
                onChange={handleChange} 
                className="border" 
                required />
            <label htmlFor="password">Password *</label>
            <input 
                type='password' 
                name='password' 
                title='Your password must be at least 8 characters'
                placeholder='********'
                minLength='8'
                value={formData.password}
                onChange={handleChange}
                className="border" 
                required />
            <label htmlFor="avatar">Avatar (url)</label>
            <input 
                type='url' 
                name='avatar' 
                title='Your avatar must be a valid URL.'
                placeholder='https://image.com/avatar.jpg'
                value={formData.avatar}
                onChange={handleChange}
                className="border" />
            <p>Do you wish to be a venue manager?</p>
            <div>
                <input 
                    type='checkbox' 
                    name='venueManager' 
                    title='true'
                    value={formData.venueManager}
                    onChange={UpdateVenueManager}
                    className="border mr-2" />
                <label htmlFor="venueManager" className='mr-2'>Yes</label>
                <input 
                    type='checkbox' 
                    name='venueManager' 
                    title='false'
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
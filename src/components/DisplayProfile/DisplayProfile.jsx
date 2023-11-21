import { profileDataUrl } from '../../variables/api.jsx'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GetData from '../GetData/GetData.jsx'
import UpdateProfileMedia from '../UpdateProfileData/UpdateProfileData.jsx';
import UpdateVenueManager from '../UpdateVenueManager/UpdateVenueManager.jsx';
import DisplayProfileBookings from '../DisplayProfileBookings/DisplayProfileBookings.jsx'
import DisplayProfileVenues from '../DisplayProfileVenues/DisplayProfileVenues.jsx';

function DisplayProfile() {
    const avatarPlaceholder = '/icons/user.png'

    const { data } = GetData(profileDataUrl)
    const { name, avatar, venueManager, _count } = data;

    const [formData, setFormData] = useState({
        avatar: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name]: value,
        });
    };

    const handleClick = async (e) => {
        const avatar = formData.avatar;
        e.preventDefault();
        UpdateProfileMedia({avatar});
    }

    if(_count) {
        if(venueManager === true) {
            return (
                <div className='w-56'>
                    <div className='my-5'>
                        {avatar !== '' ? <img src={avatar} alt={name} className='w-20' /> : <img src={avatarPlaceholder} alt={name} className='w-20' />}
                        <h1>{name}</h1>
                    </div>
                    <div className='my-5'>
                        <form className='flex flex-col'>
                            <label htmlFor='avatar' >Update avatar (url)</label>
                            <input 
                                type='url' 
                                name='avatar' 
                                value={formData.avatar}
                                onChange={handleChange}
                                className='border'/>
                            <button onClick={handleClick}><img src='/icons/update-avatar.png' alt='Update avatar' className='h-8 my-2 bg-[#FFEC58] text-lg text-black border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-white hover:text-[#FFEC58]' /></button>
                        </form>
                    </div>
                    <div className='my-5'>
                        <h2>Your bookings</h2>
                        <DisplayProfileBookings />
                        <div>
                            <p>VenueImage</p>
                            <p>VenueName</p>
                            <div>
                                <p>From: date</p>
                                <p>To: date</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className='my-5'>
                        <div>
                            <h2>Your venues</h2>
                            <Link to='newvenue' className='bg-gray-200'><img src='/icons/plus.png' alt='Add new venue' className='w-10' /></Link>
                        </div>
                        <div>
                            <DisplayProfileVenues />
                        </div>
                        <div>
                            <button className='my-2 bg-[#FFEC58] text-lg text-black w-32 py-1 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222] hover:text-[#FFEC58]'>See all bookings</button>
                        </div>
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div className='w-48'>
                    <div className='my-5'>
                        {avatar !== '' ? <img src={avatar} alt={name} className='w-20' /> : <img src={avatarPlaceholder} alt={name} className='w-20' />}
                        <h1>{name}</h1>
                    </div>
                    <div className='my-5'>
                        <form className='flex flex-col'>
                            <label htmlFor='avatar' >Update avatar (url)</label>
                            <input 
                                type='url' 
                                name='avatar' 
                                value={formData.avatar}
                                onChange={handleChange}
                                className='border'/>
                            <button onClick={handleClick}><img src='/icons/update-avatar.png' alt='Update avatar' className='h-8 my-2 bg-[#FFEC58] text-lg text-black border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-white hover:text-[#FFEC58]' /></button>
                        </form>
                    </div>
                    <div className='my-5'>
                        <h2>Your bookings</h2>
                        <div>
                            <p>VenueImage</p>
                            <p>VenueName</p>
                            <div>
                                <p>From: date</p>
                                <p>To: date</p>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className='my-5'>
                        <p>Want to make your venue available for people to book?</p>
                        <button onClick={UpdateVenueManager} className='my-2 text-lg text-[#FFEC58] rounded hover:underline hover:text-white'>Become a manager.</button>
                    </div>
                </div>
            )
    
        }
    }



}

export default DisplayProfile;
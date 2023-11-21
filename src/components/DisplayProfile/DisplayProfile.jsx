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
                <div className='w-48 flex flex-col justify-center mx-auto mb-20'>
                    <div className='my-5 flex items-center'>
                        {avatar !== '' ? <img src={avatar} alt={name} className='w-14 mr-4' /> : <img src={avatarPlaceholder} alt={name} className='w-14 mr-4' />}
                        <h1 className='text-xl text-[#FFEC58] capitalize'>{name}</h1>
                    </div>
                    <div className='my-5'>
                        <form className='flex flex-col'>
                            <label htmlFor='avatar' >Update avatar (url)</label>
                            <div className='flex items-center'>
                                <input 
                                    type='url' 
                                    name='avatar' 
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    className='border rounded h-7 w-36 mr-2'/>
                                <button onClick={handleClick}><img src='/icons/update-avatar.png' alt='Update avatar' className='h-7 my-2 bg-[#FFEC58] text-lg text-black rounded hover:bg-white' /></button>
                            </div>
                        </form>
                    </div>
                    <div className='my-5'>
                        <h2 className='text-[#FFEC58] text-md'>Your bookings</h2>
                        <div>
                            <DisplayProfileBookings />
                        </div>
                    </div>
                    <div className='my-5'>
                        <div className='flex justify-between'>
                            <h2 className='text-[#FFEC58] text-md'>Your venues</h2>
                            <Link to='newvenue'><img src='/icons/plus.png' alt='Add new venue' className='h-6 p-1 bg-[#FFEC58] rounded hover:bg-white' /></Link>
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
                <div className='w-48 flex flex-col justify-center mx-auto mb-20'>
                    <div className='my-5 flex items-center'>
                        {avatar !== '' ? <img src={avatar} alt={name} className='w-14 mr-4' /> : <img src={avatarPlaceholder} alt={name} className='w-14 mr-4' />}
                        <h1 className='text-xl text-[#FFEC58] capitalize'>{name}</h1>
                    </div>
                    <div className='my-5'>
                        <form className='flex flex-col'>
                            <label htmlFor='avatar' >Update avatar (url)</label>
                            <div className='flex items-center'>
                                <input 
                                    type='url' 
                                    name='avatar' 
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    className='border rounded h-7 w-36 mr-2'/>
                                <button onClick={handleClick}><img src='/icons/update-avatar.png' alt='Update avatar' className='h-7 my-2 bg-[#FFEC58] text-lg text-black rounded hover:bg-white' /></button>
                            </div>
                        </form>
                    </div>
                    <div className='my-5'>
                        <h2 className='text-[#FFEC58] text-md'>Your bookings</h2>
                        <div>
                            <DisplayProfileBookings />                          
                        </div>
                        
                    </div>
                    <div className='my-10 text-center'>
                        <p className='text-sm'>Want to make your venue available for people to book?</p>
                        <button onClick={UpdateVenueManager} className='my-2 text-lg font-bold text-[#FFEC58] rounded hover:underline hover:text-white'>Become a manager.</button>
                    </div>
                </div>
            )
    
        }
    }



}

export default DisplayProfile;
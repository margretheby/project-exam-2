import { profileDataUrl, profileBookingsUrl } from '../../variables/api.jsx'
import GetData from '../GetData/GetData.jsx'
import DisplayProfileBookings from '../DisplayProfileBookings/DisplayProfileBookings.jsx';

function DisplayProfile() {
    const avatarPlaceholder = '/icons/user.png'

    DisplayProfileBookings(profileBookingsUrl)

    const { data } = GetData(profileDataUrl)
    const { name, avatar, venueManager, _count } = data;

    if(_count) {
        const { bookings } = _count;
        if(venueManager === true) {
            return (
                <div className='w-48'>
                    <div className='my-5'>
                        {avatar !== null ? <img src={avatar} alt={name} className='w-20' /> : <img src={avatarPlaceholder} alt={name} className='w-20' />}
                        <h1>{name}</h1>
                    </div>
                    <div className='my-5'>
                        <form className='flex flex-col'>
                            <label htmlFor='avatar' >Update avatar (url)</label>
                            <input type='url' name='avatar' className='border'/>
                            <button><img src='/icons/update-avatar.png' className='h-8 bg-gray-200'/></button>
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
                        <div>
                            <h2>Your venues</h2>
                            <button className='bg-gray-200'><img src='/icons/plus.png' /></button>
                        </div>
                        <div>
                            <p>VenueImage: VenueName</p>
                            <p>VenueImage: VenueName</p>
                        </div>
                        <div>
                            <button className='bg-gray-200'>See all bookings</button>
                        </div>
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div className='w-48'>
                    <div className='my-5'>
                        {avatar !== null ? <img src={avatar} alt={name} className='w-20' /> : <img src={avatarPlaceholder} alt={name} className='w-20' />}
                        <h1>{name}</h1>
                    </div>
                    <div className='my-5'>
                        <form className='flex flex-col'>
                            <label htmlFor='avatar' >Update avatar (url)</label>
                            <input type='url' name='avatar' className='border'/>
                            <button><img src='/icons/update-avatar.png' alt='Update avatar' className='h-8 bg-gray-200' /></button>
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
                        <button className='bg-gray-200 my-5'>Become a manager.</button>
                    </div>
                </div>
            )
    
        }
    }



}

export default DisplayProfile;
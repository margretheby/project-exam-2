import { bookingsUrl } from '../../variables/api.jsx'
import { accessToken } from '../../variables/localStorage.jsx'

async function fetchBookings() {
    try {
        const bookingData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }


        const response = await fetch(bookingsUrl, bookingData);
        const result = await response.json();

        console.log(result);

    } catch(error) {
        console.log(error);
    }
}

function DisplayBookingsOfVenue() {
    fetchBookings()
    return (
        <div>
            <div id="calendar" className="w-48 my-10">
                <h3>Available dates</h3>
                <div className="p-10 bg-gray-200">
                    <p className="text-center">Calendar</p>
                </div>
                <div>
                    <form className='flex flex-col'>
                        <div className='flex justify-between items-center'>
                            <label htmlFor='dateFrom'>From: </label>
                            <input type='date' name='dateFrom' className='border m-2'/>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor='dateTo'>To: </label>
                            <input type='date' name='dateTo' className='border m-2'/>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor='guests'>Guests: </label>
                            <input type='number' name='guests' className='border m-2 w-20 text-center' />
                        </div>
                       <button className='bg-gray-200'>Book now</button> 
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default DisplayBookingsOfVenue;
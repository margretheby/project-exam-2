import GetData from "../GetData/GetData.jsx";
import { profileBookingsUrl } from '../../variables/api.jsx'
import { Link } from 'react-router-dom';

function DisplayProfileBookings() {
    const { data, loading, throwError } = GetData(profileBookingsUrl)
    
    if (loading) {
        return (
            <div className="flex justify-center items-center my-20">
                <img src='/icons/loading.png' alt='Loading' className="w-10 animate-spin" />
                <p className="ml-5 text-[#FFEC58]">Loading your bookings ...</p>
            </div>
        )
    }
    if(!loading && throwError) {
        return <div>Something went wrong... </div>
    }

    console.log(data)
    if(data.length < 1) {
        return (
            <div>
                <p className="text-sm">You have not booked any stays yet.</p>
                <div className="text-center mt-5">
                    <Link to='/#search' className="text-[#FFEC58] font-bold">Click here to check out the venues.</Link>
                </div>
                
            </div>
        )
    } else {
            return (
        <div className="md:w-96">
            {data.map((booking) => {
                const { id, dateFrom, dateTo } = booking;
                const formattedDateFrom = dateFrom.split('T')[0];
                const formattedDateTo = dateTo.split('T')[0];
                return (
                    <div key={id} className='mb-10'>
                        <Link to={`/venues/${booking.venue.id}`}>
                            <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="flex items-center mt-5">
                                {booking.venue.media.length >= 0 ? <div className='h-12 w-12 bg-cover bg-center rounded'  style={{ backgroundImage: `url('${booking.venue.media[0]}')` }}>
                                
                                </div> : "" }
                                <h3 className="ml-4 text-md">{booking.venue.name}</h3>
                            </div>
                            <div className="mb-5 mt-1 sm:mb-0 sm:w-40">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">From:</p>
                                    <p className="mr-14 text-sm sm:mr-1">{formattedDateFrom}</p>
                                </div>
                                <div  className="flex justify-between items-center">
                                    <p className="text-sm">To:</p>
                                    <p className="mr-14 text-sm sm:mr-1"> {formattedDateTo}</p>
                                </div>
                            </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>)
    }


}

export default DisplayProfileBookings;
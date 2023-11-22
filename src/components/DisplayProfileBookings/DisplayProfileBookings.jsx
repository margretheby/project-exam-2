import GetData from "../GetData/GetData.jsx";
import { profileBookingsUrl } from '../../variables/api.jsx'
import { Link } from 'react-router-dom';

function DisplayProfileBookings() {
    const { data, loading, throwError } = GetData(profileBookingsUrl)
    
    if (loading) {
        return <div>Loading...</div>
    }
    if(!loading && throwError) {
        return <div>Something went wrong... </div>
    }

    return (
        <div>
            {data.map((booking) => {
                const { id, dateFrom, dateTo } = booking;
                const formattedDateFrom = dateFrom.split('T')[0];
                const formattedDateTo = dateTo.split('T')[0];
                return (
                    <div key={id} className='my-8'>
                        <Link to={`/venues/${booking.venue.id}`}>
                            <div className="flex items-center mt-5">
                                {booking.venue.media.length >= 0 ? <div className='h-12 w-12 bg-cover bg-center rounded'  style={{ backgroundImage: `url('${booking.venue.media[0]}')` }}>
                                
                                </div> : "" }
                                <h3 className="ml-4 text-md">{booking.venue.name}</h3>
                            </div>
                            <div className="mb-5 mt-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">From:</p> <p className="mr-14 text-sm">{formattedDateFrom}</p>
                                </div>
                                <div  className="flex justify-between items-center">
                                    <p className="text-sm">To:</p><p className="mr-14 text-sm"> {formattedDateTo}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>)
}

export default DisplayProfileBookings;
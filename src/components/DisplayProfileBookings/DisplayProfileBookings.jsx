import GetData from "../GetData/GetData.jsx";
import { profileBookingsUrl } from '../../variables/api.jsx'

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
                    <div key={booking.id} className='my-5'>
                        <h3 className="bg-pink-200">{id}</h3>
                        <p>From: {formattedDateFrom}</p>
                        <p>To: {formattedDateTo}</p>
                    </div>
                )
            })}
        </div>)
}

export default DisplayProfileBookings;
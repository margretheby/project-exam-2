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
                return (
                    <div key={booking.id}>
                        <h3 className="bg-pink-200">{booking.id}</h3>
                        <p>From: {booking.dateFrom}</p>
                        <p>To: {booking.dateTo}</p>
                    </div>
                )
            })}
        </div>)
}

export default DisplayProfileBookings;
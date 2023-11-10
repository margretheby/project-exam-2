import { Link } from "react-router-dom";
import GetData from "../GetData/GetData.jsx";
import { profileVenuesUrl } from '../../variables/api.jsx'

function DisplayProfileVenues() {
    const { data, loading, throwError } = GetData(profileVenuesUrl)
    
    if (loading) {
        return <div>Loading...</div>
    }
    if(!loading && throwError) {
        return <div>Something went wrong... </div>
    }

    return (
        <div>
            {data.map((venue) => {
                return (
                    <div key={venue.id}>
                        <Link to={`/venues/${venue.id}`}>
                            <div className="flex items-center my-5">
                                {venue.media.length >= 0 ? <img src={venue.media[0]} alt={`${venue.name}`} className='w-10' /> : "" }
                                <h3 className="ml-3">{venue.name}</h3>
                            </div>
                            
                        </Link>
                    </div>
                )
            })}
        </div>)
}

export default DisplayProfileVenues;
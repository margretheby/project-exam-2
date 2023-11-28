import { Link } from "react-router-dom";
import GetData from "../GetData/GetData.jsx";
import { profileVenuesUrl } from '../../variables/api.jsx'

function DisplayProfileVenues() {
    const { data, loading, throwError } = GetData(profileVenuesUrl)
    
    if (loading) {
        return (
            <div className="flex justify-center items-center my-20">
                <img src='/icons/loading.png' alt='Loading' className="w-10 animate-spin" />
                <p className="ml-5 text-[#FFEC58]">Loading your venues ...</p>
            </div>
        )
    }
    if(!loading && throwError) {
        return <div>Something went wrong... </div>
    }

    return (
        <div className="md:w-96">
            {data.map((venue) => {
                return (
                    <div key={venue.id}>
                        <Link to={`/venues/${venue.id}`}>
                            <div className="flex items-center my-5">
                                {venue.media.length >= 0 ? <div className='h-12 w-12 md:h-20 md:w-20 bg-cover bg-center rounded'  style={{ backgroundImage: `url('${venue.media[0]}')` }}>
                                
                                </div> : "" }
                                <h3 className="ml-4 text-sm md:text-md">{venue.name}</h3>
                            </div>
                            
                        </Link>
                    </div>
                )
            })}
        </div>)
}

export default DisplayProfileVenues;
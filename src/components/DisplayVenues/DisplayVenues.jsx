import useApi from "../../hooks/useApi";
import { venueUrl } from "../../variables/api.jsx"
import { Link } from 'react-router-dom';

function DisplayVenues() {
    const { data, loading, throwError } = useApi(venueUrl);
    if(loading || throwError) {
        return (
            <div>Loading ... </div>
        )
    }

    if(throwError) {
        console.log(throwError);
        return (
            <div>
                Ooobs! Something went wrong, please try again.
            </div>
        )
    }

    return (
        <div>
            {data.map((venue) => {
                const { media, id, name, price } = venue; 
                return (
                    <div key={id} className='m-10'>
                        <Link to={`/venues/${id}`}>
                            <img src={media} alt={name} className='w-10' />
                            <p>{name}</p>
                            <p>{price} kr per night</p>
                        </Link>
                    </div>)
            })}
        </div>
    )
}

export default DisplayVenues;
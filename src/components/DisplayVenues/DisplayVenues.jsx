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

    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return (
            <div>
                Oops! Something went wrong. Please try again.
            </div>
        );
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
        <div className="flex flex-wrap justify-center gap-5">
            {data.map((venue) => {
                const { media, id, name, price } = venue; 
                return (
                    <div key={id} className='my-10 max-w-[40%]'>
                        <Link to={`/venues/${id}`}>
                            <div className='h-32 w-32 bg-cover bg-center'  style={{ backgroundImage: `url('${media[0]}')` }}>
                                
                            </div>
                            
                            <p className="text-sm w-32">{name}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-lg w-14">{price}</p>
                                <p className="text-sm w-18"> kr per night</p>
                            </div>
                        </Link>
                    </div>)
            })}
        </div>
    )
}

export default DisplayVenues;
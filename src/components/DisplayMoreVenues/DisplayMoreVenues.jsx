import useApi from "../../hooks/useApi";
import { venueUrl } from "../../variables/api.jsx"
import { Link } from 'react-router-dom';
import { useState } from 'react';

function DisplayMoreVenues() {
    const { data, loading, throwError } = useApi(`${venueUrl}?offset=10`);
    const [showMoreVenues, setShowMoreVenues] = useState(false);

    const handleShowMoreVenues = () => {
        setShowMoreVenues(true);
    }


    if(loading) {
        return (
            <div className="flex justify-center items-center my-20">
                <img src='/icons/loading.png' alt='Loading' className="w-10 animate-spin" />
                <p className="ml-5 text-[#FFEC58]">Loading venues ...</p>
            </div>
        )
    }

    if (!Array.isArray(data)) {
        return (
            <div>
                Oobs! Something went wrong. Please try again.
            </div>
        );
    }

    if(!loading && throwError) {
        return (
            <div>
                Ooobs! Something went wrong, please try again.
            </div>
        )
    }

    return (
        <div>
            {!showMoreVenues && (
                <div className="ml-10 flex flex-wrap justify-center">
                    <button onClick={handleShowMoreVenues} className="my-2 bg-[#FFEC58] text-lg text-black py-1 px-5 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222] hover:text-[#FFEC58]">More venues</button>
                </div>
            )}         
            {showMoreVenues && (
                <div className="flex flex-wrap justify-center gap-5">
                    {data.map((venue) => {
                        const { media, id, name, price } = venue; 
                        return (
                            <div key={id} className='my-10 max-w-[40%] hover:bg-[#050505]'>
                                <Link to={`/venues/${id}`}>
                                    <div className='h-40 w-40 sm:h-60 sm:w-60 bg-cover bg-center opacity-95 hover:opacity-100'  style={{ backgroundImage: `url('${media[0]}')` }}> 
                                    </div>
                                    <p className="text-sm w-40 sm:w-60 sm:text-lg">{name}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg w-14 sm:w-32 sm:text-2xl">{price}</p>
                                        <p className="text-sm text-right w-18 sm:w-28 sm:text-lg"> kr per night</p>
                                    </div>
                                </Link>
                            </div>)
                    })}
                </div>
            )}
        </div>
    )
}

export default DisplayMoreVenues;
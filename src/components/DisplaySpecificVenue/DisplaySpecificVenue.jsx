import useApi from "../../hooks/useApi";
import { venueUrl } from '../../variables/api.jsx'
import { useParams } from 'react-router-dom';

function DisplaySpecificVenue() {
    let { id } = useParams();
    const { data, loading, throwError } = useApi(`${venueUrl}/${id}`);
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

    if(data) {
        console.log(data)
        const { name, description, media, meta, price, maxGuests, rating, location } = data;
        if(meta) {
            const { wifi, parking, breakfast, pets } = meta;
            return (
                <div>
                    <div>
                        <div>
                            {
                            media.map((image) => {
                                return (
                                    <img src={media} alt={name} className='w-48' />
                                )
                            })}
                        </div>
                        <div>
                            <h1>{name}</h1>
                            <p>{description}</p>
                            <p>{price} kr per night</p>
                        </div>
                        <div>
                            <a href="#calendar">Booking</a>
                        </div>
                    </div>
                    <div className="w-48">
                        <h3>More information</h3>
                        <div className="flex justify-between">
                            <p>Max guests: </p>
                            <p>{maxGuests}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Rating: </p>
                            <p>{rating}</p>
                        </div>
                    </div>
                    <div className="w-48">
                        <div className="flex justify-between">
                            <p className="mr-2">Location: </p>
                            <div className="text-right">
                                <p>{location.address}</p>
                                <p>{location.zip !== 'Unknown' ? location.zip : ''} {location.city !== 'Unknown' ? location.city : ''}</p>
                                <p>{location.country !== 'Unknown' ? location.country : ''}</p>
                                <p>{location.continent !== 'Unknown' ? location.continent : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-48">
                        <div className="flex justify-between">
                            <p className="mr-2">Parking: </p>
                            <p> {parking ? 'yes' : 'no'}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="mr-2">Wifi: </p>
                            <p> {wifi ? 'yes' : 'no'}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="mr-2">Breakfast: </p><p> {breakfast ? 'yes' : 'no'}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="mr-2">Pets: </p>
                            <p> {pets ? 'yes' : 'no'}</p>
                        </div>
                    </div>
                    <div id="calendar" className="w-48 mb-10">
                        <h3>Available dates</h3>
                        <div className="p-10 bg-gray-200">
                            <p className="text-center">Calendar</p>
                        </div>
                        <button>Book now</button>
                    </div>
                </div>
            )
        }
    }
}

export default DisplaySpecificVenue;
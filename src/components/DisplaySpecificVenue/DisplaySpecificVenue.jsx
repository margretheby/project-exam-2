import useApi from "../../hooks/useApi";
import { venueUrl } from '../../variables/api.jsx'
import { username } from "../../variables/localStorage";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import DisplayBookingsOfVenue from "../DisplayBookingsOfVenue/DisplayBookingsOfVenue";
import UpdateVenueForm from "../UpdateVenueForm/UpdateVenueForm";
import DeleteVenueButton from "../DeleteVenue/DeleteVenue";

function DisplaySpecificVenue() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let { id } = useParams();
    const { data, loading, throwError } = useApi(`${venueUrl}/${id}?_bookings=true&_owner=true`);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
    
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
        const { name, description, media, meta, price, maxGuests, rating, location, owner } = data;
        if(meta) {
            const { wifi, parking, breakfast, pets } = meta;
            return (
                <div>
                    <div>
                        {owner.name === username ? 
                        <div>
                            <div>
                                <button onClick={openModal}>Update Venue</button>
                                <UpdateVenueForm isOpen={modalIsOpen} onRequestClose={closeModal} />
                            </div>
                            <div>
                                <DeleteVenueButton />
                            </div>
                        </div>
                        : null}
                        
                        <div>
                            {
                            media.map(() => {
                                return (
                                    <img src={media} alt={name} className='w-56' />
                                )
                            })}
                        </div>
                        <div>
                            <h1>{name}</h1>
                            <p>{description}</p>
                            <p>{price} kr per night</p>
                        </div>
                        <div>
                            <a href="#calendar" className="bg-gray-200">Booking</a>
                        </div>
                    </div>
                    <div className="w-56">
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
                    <div className="w-56">
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
                    <div className="w-56">
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
                    <DisplayBookingsOfVenue />
                </div>
            )
        }
    }
}

export default DisplaySpecificVenue;
import useApi from "../../hooks/useApi";
import { venueUrl } from '../../variables/api.jsx'
import { username } from "../../variables/localStorage";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import DisplayBookingsOfVenue from "../DisplayBookingsOfVenue/DisplayBookingsOfVenue";
import UpdateVenueForm from "../UpdateVenueForm/UpdateVenueForm";
import DeleteVenueButton from "../DeleteVenue/DeleteVenue";
import ImageGallery from "react-image-gallery";
import { Helmet } from 'react-helmet';

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
    
    if(loading) {
        return (
            <div className="flex justify-center items-center my-20">
                <img src='/icons/loading.png' alt='Loading' className="w-10 animate-spin" />
            </div>
        )
    }

    if(!loading && throwError) {
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
                <div className="mx-auto flex flex-col justify-center sm:w-[80%]">
                    <div className='application'>
                        <Helmet>
                            <meta charset="utf-8" />
                            <link rel="icon" href="icons/loading.png" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <title>{name} | Holidaze</title>
                            <meta name="description" content={description} />
                        </Helmet>
                    </div>
                    <div className="mx-auto flex flex-col justify-center sm:m-2">
                        {owner.name === username ? 
                        <div className="flex justify-between sm:justify-end">
                            <div className="sm:mr-5">
                                <button onClick={openModal} className='my-2 bg-[#FFEC58] text-sm text-black px-2 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222] hover:text-[#FFEC58]'>Update Venue</button>
                                <UpdateVenueForm isOpen={modalIsOpen} onRequestClose={closeModal} />
                            </div>
                            <div>
                                <DeleteVenueButton />
                            </div>
                        </div>
                        : null}
                        <div className="sm:flex sm:flex-col">
                            <div className="sm:flex sm:justify-center sm:gap-5 sm:mt-5">
                                <div>
                                    <div>
                                        {(media.length > 1 ? <ImageGallery autoPlay={true} items={
                                            media.map((image) => {
                                                const imageObject = {original: image}
                                                return imageObject;
                                            })
                                        } /> : 
                                            <img src={media} alt={name} className='w-56 sm:w-[100%] lg:w-96' />    
                                         )}

                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-56 sm:w-72">
                                        <h1 className="text-xl text-[#FFEC58] text-center sm:text-left sm:text-3xl sm:mb-4">{name}</h1>
                                        <p className="text-sm">{description}</p>
                                        <div className="text-center sm:text-left">
                                            <p className="py-2 font-bold">{price} kr per night</p>
                                        </div>
                                    </div>                            
                                    <div className="w-56 mt-5 mb-10 text-center sm:text-left sm:mt-10">
                                        <a href="#calendar" className="my-2 bg-[#FFEC58] text-lg text-black py-1 px-5 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222] hover:text-[#FFEC58]">Booking</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-start sm:gap-10 md:gap-20 lg:gap-24">
                                <div className="sm:order-2 md:justify-start">
                                    <div className="w-56 sm:w-72">
                                        <h3 className="text-xl text-[#FFEC58] text-center sm:mt-5">More information</h3>
                                        <div className="flex justify-between text-sm">
                                            <p className="md:text-lg">Max guests: </p>
                                            <p className="md:text-lg">{maxGuests}</p>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <p className="md:text-lg">Rating: </p>
                                            <p className="md:text-lg">{rating}</p>
                                        </div>
                                    </div>
                                    <div className="w-56 sm:w-72">
                                        <div className="flex justify-between my-5 text-sm">
                                            <p className="mr-2">Location: </p>
                                            <div className="text-right">
                                                <p>{location.address}</p>
                                                <p>{location.zip !== 'Unknown' ? location.zip : ''} {location.city !== 'Unknown' ? location.city : ''}</p>
                                                <p>{location.country !== 'Unknown' ? location.country : ''}</p>
                                                <p>{location.continent !== 'Unknown' ? location.continent : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-56 sm:w-72">
                                        <div className="flex justify-between text-sm">
                                            <p className="mr-2">Wifi: </p>
                                            <p> {wifi ? 'yes' : 'no'}</p>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <p className="mr-2">Breakfast: </p><p> {breakfast ? 'yes' : 'no'}</p>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <p className="mr-2">Parking: </p>
                                            <p> {parking ? 'yes' : 'no'}</p>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <p className="mr-2">Pets: </p>
                                            <p> {pets ? 'yes' : 'no'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:order-1">
                                    <DisplayBookingsOfVenue />
                                </div>
                            </div>
                        </div>

                            
                    </div>
                </div>
            )
        }
    }
}

export default DisplaySpecificVenue;
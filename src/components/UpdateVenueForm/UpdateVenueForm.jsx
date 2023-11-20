import { useForm, Controller } from 'react-hook-form';
import useApi from "../../hooks/useApi.jsx";
import Modal from 'react-modal'
import updateVenue from '../../functions/updateVenue/updateVenue';
import { venueUrl } from '../../variables/api.jsx'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateVenueForm({ isOpen, onRequestClose }) {

    // Form value states from venue
    const [ nameValue, setNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');
    const [ mediaValue, setMediaValue ] = useState([]);
    const [ priceValue, setPriceValue ] = useState();
    const [ maxGuestsValue, setMaxGuestsValue ] = useState();
    const [ ratingValue, setRatingValue ] = useState();
    const [ addressValue, setAddressValue ] = useState(); 
    const [ zipValue, setZipValue ] = useState(); 
    const [ cityValue, setCityValue ] = useState(); 
    const [ countryValue, setCountryValue ] = useState(); 
    const [ continentValue, setContinentValue ] = useState(); 

    // Update the state of input fields
    const handleNameChange = (e) => {
        setNameValue(e.target.value);
      };
      const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
      };
      const handleMediaChange = (e) => {
        setMediaValue([e.target.value]);
      };
      const handlePriceChange = (e) => {
        setPriceValue(Number(e.target.value));
      };
      const handleMaxGuestsChange = (e) => {
        setMaxGuestsValue(Number(e.target.value));
      };
      const handleRatingChange = (e) => {
        setRatingValue(Number(e.target.value));
      };
      const handleAddressChange = (e) => {
        setAddressValue(e.target.value)
      }
      const handleZipChange = (e) => {
        setZipValue(e.target.value)
      }
      const handleCityChange = (e) => {
        setCityValue(e.target.value)
      }

      const handleCountryChange = (e) => {
        setCountryValue(e.target.value)
      }
      const handleContinentChange = (e) => {
        setContinentValue(e.target.value)
      }
    

    const { handleSubmit, control } = useForm();
    let { id } = useParams();
    Modal.setAppElement('#root');
    const specificVenueUrl = `${venueUrl}/${id}`;
    const { data, loading, throwError } = useApi(`${specificVenueUrl}?_bookings=true&_owner=true`);
        
    
    useEffect(() => {
        setNameValue(data.name);
        setDescriptionValue(data.description);
        setMediaValue(data.media || []);
        setPriceValue(Number(data.price));
        setMaxGuestsValue(Number(data.maxGuests));
        setRatingValue(Number(data.rating));

        if(data.location) {
            setAddressValue(data.location.address);
            setCityValue(data.location.city);
            setZipValue(data.location.zip);
            setCountryValue(data.location.country);
            setContinentValue(data.location.continent); 
        }
        
    
    }, [data])
    

    const onSubmit = async (data) => {

        const body = {
            name: nameValue,
            description: descriptionValue,
            media: mediaValue,
            price: priceValue,
            maxGuests: maxGuestsValue,
            rating: ratingValue,
            meta: {
                wifi: data.meta.wifi || false,
                parking: data.meta.parking || false,
                breakfast: data.meta.breakfast || false,
                pets: data.meta.pets || false,
              },
            location: {
                address: addressValue,
                city: cityValue,
                zip: zipValue,
                country: countryValue,
                continent: continentValue,
            },
        };

                
        
        try {
            const response = await updateVenue(specificVenueUrl, body);
            if(response) {
                toast.success('Success! Your venue is updated.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
                setTimeout(relocateToProfile, 4000);
            }
            else {
                toast.error('Ooobs! Something went wrong, please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    

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


    

    if(!loading && !throwError) {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Update venue form modal"
                ariaHideApp={false}
                className='w-56 bg-white overflow-y-auto max-h-[80vh] mt-10'>
            <div className='w-56'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Name *</label>
                        <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="text" value={nameValue} onChange={handleNameChange} className='border' required />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="description">Description *</label>
                        <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="text" value={descriptionValue} onChange={handleDescriptionChange} className='border' required />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="media">Media</label>
                        <Controller
                            name="media"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                            <input {...field} type="url" value={mediaValue} onChange={handleMediaChange} className='border' />
                            )} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="price">Price per night *</label>
                        <Controller
                        name="price"
                        control={control}
                        defaultValue='' 
                        render={({ field }) => <input {...field} type="number" value={priceValue} onChange={handlePriceChange} className='border' required />}
                        />
                    </div>                
                    <div className='flex justify-between'>
                        <label htmlFor="maxGuests">Max guests *</label>
                        <Controller
                        name="maxGuests"
                        control={control}
                        defaultValue='maxGuestsValue' 
                        render={({ field }) => <input {...field} type="number" value={maxGuestsValue} onChange={handleMaxGuestsChange} className='border w-12' required />}
                        />
                    </div>

                    <div className='flex justify-between'>
                        <label>Rating</label>
                        <Controller
                        name="rating"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => <input type="number" value={ratingValue} onChange={handleRatingChange} className='border w-12' {...field} />}
                        />
                    </div>
                    <div className='mt-10'>
                        <h2 className='my-2'>Additional information: </h2>
                        <div className='w-24 flex justify-between'>
                            <label className='mr-2'>Wifi:</label>
                            <Controller
                            name="meta.wifi"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <input type="checkbox" {...field} checked={field.value === true} />
                            )}
                            />
                        </div>
                        <div className='w-24 flex justify-between'>
                            <label className='mr-2'>Parking:</label>
                            <Controller
                            name="meta.parking"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <input type="checkbox" {...field} checked={field.value === true} />
                            )}
                            />
                        </div>
                        <div className='w-24 flex justify-between'>
                            <label className='mr-2'>Breakfast: </label>
                            <Controller
                            name="meta.breakfast"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <input type="checkbox" {...field} checked={field.value === true} />
                            )}
                            />
                        </div>
                        <div className='w-24 flex justify-between'>
                            <label className='mr-2'>Pets:</label>   
                            <Controller
                            name="meta.pets"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <input type="checkbox" {...field} checked={field.value === true} />
                            )}
                            />
                        </div>
                    </div>
                    <div className='mt-10'>
                        <h2 className='my-2'>Location: </h2>
                        <div className='flex flex-col'>
                            <label>Address</label>
                            <Controller
                            name="location.address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" value={addressValue} onChange={handleAddressChange} className='border' />}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label>City</label>
                            <Controller
                            name="location.city"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" value={cityValue} onChange={handleCityChange} className='border' />}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label>Zip code</label>
                            <Controller
                            name="location.zip"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" value={zipValue} onChange={handleZipChange} className='border' />}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label>Country</label>
                            <Controller
                            name="location.country"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" value={countryValue} onChange={handleCountryChange} className='border' />}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label>Continent</label>
                            <Controller
                            name="location.continent"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" value={continentValue} onChange={handleContinentChange} className='border' />}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <button type='submit' className='bg-gray-200'>Update Venue</button>
                    </div>
                    <div className='flex flex-col'>
                        <button onClick={onRequestClose} className='bg-red-400'>Cancel update</button>
                    </div>
                </form>
            </div>
        </Modal>
        )
    }
}

export default UpdateVenueForm;
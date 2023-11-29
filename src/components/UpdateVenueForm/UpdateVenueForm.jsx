import { useForm, Controller } from 'react-hook-form';
import useApi from "../../hooks/useApi.jsx";
import Modal from 'react-modal'
import updateVenue from '../../functions/updateVenue/updateVenue';
import { venueUrl } from '../../variables/api.jsx'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile'
import { customStyleModal } from '../../variables/customStyleModal.jsx';
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
        const mediaUrls = e.target.value.split(',').map(url => url.trim())
        setMediaValue(mediaUrls);
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
      };
      const handleZipChange = (e) => {
        setZipValue(e.target.value)
      };
      const handleCityChange = (e) => {
        setCityValue(e.target.value)
      };
      const handleCountryChange = (e) => {
        setCountryValue(e.target.value)
      };
      const handleContinentChange = (e) => {
        setContinentValue(e.target.value)
      };
    
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
            toast.error('Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
        
    }

    if(loading) {
        return (
            <div className="flex justify-center items-center">
                <img src='/icons/loading.png' alt='Loading' className="w-6 animate-spin" />
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

    if(!loading && !throwError) {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Update venue form modal"
                ariaHideApp={false}
                style={customStyleModal}
                className='bg-[#222222dd] overflow-y-auto max-h-[80vh] mt-10'>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='my-2 text-2xl text-[#FFEC58] text-md'>Update venue</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='md:flex md:gap-10'>
                        <div>
                            <h2 className='my-2 text-[#FFEC58] text-md md:mt-5'>General information: </h2>
                            <div className='flex flex-col'>
                                <label htmlFor="name" className='text-sm mt-5 mb-1 md:mt-0'>Name *</label>
                                <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} type="text" value={nameValue} onChange={handleNameChange} className='border rounded' required />}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="description" className='text-sm mt-5 mb-1'>Description *</label>
                                <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} type="text" value={descriptionValue} onChange={handleDescriptionChange} className='border rounded' required />}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="media" className='text-sm mt-5 mb-1'>Images (url)</label>
                                <Controller
                                    name="media"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                    <input {...field} type="url" value={mediaValue.join(',')} onChange={handleMediaChange} className='border rounded' />
                                    )} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="price" className='text-sm mt-5 mb-1'>Price per night *</label>
                                <Controller
                                name="price"
                                control={control}
                                defaultValue='' 
                                render={({ field }) => <input {...field} type="number" value={priceValue} onChange={handlePriceChange} className='border rounded' required />}
                                />
                            </div>                
                            <div className='flex justify-between my-2'>
                                <label htmlFor="maxGuests" className='text-sm'>Max guests *</label>
                                <Controller
                                name="maxGuests"
                                control={control}
                                defaultValue='maxGuestsValue' 
                                render={({ field }) => <input {...field} type="number" value={maxGuestsValue} onChange={handleMaxGuestsChange} className='border rounded w-12 text-center' required />}
                                />
                            </div>
                            <div className='flex justify-between my-2'>
                                <label htmlFor='rating' className='text-sm'>Rating</label>
                                <Controller
                                name="rating"
                                control={control}
                                defaultValue={0}
                                render={({ field }) => <input type="number" value={ratingValue} onChange={handleRatingChange} className='border rounded w-12 text-center' {...field} />}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='mt-10 md:mt-5'>
                                <h2 className='my-2 text-[#FFEC58] text-md md:mt-0'>Additional information: </h2>
                                <div className='w-24 flex justify-between my-2'>
                                    <label htmlFor='meta.wifi' className='text-sm'>Wifi:</label>
                                    <Controller
                                    name="meta.wifi"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <input type="checkbox" {...field} checked={field.value === true} />
                                    )}
                                    />
                                </div>
                                <div className='w-24 flex justify-between my-2'>
                                    <label htmlFor='meta.parking' className='text-sm'>Parking:</label>
                                    <Controller
                                    name="meta.parking"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <input type="checkbox" {...field} checked={field.value === true} />
                                    )}
                                    />
                                </div>
                                <div className='w-24 flex justify-between my-2'>
                                    <label htmlFor='meta.breakfast' className='text-sm'>Breakfast: </label>
                                    <Controller
                                    name="meta.breakfast"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <input type="checkbox" {...field} checked={field.value === true} />
                                    )}
                                    />
                                </div>
                                <div className='w-24 flex justify-between my-2'>
                                    <label htmlFor='meta-pets' className='text-sm'>Pets:</label>   
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
                                <h2 className='my-2 text-[#FFEC58] text-md'>Location: </h2>
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1'>Address</label>
                                    <Controller
                                    name="location.address"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} type="text" value={addressValue} onChange={handleAddressChange} className='border rounded' />}
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col'>
                                        <label htmlFor='location.zip' className='text-sm mt-5 mb-1'>Zip code</label>
                                        <Controller
                                        name="location.zip"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <input {...field} type="text"  value={zipValue} onChange={handleZipChange} className='border rounded pl-1 w-16 mr-1' />}
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor='location.city' className='text-sm mt-5 mb-1'>City</label>
                                        <Controller
                                        name="location.city"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <input {...field} type="text"  value={cityValue} onChange={handleCityChange} className='border rounded pl-1 w-36' />}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm  mt-5 mb-1'>Country</label>
                                    <Controller
                                    name="location.country"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} type="text" value={countryValue} onChange={handleCountryChange} className='border rounded' />}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm  mt-5 mb-1'>Continent</label>
                                    <Controller
                                    name="location.continent"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} type="text" value={continentValue} onChange={handleContinentChange} className='border rounded' />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between mt-8 md:pb-10'>
                        <button type='submit' className='my-2 bg-[#FFEC58] text-sm text-black px-2 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222ab] hover:text-[#FFEC58]'>Update Venue</button>
                        <button onClick={onRequestClose} className='my-2 bg-red-900 text-sm text-white px-2 border-2 border-red-900 rounded hover:bg-[#EFEFEF] hover:border-red-900 hover:text-red-900'>Cancel</button>
                    </div>

                </form>
            </div>
        </Modal>
        )
    }
}

export default UpdateVenueForm;
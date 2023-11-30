import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import createVenue from '../../../functions/createVenue/createVenue';
import relocateToProfile from '../../../functions/relocateToProfile/relocateToProfile';
import 'react-toastify/dist/ReactToastify.css';

function CreateVenueForm() {
    const { handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        const rating = data.rating ? parseInt(data.rating) : 0;
        const mediaArray = data.media || [];
        console.log(mediaArray);

        const body = {
            name: data.name,
            description: data.description,
            media: mediaArray.length > 0 ? mediaArray : ['https://images.unsplash.com/photo-1582201943259-c891687a0a9a?q=80&w=2315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
            price: parseInt(data.price),
            maxGuests: parseInt(data.maxGuests),
            rating: rating,
            meta: {
                wifi: data.meta.wifi || false,
                parking: data.meta.parking || false,
                breakfast: data.meta.breakfast || false,
                pets: data.meta.pets || false,
              },
            location: {
                address: data.location.address,
                city: data.location.city,
                zip: data.location.zip,
                country: data.location.country,
                continent: data.location.continent,
            },
        };
        
        try {
            const response = await createVenue(body);
            if(response) {
                setTimeout(relocateToProfile, 4000);
            }
            
        } catch (error) {
            toast.error('Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    return (
        <div className='w-56'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='md:flex md:gap-10 md:justify-center md:mt-5'>
                    <div className='flex flex-col'>
                    <h2 className='my-2 text-[#FFEC58] text-md md:mt-0'>General information: </h2>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='text-sm mt-5 mb-1 md:mt-0'>Name *</label>
                            <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" className='border rounded pl-1' required />}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="description" className='text-sm mt-5 mb-1'>Description *</label>
                            <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" className='border rounded pl-1' required />}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="media" className='text-sm mt-5 mb-1'>Images (url)</label>
                            <Controller
                                name="media"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                <input {...field} type="url" className='border rounded pl-1'
                                onChange={(e) => field.onChange(e.target.value.split(',').map((url) => url.trim()))} />
                                )} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="price" className='text-sm mt-5 mb-1'>Price per night *</label>
                            <Controller
                            name="price"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="number" className='border rounded pl-1' required />}
                            />
                        </div>                
                        <div className='flex justify-between items-center mt-5'>
                            <label htmlFor="maxGuests" className='text-sm'>Max guests *</label>
                            <Controller
                            name="maxGuests"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="number" className='border w-12 rounded pl-1 h-7' required />}
                            />
                        </div>
                        <div className='flex justify-between items-center mt-5'>
                            <label htmlFor='rating' className='text-sm'>Rating</label>
                            <Controller
                            name="rating"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => <input type="number" className='border w-12 rounded pl-1 h-7' {...field} />}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='mt-10 md:m-0'>
                            <h2 className='my-2 text-[#FFEC58] text-md md:mt-0'>Additional information: </h2>
                            <div className='w-24 flex justify-between'>
                                <label className='mr-2 text-sm'>Wifi:</label>
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
                                <label className='mr-2 text-sm'>Parking:</label>
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
                                <label className='mr-2 text-sm'>Breakfast: </label>
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
                                <label className='mr-2 text-sm'>Pets:</label>   
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
                                <label htmlFor='location.address' className='text-sm mb-1'>Address</label>
                                <Controller
                                name="location.address"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} type="text" className='border rounded pl-1' />}
                                />
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex flex-col mr-1'>
                                    <label htmlFor='location.zip' className='text-sm mt-5 mb-1'>Zip code</label>
                                    <Controller
                                    name="location.zip"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} type="text" className='border rounded pl-1 w-16' />}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='location.city' className='text-sm mt-5 mb-1'>City</label>
                                    <Controller
                                    name="location.city"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} type="text" className='border rounded pl-1 w-36' />}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='location.country' className='text-sm mt-5 mb-1'>Country</label>
                                <Controller
                                name="location.country"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} type="text mt-5 mb-1" className='border rounded pl-1' />}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='location.continent' className='text-sm mt-5 mb-1'>Continent</label>
                                <Controller
                                name="location.continent"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} type="text" className='border rounded pl-1' />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-5'>
                    <button type='submit' className='my-2 bg-[#FFEC58] text-lg text-black w-32 py-1 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222] hover:text-[#FFEC58]'>Add venue</button>
                </div>
                
            </form>
        </div>
    )
}

export default CreateVenueForm;
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import createVenue from '../../functions/createVenue/createVenue';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile';
import 'react-toastify/dist/ReactToastify.css';

function CreateVenueForm() {
    const { handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        const rating = data.rating ? parseInt(data.rating) : 0;

        const body = {
            name: data.name,
            description: data.description,
            media: data.media.length > 0 ? [data.media] : ['https://images.unsplash.com/photo-1582201943259-c891687a0a9a?q=80&w=2315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
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
                <div className='flex flex-col'>
                    <label htmlFor="name">Name *</label>
                    <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="text" className='border' required />}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="description">Description *</label>
                    <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="text" className='border' required />}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="media">Media</label>
                    <Controller
                        name="media"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                        <input {...field} type="url" className='border' />
                        )} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="price">Price per night *</label>
                    <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="number" className='border' required />}
                    />
                </div>                
                <div className='flex justify-between'>
                    <label htmlFor="maxGuests">Max guests *</label>
                    <Controller
                    name="maxGuests"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="number" className='border w-12' required />}
                    />
                </div>

                <div className='flex justify-between'>
                    <label>Rating</label>
                    <Controller
                    name="rating"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => <input type="number" className='border w-12' {...field} />}
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
                        render={({ field }) => <input {...field} type="text" className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>City</label>
                        <Controller
                        name="location.city"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="text" className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Zip code</label>
                        <Controller
                        name="location.zip"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="text" className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Country</label>
                        <Controller
                        name="location.country"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="text" className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Continent</label>
                        <Controller
                        name="location.continent"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="text" className='border' />}
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <button type='submit' className='bg-gray-200'>Submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default CreateVenueForm;
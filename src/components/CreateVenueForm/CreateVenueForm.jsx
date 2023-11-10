import { useForm, Controller } from 'react-hook-form';
import createVenue from '../../functions/createVenue/createVenue';

function CreateVenueForm() {
    const { handleSubmit, control } = useForm();


    const onSubmit = async (data) => {
        const rating = data.rating ? parseInt(data.rating) : 0;
        const meta = {
            wifi: !!data.wifi,
            parking: !!data.parking,
            breakfast: !!data.breakfast,
            pets: !!data.pets,
          };
        console.log(meta.wifi)


        const body = {
            name: data.name,
            description: data.description,
            media: [data.media],
            price: parseInt(data.price),
            maxGuests: parseInt(data.maxGuests),
            rating: rating,
            meta: meta,
            location: {
                address: data.address,
                city: data.city,
                zip: data.zip,
                country: data.country,
                continent: data.continent,
            },
        };
        
        try {
            const response = await createVenue(body);
            console.log(response)
            
        } catch (error) {
            console.log(error);
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
                        <input {...field} type="text" className='border' />
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
                            <input type="checkbox" {...field} checked={field.value} />
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
                            <input type="checkbox" {...field} checked={field.value} />
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
                            <input type="checkbox" {...field} checked={field.value} />
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
                            <input type="checkbox" {...field} checked={field.value} />
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
                        render={({ field }) => <input {...field} className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>City</label>
                        <Controller
                        name="location.city"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Zip code</label>
                        <Controller
                        name="location.zip"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Country</label>
                        <Controller
                        name="location.country"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} className='border' />}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Continent</label>
                        <Controller
                        name="location.continent"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} className='border' />}
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
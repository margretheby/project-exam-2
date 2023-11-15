import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import createBooking from '../../functions/createBooking/createBooking.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookingForm() {
    const { handleSubmit, control } = useForm();
    let { id } = useParams();

    const onSubmit = async (data) => {
        const body = {
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            guests: parseInt(data.guests),
            venueId: id,
        }
        
        try {
            const response = await createBooking(body);
            console.log(response);
            
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
            <div className='flex justify-between'>
                <label htmlFor="dateFrom">From:</label>
                <Controller
                name="dateFrom"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="date" className='border w-32' required />}
                />
            </div>
            <div className='flex justify-between'>
                <label htmlFor="dateTo">To: </label>
                <Controller
                name="dateTo"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="date" className='border w-32' required />}
                />
            </div>
            <div className='flex justify-between'>
                <label htmlFor="guests">Guests: </label>
                <Controller
                    name="guests"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <input {...field} type="number" className='border w-32' />
                    )} />
            </div>
            <button type='submit' className='bg-gray-200'>Book now</button> 
        </form>
        </div>
    )
}

export default BookingForm;
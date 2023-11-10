import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookingsUrl } from '../../variables/api.jsx';
import { accessToken } from '../../variables/localStorage.jsx';


function BookingForm() {
    let { id } = useParams();

    const [formData, setFormData] = useState({
        dateFrom: new Date(),
        dateTo: new Date(),
        venueId: id,
        guests: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === 'guests') {
            setFormData({
                ...formData,
                [name]: parseInt(value, 10),
            })
        } else if(name === 'dateFrom' || 'dateTo') {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = String(date.getMonth() +1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`

            setFormData({
                ...formData, 
                [name]: formattedDate,
            });
        } 

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookingFormData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData)
            }

            const response = await fetch(bookingsUrl, bookingFormData);

            if(response.ok) {
                const bookingData = await response.json();
                /*const dateFrom = bookingData.dateFrom;
                const dateTo = bookingData.dateTo;
                const venueId = bookingData.venueId;
                const guests = bookingData.guests; */
                console.log(bookingData);

            } /*else {
                console.log('Not success')
            } */
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex justify-between items-center'>
                    <label htmlFor='dateFrom'>From: </label>
                    <input 
                        type='date' 
                        name='dateFrom'
                        value={formData.dateFrom}
                        onChange={handleChange} 
                        className='border m-2'/>
                </div>
                <div className='flex justify-between items-center'>
                    <label htmlFor='dateTo'>To: </label>
                    <input 
                        type='date' 
                        name='dateTo' 
                        value={formData.dateTo}
                        onChange={handleChange}
                        className='border m-2'/>
                </div>
                <div className='flex justify-between items-center'>
                    <label htmlFor='guests'>Guests: </label>
                    <input 
                        type='number' 
                        name='guests' 
                        value={formData.guests}
                        onChange={handleChange}
                        className='border m-2 w-20 text-center' />
                </div>

                <div className='flex justify-between items-center'>
                    <button type='submit' className='bg-gray-200'>Book now</button> 
                </div>
                
            </form>
        </div>
    )
}

export default BookingForm;
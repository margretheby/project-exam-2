import { venueUrl } from '../../variables/api.jsx'
import { accessToken, username } from '../../variables/localStorage.jsx'
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import BookingForm from '../BookingForm/BookingForm.jsx';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css'

function FetchBookings() {
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ throwError, setThrowError ] = useState(false);
    const [ bookings, setBookings ] = useState([]);
    const [ owner, setOwner ] = useState();

    let { id } = useParams();
    const venueBookingsUrl = `${venueUrl}/${id}?_bookings=true&_owner=true`;

    useEffect(() => {
        async function getBookings() {
            try {
                setLoading(true);
                setThrowError(false);

                const bookingData = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify()
                }
        
        
                const response = await fetch(venueBookingsUrl, bookingData);
                const result = await response.json();

                const venueBookings = result.bookings;
                const venueOwner = result.owner.name;


                

                setOwner(venueOwner);
                setBookings(venueBookings);

                

                const eventList = result.bookings.map((booking) => ({
                    start: new Date(booking.dateFrom),
                    end: new Date(booking.dateTo),
                    guests: booking.guests,
                    venueId: booking.id
                }));

                
                setEvents(eventList);
                setLoading(false);
            } catch(error) {
                setLoading(false);
                setThrowError(true);
                console.log(error);
            }
        }

        getBookings();
    }, [venueBookingsUrl])


    return { events, bookings, owner, loading, throwError };
}

function DisplayBookingsOfVenue() {
    const { events, bookings, owner, loading, throwError } = FetchBookings();
    if(loading) {
        return <div>Loading ... </div>
    }

    if(!loading && throwError) {
        return <div>Something went wrong...</div>
    }

    return (
        <div>
            <div className='my-16'>
                { owner === username ? (
                    <div>
                        {bookings.map((booking) => {
                            const { id, dateFrom, dateTo } = booking;
                            const formattedDateFrom = dateFrom.split('T')[0];
                            const formattedDateTo = dateTo.split('T')[0];

                            return (
                                <div key={id}>
                                    <p>From {formattedDateFrom} to {formattedDateTo}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : null }
            </div>
            <div id="calendar" className="w-56 my-10">
                <h3 className='text-xl text-[#FFEC58] text-center'>Available dates: </h3>
                <div className='flex mb-2 justify-center text-sm'>
                    <p className='text-black font-bold bg-[#FFEC58] px-2'>*</p>
                    <p className='ml-2'> = already booked</p>
                </div>
                
                <div className='text-black'>
                    <Calendar
                        className='px-1'
                        events={events}
                        tileContent={({date}) => {
                            if(events.some((event) => date >= event.start && date <= event.end )) {
                                return <div className='bg-[#FFEC58]'>*</div>
                            }
                            return null;
                        }} />
                </div>
                <BookingForm />
            </div>
        </div>
    )
}

export default DisplayBookingsOfVenue;
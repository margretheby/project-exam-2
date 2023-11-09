import { bookingsUrl } from '../../variables/api.jsx'
import { accessToken } from '../../variables/localStorage.jsx'
import Calendar from 'react-calendar';
import BookingForm from '../BookingForm/BookingForm.jsx';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css'

function FetchBookings(method, url) {
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ throwError, setThrowError ] = useState(false);

    useEffect(() => {
        async function getBookings() {
            try {
                setLoading(true);
                setThrowError(false);

                const bookingData = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify()
                }
        
        
                const response = await fetch(url, bookingData);
                const result = await response.json();

                

                const eventList = result.map((booking) => ({
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
    }, [])


    return { events, loading, throwError };
}

function DisplayBookingsOfVenue() {
    const getMethod = 'GET';
    const { events, loading, throwError } = FetchBookings(getMethod, bookingsUrl);
    if(loading) {
        return <div>Loading ... </div>
    }

    if(!loading && throwError) {
        return <div>Something went wrong...</div>
    }

    console.log(events);

    return (
        <div>
            <div id="calendar" className="w-56 my-10">
                <h3>Choose your stay: </h3>
                <p>* = already booked</p>
                <div>
                    <Calendar
                        events={events}
                        tileContent={({date, view}) => {
                            if(events.some((event) => date >= event.start && date <= event.end )) {
                                return <div className='bg-pink-300'>*</div>
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
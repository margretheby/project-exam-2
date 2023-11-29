import { venueUrl } from '../../variables/api.jsx'
import { accessToken } from '../../variables/localStorage.jsx'
import { useParams } from 'react-router-dom';
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
            }
        }

        getBookings();
    }, [venueBookingsUrl])

    return { events, bookings, owner, loading, throwError };
}

export default FetchBookings;
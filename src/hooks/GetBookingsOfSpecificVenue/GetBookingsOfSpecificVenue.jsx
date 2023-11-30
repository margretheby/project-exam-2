import { venueUrl } from '../../variables/api.jsx'
import { accessToken } from '../../variables/localStorage.jsx'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css'

/**
 * FetchBookings Hook to fetch bookings of a specific venue
 * @returns {Object} containing events, bookings, owner, loading and error states
 */
function FetchBookings() {
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ throwError, setThrowError ] = useState(false);
    const [ bookings, setBookings ] = useState([]);
    const [ owner, setOwner ] = useState();

    let { id } = useParams();
    const venueBookingsUrl = `${venueUrl}/${id}?_bookings=true&_owner=true`;

    useEffect(() => {
        // API call function with try/catch blocks
        async function getBookings() {
            try {
                setLoading(true);
                setThrowError(false);

                // Make GET request
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

                // Update owner and bookings states
                setOwner(venueOwner);
                setBookings(venueBookings);

                const eventList = result.bookings.map((booking) => ({
                    start: new Date(booking.dateFrom),
                    end: new Date(booking.dateTo),
                    guests: booking.guests,
                    venueId: booking.id
                }));

                // Update event and loading states
                setEvents(eventList);
                setLoading(false);
            } catch(error) {
                // Update loading and error states
                setLoading(false);
                setThrowError(true);
            }
        }

        getBookings();
    }, [venueBookingsUrl])

    return { events, bookings, owner, loading, throwError };
}

export default FetchBookings;
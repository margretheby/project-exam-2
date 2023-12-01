import { username } from '../../../variables/localStorage.jsx'
import Calendar from 'react-calendar';
import BookingForm from '../../user/BookingForm/BookingForm.jsx';
import 'react-calendar/dist/Calendar.css'
import FetchBookings from '../../../hooks/GetBookingsOfSpecificVenue/GetBookingsOfSpecificVenue.jsx';

/**
 * Fetch bookings of a venue and display the result if the API call is successful
 * @component
 * @returns {JSX.Element}} returns the JSX representation of the DisplayBookingsOfVenue component
 */
function DisplayBookingsOfVenue() {
    const { events, bookings, owner, loading, throwError } = FetchBookings();
    if(loading) {
        return (
            <div className="flex justify-center items-center my-20">
                <img src='/icons/loading.png' alt='Loading' className="w-10 animate-spin" />
                <p className="ml-5 text-[#FFEC58]">Loading bookings ...</p>
            </div>
        )
    }

    if(!loading && throwError) {
        return <div>Something went wrong...</div>
    }

    return (
        <div>
            <div className='sm:flex sm:flex-col'>
                <div className='my-16 sm:order-2 sm:mt-0 sm:mb-10'>
                    { owner === username && bookings.length > 0 ? (
                        <div>
                            <h2 className='text-lg text-[#FFEC58] text-center  sm:w-72'>Bookings:</h2>
                            {bookings.map((booking) => {
                                const { id, dateFrom, dateTo } = booking;
                                const formattedDateFrom = dateFrom.split('T')[0];
                                const formattedDateTo = dateTo.split('T')[0];
                                

                                return (
                                    <div key={id} className='mt-2 text-center'>
                                        <ul>
                                            <li>From {formattedDateFrom} to {formattedDateTo}</li>
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null }
                </div>
                <div id="calendar" className="w-64 my-10 sm:order-1 sm:mt-5  sm:w-72">
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
        </div>
    )
}

export default DisplayBookingsOfVenue;
import { useState } from 'react';
import { venueUrl } from '../../../variables/api.jsx'
import DisplaySearchResult from '../DisplaySearchResult/DisplaySearchResult.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Form to search for venues and run DisplaySearchResult component
 * @component
 * @returns {React.Component} returns the Search component
 */
function Search() {
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);

    // Handle key-up event in the search input
    function handleKeyUp(search) {
        // Filters the search results based on the user's input and updates the SearchResult state.
        const filteredSearch = search.filter((venue) => {
            return venue.name.toLowerCase().includes(searchQuery.toLowerCase())
        })

        setSearchResult(filteredSearch);
    }
    // Handle the search operation, fetches venue data from the API and triggers the key-up handler
    async function handleSearch() {
        try {
            const response = await fetch(venueUrl);
            const result = await response.json();

            handleKeyUp(result);
        } catch(error) {
            toast.error('Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }
    return (
        <div>
            <form className='flex justify-center sm:justify-end pt-4 ml-10 md:pt-0'>
                <input 
                    type='search'
                    name='search' 
                    placeholder='Search for venues' 
                    className='border rounded w-48 text-black opacity-80 focus:opacity-100'
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    onKeyUp={handleSearch}>

                </input>
                <label htmlFor='search'><img src='/icons/search.png' className='w-8 ml-3' alt='Search'/></label>
            </form>
            {searchQuery ? <DisplaySearchResult venues={searchResult} /> : null }
            
        </div>
    )
}

export default Search;
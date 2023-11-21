import { displaySearch } from '../../functions/displaySearch/displaySearch.jsx'
import { useState } from 'react';
import { venueUrl } from '../../variables/api.jsx'
import DisplaySearchResult from '../DisplaySearchResult/DisplaySearchResult.jsx';

function Search() {
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);

    function handleKeyUp(search) {
        const filteredSearch = search.filter((venue) => {
            return venue.name.toLowerCase().includes(searchQuery.toLowerCase())
        })

        setSearchResult(filteredSearch);
        displaySearch(searchResult);
    }

    async function handleSearch() {
        try {
            const response = await fetch(venueUrl);
            const result = await response.json();

            handleKeyUp(result);
            displaySearch(searchResult)
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className='flex justify-left pt-4'>
                <input 
                    type='search'
                    name='search' 
                    placeholder='Search for venues' 
                    className='border rounded w-48 text-black'
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
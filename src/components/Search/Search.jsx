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
            <form>
                <input 
                    type='search'
                    name='search' 
                    placeholder='Search' 
                    className='border'
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    onKeyUp={handleSearch}>

                </input>
                <label htmlFor='search'>Search</label>
            </form>
            <DisplaySearchResult venues={searchResult} />
        </div>
    )
}

export default Search;
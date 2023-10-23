import { Link } from 'react-router-dom';

function DisplaySearchResult(searchQuery) {
    if (searchQuery.venues.length === 0) {
        return (
            <div>
                <p>No venues with that name.</p>
            </div>
        )
    }
    return (
        <div>
            {searchQuery.venues.map((result) => {
                const { media, id, name, price } = result; 
                return (
                    <div key={id} className='m-10'>
                        <Link to={`venues/${id}`}>
                            <img src={media} alt={name} className='w-10' />
                            <p>{name}</p>
                            <p>{price} kr per night</p>
                        </Link>
                    </div>)
            })}
        </div>
    )
}

export default DisplaySearchResult;
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
        <div className="flex flex-wrap justify-center gap-5">
            {searchQuery.venues.map((result) => {
                const { media, id, name, price } = result; 
                return (
                    <div key={id} className='my-10 max-w-[40%]'>
                        <Link to={`/venues/${id}`}>
                            <div className='h-32 w-32 bg-cover bg-center'  style={{ backgroundImage: `url('${media[0]}')` }}>
                                
                            </div>
                            
                            <p className="text-sm w-32">{name}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-lg w-14">{price}</p>
                                <p className="text-sm w-18"> kr per night</p>
                            </div>
                        </Link>
                    </div>)
            })}
        </div>
    )
}

export default DisplaySearchResult;
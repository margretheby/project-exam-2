function DisplaySearchResult(searchQuery) {
    if (searchQuery.venues.length === 0) {
        return (
            <div>
                <p>No venues with that name.</p>
            </div>
        )
    }
    console.log(searchQuery.venues)
    return (
        <div>
            {searchQuery.venues.map((result) => {
                console.log(result)
                const { media, id, name, price } = result; 
                return (
                    <div key={id} className='m-10'>
                        <img src={media} alt={name} className='w-10' />
                        <p>{name}</p>
                        <p>{price} kr per night</p>
                    </div>)
            })}
        </div>
    )
}

export default DisplaySearchResult;
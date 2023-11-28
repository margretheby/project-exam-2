export function displaySearch(searchResults) {
    return (
        <div>
            {searchResults.map((result) => {
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
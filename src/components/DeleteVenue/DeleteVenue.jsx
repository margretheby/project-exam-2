import { venueUrl } from '../../variables/api.jsx'
import { useParams } from 'react-router-dom';
import { accessToken } from '../../variables/localStorage.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import relocateToProfile from '../../functions/relocateToProfile/relocateToProfile.jsx';


function DeleteVenueButton() {
    let { id } = useParams();
    const deleteVenueUrl = `${venueUrl}/${id}`

    const deleteVenue = async () => {
        try {
            const deleteVenueData = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
            }

            const response = await fetch(deleteVenueUrl, deleteVenueData);
            
            if(response.ok) {
                toast.success('The venue was deleted.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });

                setTimeout(relocateToProfile, 3000);

            } else {
                toast.error('Something went wrong, please try again', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                  });
            }
        } catch(error) {
            console.error('Error deleting venue:', error);
        }
    }

    return (
        <div>
            <button className='my-2 bg-red-900 text-sm text-white px-2 border-2 border-red-900 rounded hover:bg-[#EFEFEF] hover:border-red-900 hover:text-red-900' onClick={deleteVenue}>Delete</button>
        </div>
    )
}

export default DeleteVenueButton;
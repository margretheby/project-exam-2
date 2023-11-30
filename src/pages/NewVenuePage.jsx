import CreateVenueForm from "../components/manager/CreateVenueForm/CreateVenueForm";
import { Helmet } from 'react-helmet';

function NewVenue() {
    return (
      <div className="py-10 px-4 bg-gradient-to-t from-[#222222] to-[#222222aa] flex flex-col items-center">
        <div className='application'>
          <Helmet>
            <meta charset="utf-8" />
            <link rel="icon" href="icons/loading.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Add a new venue | Holidaze</title>
            <meta name="description" content="Add a new venue so people can book their stay." />
          </Helmet>
        </div>
        <h1 className="text-2xl text-[#FFEC58]">Add new venue</h1> 
        <CreateVenueForm />
      </div>
    );
 }

export default NewVenue;
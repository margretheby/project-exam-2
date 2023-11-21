import CreateVenueForm from "../components/CreateVenueForm/CreateVenueForm";

function NewVenue() {
    return (
      <div className="py-10 px-4 bg-gradient-to-t from-[#222222] to-[#222222aa] flex flex-col items-center">
        <h1>Add venue</h1> 
        <CreateVenueForm />
      </div>
    );
 }

export default NewVenue;
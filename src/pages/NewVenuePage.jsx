import CreateVenueForm from "../components/CreateVenueForm/CreateVenueForm";

function NewVenue() {
    return (
      <div className="my-10 mx-4">
        <h1>Add venue</h1> 
        <CreateVenueForm />
      </div>
    );
 }

export default NewVenue;
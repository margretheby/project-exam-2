import DisplayVenues from "../components/DisplayVenues/DisplayVenues";
import Search from "../components/Search/Search";

function Home() {
    return (
        <div className="my-10">
          <div>
              <h2>Looking for accomodation for your next trip?</h2>
              <h2>You have come to the right place.</h2>
              <h3>V</h3>
          </div>
          <div>
              <Search />
          </div>
          <div className="my-10">
              <h2>Venues</h2>
            <DisplayVenues /> 
          </div>
        </div>
    );
  }
  
  export default Home;
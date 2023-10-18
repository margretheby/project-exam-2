import DisplayVenues from "../components/DisplayVenues/DisplayVenues";

function Home() {
    return (
        <div className="my-10">
          <div className="h-screen">
              <h2>Looking for accomodation for your next trip?</h2>
              <h2>You have come to the right place.</h2>
              <h3>V</h3>
          </div>
          <DisplayVenues />
        </div>
    );
  }
  
  export default Home;
import DisplayVenues from "../components/DisplayVenues/DisplayVenues";
import Search from "../components/Search/Search";

function Home() {
    return (
        <div className="mt-10 mx-4">
          <div className="h-screen">
            <div className="flex flex-col items-center text-center">
                <h2 className="mt-28">Looking for accomodation for your next trip?</h2>
                <h2 className="mt-2">You have come to the right place.</h2>
                <div className="mt-32">
                  <a href='#search'>
                    <img src='/icons/arrow.png' alt='See venues' className="w-20 p-5 animate-bounce" />
                  </a>
                  
                </div>
            </div>
          </div>
          <div id='search' className="mx-5">
              <Search />
          </div>
          <div className="my-5">
              <h2 className="text-3xl text-[#FFEC58] mx-5">Venues</h2>
            <DisplayVenues /> 
          </div>
        </div>
    );
  }
  
  export default Home;
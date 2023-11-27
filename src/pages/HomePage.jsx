import DisplayVenues from "../components/DisplayVenues/DisplayVenues";
import Search from "../components/Search/Search";

function Home() {
    return (
        <div className="pt-10 px-4">
          <div className="h-screen">
            <div className="flex flex-col items-center text-center">
              <div className="mt-28 bg-gradient-to-t from-[#222222aa] to-[#222222aa] sm:bg-none">
                <h2 className=" sm:text-2xl">Looking for accomodation for your next trip?</h2>
                <h2 className="mt-2 sm:text-2xl">You have come to the right place.</h2>
              </div>

                <div className="mt-32">
                  <a href='#search'>
                    <img src='/icons/arrow.png' alt='See venues' className="w-20 p-5 animate-bounce" />
                  </a>
                  
                </div>
            </div>
          </div>
          <div id='search' className="px-5">
              <Search />
          </div>
          <div className="py-5">
            <DisplayVenues /> 
          </div>
        </div>
    );
  }
  
  export default Home;
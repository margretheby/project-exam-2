import DisplayVenues from "../components/DisplayVenues/DisplayVenues";
import Search from "../components/Search/Search";
import { Helmet } from 'react-helmet';

function Home() {
    return (
        <div className="pt-10 px-4">
          <div className="application">
            <Helmet>
              <meta charset="utf-8" />
              <link rel="icon" href="icons/loading.png" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Home | Holidaze</title>
                <meta name="description" content="Holidaze will help you find the right accommodation for your next trip. Book your next stay at one of our amazing venues." />
            </Helmet>
          </div>
          <div className="h-screen">
            <div className="flex flex-col items-center text-center">
              <div className="mt-28 bg-gradient-to-t from-[#222222aa] to-[#222222aa] sm:bg-none">
                <h2 className=" sm:text-2xl">Looking for accommodation for your next trip?</h2>
                <h2 className="mt-2 sm:text-2xl">You have come to the right place.</h2>
              </div>

                <div className="mt-32">
                  <a href='#search'>
                    <img src='/icons/arrow.png' alt='See venues' className="w-20 p-5 animate-bounce" />
                  </a>
                  
                </div>
            </div>
          </div>
          <div className="md:flex md:justify-between md:items-top md:mr-10">
            <div id='search' className="px-5 mb-5 md:order-2 md:px-0">
                <Search />
            </div>
            <div className="ml-10">
                <h2 className="text-3xl text-[#FFEC58] mx-5">Venues</h2>
            </div>
          </div>
          <div className="py-5">
            <DisplayVenues /> 
          </div>
        </div>
    );
  }
  
  export default Home;
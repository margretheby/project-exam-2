import DisplayVenues from "../components/general/DisplayVenues/DisplayVenues";
import Search from "../components/general/Search/Search";
import { Helmet } from 'react-helmet';

function Venues() {
    return (
        <div className="pt-10 px-4">
            <div className="application">
                <Helmet>
                <meta charset="utf-8" />
                <link rel="icon" href="icons/loading.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Venues | Holidaze</title>
                    <meta name="description" content="Holidaze will help you find the right accommodation for your next trip. Book your next stay at one of our amazing venues." />
                </Helmet>
            </div>
            <div className="flex justify-center">
                <h1 className="text-3xl text-[#FFEC58] mx-5 mb-16">Venues</h1>
            </div>
            <div className="md:flex md:justify-end md:gap-56 md:items-top md:mr-20">
                <div id='search' className="px-5 md:order-2 md:px-0">
                    <Search />
                </div>
            </div>
            <div className="pb-5">
                <DisplayVenues /> 
            </div>
        </div>
    );
  }
  
export default Venues;
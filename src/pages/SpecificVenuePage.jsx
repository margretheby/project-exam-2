import DisplaySpecificVenue from "../components/general/DisplaySpecificVenue/DisplaySpecificVenue";
import { Helmet } from 'react-helmet';

function SpecificVenue() {
    return (
      <div className="px-4 py-10 bg-gradient-to-t from-[#222222] to-[#222222aa]">
        <div className='application'>
          <Helmet>
              <link rel="icon" href="icons/loading.png" />
          </Helmet>
        </div>
        <DisplaySpecificVenue />
      </div>
    );
  }
  
  export default SpecificVenue;
import DisplayProfile from "../components/DisplayProfile/DisplayProfile";
import { Helmet } from 'react-helmet';
import { username } from "../variables/localStorage";

function Profile() {
    return (
      <div className="py-10 px-4 bg-gradient-to-t from-[#222222] to-[#222222aa]">
        <div className='application'>
          <Helmet>
            <meta charset="utf-8" />
            <link rel="icon" href="icons/loading.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{username} | Holidaze</title>
            <meta name="description" content="Your profile page contains information about your bookings and the venues you manage." />
          </Helmet>
        </div>
        <DisplayProfile />
      </div>
    );
  }
  
  export default Profile;
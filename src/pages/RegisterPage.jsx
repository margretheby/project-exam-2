import RegisterUserForm from "../components/auth/RegisterUserForm/RegisterUserForm";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Register() {
    return (
      <div className="py-10 px-4 bg-gradient-to-t from-[#222222] to-[#222222aa] pb-48">
        <div className='application'>
          <Helmet>
            <meta charset="utf-8" />
            <link rel="icon" href="icons/loading.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Register | Holidaze</title>
            <meta name="description" content="Create a user so that you can book your next stay at one of our amazing venues." />
          </Helmet>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-[#FFEC58]">Registrer</h1>
          <RegisterUserForm />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm mt-7">Already have an account?</p>
          <Link to='/login' className="mt-2 text-lg font-bold text-[#FFEC58] hover:underline hover:text-white">Login here.</Link>
        </div>

      </div>
    );
  }
  
  export default Register;
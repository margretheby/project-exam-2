import RegisterUserForm from "../components/RegisterUserForm/RegisterUserForm";
import { Link } from 'react-router-dom';

function Register() {
    return (
      <div className="py-10 px-4 bg-gradient-to-t from-[#222222] to-[#222222aa] pb-48">
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
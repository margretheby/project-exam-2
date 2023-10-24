import RegisterForm from "../components/RegisterUser/RegisterUser";
import { Link } from 'react-router-dom';

function Register() {
    return (
      <div className="my-10">
        <div>
          Registrer
          <RegisterForm />
        </div>
        <div>
          <p>Already have an account?</p>
          <Link to='/login'>Login here.</Link>
        </div>

      </div>
    );
  }
  
  export default Register;
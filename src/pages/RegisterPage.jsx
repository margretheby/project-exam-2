import RegisterUserForm from "../components/RegisterUserForm/RegisterUserForm";
import { Link } from 'react-router-dom';

function Register() {
    return (
      <div className="my-10 mx-4">
        <div>
          Registrer
          <RegisterUserForm />
        </div>
        <div>
          <p>Already have an account?</p>
          <Link to='/login'>Login here.</Link>
        </div>

      </div>
    );
  }
  
  export default Register;
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginUser/LoginUser';

function Login() {
    return (
      <div className="my-10">
        <div>
          <h1>Login</h1>
          <LoginForm />
        </div>
        <div>
          <Link to="/registrer">Registrer</Link>
        </div>
        
      </div>
    );
  }
  
  export default Login;
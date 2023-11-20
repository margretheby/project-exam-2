import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginUser/LoginUser';

function Login() {
    return (
      <div className="my-10 mx-4">
        <div>
          <h1>Login</h1>
          <LoginForm />
        </div>
        <div>
          <p>Don't have an account?</p>
          <Link to="/register">Register here.</Link>
        </div>
        
      </div>
    );
  }
  
  export default Login;
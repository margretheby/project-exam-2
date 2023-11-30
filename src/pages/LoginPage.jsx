import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginUser/LoginUser';
import { Helmet } from 'react-helmet';

/**
 * Login component that represents the login page of the application
 * @returns {JSX.Element}} Login page
 */
function Login() {
    return (
      <div className="py-10 px-4 bg-gradient-to-t from-[#222222] to-[#222222aa] pb-80">
        <div className='application'>
          <Helmet>
            <meta charset="utf-8" />
            <link rel="icon" href="icons/loading.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Login | Holidaze</title>
            <meta name="description" content="Login and start booking your next stay." />
          </Helmet>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl text-[#FFEC58]'>Login</h1>
          <LoginForm />
        </div>
        <div className='my-5 flex flex-col items-center'>
          <p className='text-sm mt-7'>Don't have an account?</p>
          <Link to="/register" className='mt-2 text-lg font-bold text-[#FFEC58] hover:underline hover:text-white'>Register here.</Link>
        </div>
      </div>
    );
  }
  
  export default Login;
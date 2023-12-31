import { loginUrl } from '../../../variables/api.jsx';
import { useForm, Controller } from 'react-hook-form';
import relocateToProfile from '../../../functions/relocateToProfile/relocateToProfile.jsx';
import saveToStorage from '../../../functions/saveToStorage/saveToStorage.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Form to log in a user
 * @component
 * @returns {JSX.Element}} returns the JSX representation of the LoginForm component
 */
const LoginForm = () => {
    const { handleSubmit, control } = useForm();
  
    const onSubmit = async (data) => {
      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const loginData = await response.json();
          const { name: username, avatar: userAvatar, accessToken } = loginData;
  
          // Saving user information in localStorage
          saveToStorage(accessToken, username, userAvatar);
  
          // User feedback on login successful
          toast.success('You are logged in', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
  
          // Relocating when logging in.
          setTimeout(relocateToProfile, 3000);
        } else {
          const errorData = await response.json();
          toast.error(`Login failed: ${errorData.message}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Something went wrong, please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      }
    };
  
    return (
      <div className="w-48">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="email" className='text-sm mt-5 mb-1'>E-mail</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="example@stud.noroff.no"
                className="border rounded pl-1"
                required
              />
            )}
          />
          <label htmlFor="password" className='text-sm mt-3 mb-1'>Password</label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="********"
                className="border rounded pl-1"
                required
              />
            )}
          />
          <div className='flex justify-center mt-5'>
            <button type="submit" className="my-2 bg-[#FFEC58] text-lg text-black w-32 py-1 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222] hover:text-[#FFEC58]">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  };

export default LoginForm;
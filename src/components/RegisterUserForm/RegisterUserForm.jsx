import { useForm, Controller } from 'react-hook-form';
import registerUser from '../../functions/registerUser/registerUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterUserForm() {
    const { handleSubmit, control } = useForm();
    
    const onSubmit = async (data) => {
        const body = {
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
            venueManager: data.venueManager
        };
    
        try {
            const registrationResult = await registerUser(body);
            return registrationResult;

    
        } catch (error) {
            toast.error('Something went wrong, please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    };
    
    
    return (
        <div className="w-48">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className='flex flex-col'>
                <label htmlFor="name" className='text-sm mt-5 mb-1'>Username *</label>
                <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="text" 
                    className='border rounded pl-1' 
                    title='Your username must not contain punctuation symbols, other than underscore (_).'
                    placeholder='your_username' 
                    required />}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="email" className='text-sm mt-5 mb-1'>E-mail *</label>
                <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="email" 
                    className='border rounded pl-1' 
                    title='You can only register with a Noroff e-mail. Example: studentname@noroff.no or studentname@stud.noroff.no'
                    placeholder='example@stud.noroff.no'
                    pattern='^[\w\-.]+@(stud\.)?noroff\.no$' 
                    required />}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password" className='text-sm mt-5 mb-1'>Password *</label>
                <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="password" 
                    className='border rounded pl-1' 
                    title='Your password must be at least 8 characters'
                    placeholder='********'
                    minLength='8' 
                    required />}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="avatar" className='text-sm mt-5 mb-1'>Avatar (url)</label>
                <Controller
                name="avatar"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="url" 
                    className='border rounded pl-1' 
                    title='Your avatar must be a valid URL.'
                    placeholder='https://image.com/avatar.jpg' />}
                />
            </div> 
            <p className='text-sm mt-5'>Do you wish to be a venue manager? </p>
            <div className='w-24 flex justify-between mt-2'>
                        <label htmlFor='venueManager' className='mr-2'>Yes</label>
                        <Controller
                        name="venueManager"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <input type="checkbox" {...field} checked={field.value === true} />
                        )}
                        />   
                    </div>
            <p className='text-sm mt-4'>You can update this later on your profile page if you change your mind.</p>
            <div className='flex justify-center mt-5'>
                <button type='submit' className="my-2 bg-[#FFEC58] text-lg text-black w-32 py-1 border-2 border-[#FFEC58] rounded hover:border-2 hover:bg-[#222222] hover:text-[#FFEC58]">Register</button>
            </div>
            
        </form>
    </div>
    )
}


export default RegisterUserForm;
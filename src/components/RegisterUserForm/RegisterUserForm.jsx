import { useForm, Controller } from 'react-hook-form';
import registerUser from '../../functions/registerUser/registerUser';
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
            console.log(error);
        }
    };
    
    
    return (
        <div className="w-48">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className='flex flex-col'>
                <label htmlFor="name">Username *</label>
                <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="text" 
                    className='border' 
                    title='Your username must not contain punctuation symbols, other than underscore (_).'
                    placeholder='your_username' 
                    required />}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="email">E-mail *</label>
                <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="email" 
                    className='border' 
                    title='You can only register with a Noroff e-mail. Example: studentname@noroff.no or studentname@stud.noroff.no'
                    placeholder='example@stud.noroff.no'
                    pattern='^[\w\-.]+@(stud\.)?noroff\.no$' 
                    required />}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password *</label>
                <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="password" 
                    className='border' 
                    title='Your password must be at least 8 characters'
                    placeholder='********'
                    minLength='8' 
                    required />}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="avatar">Avatar (url)</label>
                <Controller
                name="avatar"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <input {...field} 
                    type="url" 
                    className='border' 
                    title='Your avatar must be a valid URL.'
                    placeholder='https://image.com/avatar.jpg' />}
                />
            </div> 
            <p>Do you wish to be a venue manager?</p>
            <div className='w-24 flex justify-between'>
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
            <p>You can update this later on your profile page if you change your mind.</p>
            <button type='submit' className="border bg-gray-200">Registrer</button>
        </form>
    </div>
    )
}


export default RegisterUserForm;
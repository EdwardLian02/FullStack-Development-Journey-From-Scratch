import { useForm } from "react-hook-form";
const SignUpForm = () => {

     const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSubmit = (data) => {
    console.log(data);
  };
    return (
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Account</h2>

            <label htmlFor="name">Full Name</label>
            <input {...register('name', {
                required: "Name is required", 
            })} id="name" type="text" placeholder="John Doe" />
                {errors.name && <p className="error">{errors.name.message}</p>}
            <label htmlFor="email">Email</label>
            <input {...register('email', {
                required: "Email is required"
            })} id="email" type="email" placeholder="john@example.com" />
             {errors.email && <p className="error">{errors.email.message}</p>}

            <label htmlFor="password">Password</label>
            <input {...register('password', {
                required: "Password is required",
                minLength: {
                    value: 8, 
                    message: 'Password must be at least 8 characters'
                }
            })}
             id="password" type="password" placeholder="••••••••" />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input {...register('confirmPassword', {
                required: "Confirm password is required",
                validate: (value) =>{
                const { password } = getValues();
               return  value === password || "Confirm password should be matched with password";
                }
            })}
             id="confirmPassword" type="password" placeholder="••••••••" />
               {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

            <button type="submit">Sign Up</button>

            <p className="signup-footer">Already have an account? <a href="#">Log in</a></p>
        </form>
    )
}

export default SignUpForm;

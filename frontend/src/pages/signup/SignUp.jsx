import {useState} from "react"
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

    const [inputs, setInputs] = useState ({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    })

    const {loading, signup} = useSignup()
    
    const handleSubmit = async (e) => {
        //prevent page to refresh after submit
        e.preventDefault();
        
        await signup(inputs);
    }

  return (
    <div className = 'flex flex-col item-center justify-center min-w-96 mx-auto'>
      <div className='w-full-p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'> Chat Room </span>
        </h1>

        <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>
                            Full Name
                        </span>
                    </label>
                    <input type='text' placeholder= 'First Last' className='w-full input-bordered h-10' 
                        value={inputs.fullName}
                        onChange={(e) => setInputs ({...inputs, fullName: e.target.value})}
                    />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>
                            Username
                        </span>
                    </label>
                    <input type='text' placeholder= 'username' className='w-full input-bordered h-10' 
                        value={inputs.username}
                        onChange={(e) => setInputs ({...inputs, username: e.target.value})}
                    />
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text'>
                            Password
                        </span>
                    </label>
                    <input type='password' placeholder= 'password' className='w-full input-bordered h-10' 
                        value={inputs.password}
                        onChange={(e) => setInputs ({...inputs, password: e.target.value})}
                    
                    />
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text'>
                            confirmPassword
                        </span>
                    </label>
                    <input type='password' placeholder= 'confirm password' className='w-full input-bordered h-10' 
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs ({...inputs, confirmPassword: e.target.value})}
                    />
                </div>

            <div to={'/login'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Already have an account?
                </div>
                <div>
                    <button className='btn btn-block btn-sm mt-2 border-slate-200'
                        disabled={loading}
                        >

                    </button>
                </div>

            </form>
      </div>
    </div>
  )
}

export default SignUp;

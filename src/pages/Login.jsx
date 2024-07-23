import { useState } from 'react';
import logo from '../assest/l.png';
import { useAuth } from '../context/AuthContext';
import  {Link, redirect}  from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
    const navigate = useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const { login, googleLogin } = useAuth();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleLogin();
      navigate('/');
    } catch (error) {
      console.error('Error Logging in with Google:', error);
    }
  };

  const handlelogin = async(e)=>{
    e.preventDefault();
    try{
        await login(email,password)
        navigate('/')
    }catch(error){
        console.log('Error in Logging in',error)
    }
  };

  const redirect = async()=>{
    navigate('/forget')
  }

  return (
    <>
     <Navbar/>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black/90">
        <div className='bg-black p-5'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-black">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Login in your Trackify account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handlelogin} method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e)=>setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder='Enter Email'
                    className="block w-full bg-transparent p-2 border border-solid border-white py-1.5 text-gray-400  placeholder-gray-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e)=>setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder='Enter Password'
                    className="block w-full bg-transparent p-2 border border-solid border-white py-1.5 text-gray-400  placeholder-gray-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
            <hr className='m-2'/>
            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center rounded-full border border-gray-300 text-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:text-gray-100 "
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                  className="w-5 h-5 mr-2"
                  alt="Google logo"
                />
                Log In with Google
              </button>
            </div>
            <div onClick={redirect} className='mt-10 text-center text-sm text-gray-500 cursor-pointer hover:text-gray-200'>
                Forget your password?
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Does not have an account?{' '}
              <Link to={'/signup'} className="font-semibold leading-6 text-white hover:text-gray-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

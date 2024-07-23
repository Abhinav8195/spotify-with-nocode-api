import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'

const Forget = () => {
    const {resetPassword} = useAuth();
    const [email,setEmail]= useState('');
    const navigate = useNavigate();

    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
            await resetPassword(email);
            alert("Password reset link sent to your email");
            navigate('/login')
        }catch(error){
            console.log(error.message);
        }
    }


  return (
    <div className="flex min-h-screen items-center justify-center bg-black/90">
      <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Forget Password</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-400 rounded-md focus:outline-none  sm:text-sm"
                placeholder="Email address"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={handlesubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forget;

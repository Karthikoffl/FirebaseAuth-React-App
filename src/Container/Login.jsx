import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from "react-icons/fa";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from '../config/firebase.config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const firebaseAuth = getAuth(app);
    const google_provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const loginWithGmail = async () => {
        await signInWithPopup(firebaseAuth, google_provider).then(userCred => {
            if(userCred){
                console.log(userCred);
            }
        })
    }

  return (
    <div className='w-full h-full flex items-center justify-center p-4'>
        <div className='w-full sm:w-96 border border-gray-200 bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center gap-4'>
            <div className='w-full px-6 py-3 cursor-pointer bg-white rounded-md flex items-center justify-center hover:shadow-md' onClick={loginWithGmail}>
                <FcGoogle className='text-4xl mx-2' />
                <p className='text-lg font-semibold text-gray-600'>
                    Signin with Google
                </p>
            </div>
            <div className='w-full px-6 py-3 cursor-pointer bg-white rounded-md flex items-center justify-center hover:shadow-md '>
                <FaGithub className='text-4xl mx-2' />
                <p className='text-lg font-semibold text-gray-600'>
                    Signin with Github
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login
import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from "react-icons/fa";
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth";
import { app } from '../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { validateGoogleToken } from '../api';
import {useStateValue} from "../context/StateProvider";
import { actionType } from '../context/reducer';

const Login = () => {
    const firebaseAuth = getAuth(app);
    const google_provider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    const navigate = useNavigate();

    const [{user}, dispatch] = useStateValue();

    const loginWithGmail = async () => {
        await signInWithPopup(firebaseAuth, google_provider).then(userCred => {
            if(userCred){
                firebaseAuth.onAuthStateChanged((cred) => {
                    cred.getIdToken().then((token) => {
                        validateGoogleToken(token).then((data) => {
                            dispatch({
                                type: actionType.SET_USER,
                                user: data.data,
                            });
                            navigate("/", { replace: true });
                        });
                    });
                });
            }
        });
    };

    const loginWithGithub = async () => {
        await signInWithRedirect(firebaseAuth, gitProvider)
            .then((data) => {
                const cred = GithubAuthProvider.credentialFromResult(data);
                const token = cred.accessToken;

                console.log(cred.user);

                dispatch({
                    type : actionType.SET_USER,
                    user : cred.user,
                });
                navigate("/", { replace : true });
            })
            .catch((er) => {
                console.log(er);
            });
    };

  return (
    <div className='w-full h-full flex items-center justify-center p-4'>
        <div className='w-full sm:w-96 border border-gray-200 bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center gap-4'>
            <div className='w-full px-6 py-3 cursor-pointer bg-white rounded-md flex items-center justify-center hover:shadow-md' onClick={loginWithGmail}>
                <FcGoogle className='text-4xl mx-2' />
                <p className='text-lg font-semibold text-gray-600'>
                    Signin with Google
                </p>
            </div>
            <div className='w-full px-6 py-3 cursor-pointer bg-white rounded-md flex items-center justify-center hover:shadow-md' onClick={loginWithGithub}>
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
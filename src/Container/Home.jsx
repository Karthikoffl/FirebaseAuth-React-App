import React from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { actionType } from '../context/reducer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const logoutUser = () => {
    firebaseAuth.signOut().then(() => {
      dispatch({type : actionType.SET_USER, user : null });
      navigate("/login", { replace: true });
    })
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-60 bg-gray-50 shadow-md rounded-md p-4 flex flex-col gap-6 items-center justify-center'>
        <img src={user?.picture} className='w-24 h-24 rounded-md shadow-md' alt="" referrerPolicy="no-referrer" />
        <p className='text-md font-bold text-center'>{user?.name}</p>
        <button className='px-4 py-2 border-non outline-none rounded-md cursor-pointer shadow-md bg-red-600 text-white' onClick={logoutUser}>Sign Out</button>
      </div>
    </div>
  )
}

export default Home
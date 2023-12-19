import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const navigate =useNavigate();
  const handleGoogleClick = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth,provider)
        const res = await fetch("http://localhost:3000/api/auth/google",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            }),
        });


        const data = await res.json();
        dispatch(signInSuccess(data))
        navigate('/')
        
    } catch (error) {
      console.log("Could not log in with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 rounded-lg p-3 uppercase hover:opacity-95 text-white"
    >
      Continue with google
    </button>
  );
}

export default OAuth;

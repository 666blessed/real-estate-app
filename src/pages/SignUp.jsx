import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'; 
import {db} from '../firebase.config';
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import {toast} from 'react-toastify';
import OAuth from '../components/OAuth';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const {name, email, password} = formData;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name
      });

      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong :(');
    }
  }



  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        
        <form onSubmit={handleSubmit}>
          <input type="text" 
            className="nameInput" placeholder='Your name' id="name" value={name}
            onChange={handleChange}
          />

          <input type="email" 
            className="emailInput" placeholder='Email' id="email" value={email}
            onChange={handleChange}
          />
        
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} 
              className='passwordInput' placeholder='Password'
              id='password' value={password} onChange={handleChange}
            />
            <img src={visibilityIcon} alt="show password" 
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>

          <div className="signUpBar">
            <p className='signUpText'>Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#fff' width='34px' height='34px'/>
            </button>
          </div>

        </form>

        <OAuth/>

        <Link to='/sign-in' className='registerLink pd-bt'>
          Sign In Instead
        </Link>
    
      </div>
    </>

  );
}

export default SignUp;

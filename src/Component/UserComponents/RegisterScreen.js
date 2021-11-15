import React,{ useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../../redux/actions/userActions';
import LoadingBox from '../utilityComponents/LoadingBox';
import MessageBox from '../utilityComponents/MessageBox';

function RegisterScreen(props) {

    const dispatch = useDispatch();

    const [name, setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [confirmPassword,setConfirmPassword] = React.useState('');


    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    
    const userRegister = useSelector(state => state.userRegister)
    const {userInfo,loading,error} = userRegister;

    const submitHandler = (e)=>{
        e.preventDefault();
        //console.log(email, password)
        if(password !== confirmPassword){
            alert('Passwords are not matched')
        }else{
            dispatch(register(name,email,password));
        }
        
    }
    
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history, redirect, userInfo])


    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div >
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Name" required onChange={(e) =>setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter email" required   
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required   
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Enter Confirm password" required   
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
                <div>
                    <label />
                    <button type="submit" className="primary">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account?
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default RegisterScreen;

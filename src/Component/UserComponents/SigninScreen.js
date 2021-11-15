import React,{ useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../../redux/actions/userActions';
import LoadingBox from '../utilityComponents/LoadingBox';
import MessageBox from '../utilityComponents/MessageBox';

function SigninScreen(props) {

    const dispatch = useDispatch();

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo,loading,error} = userSignin;

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(signin(email,password));
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
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                    <label />
                    <button type="submit" className="primary">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer ? {' '} 
                        <Link to={`/register?redirect=${redirect}`}>Create Your Account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default SigninScreen

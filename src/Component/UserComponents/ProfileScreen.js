import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/actions/userConstant";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

function ProfileScreen() {
  

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {loading : loadingUpdate ,error : errorUpdate, success : successUpdate} = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
      if(!user){
        dispatch({ type: USER_UPDATE_PROFILE_RESET})
        dispatch(detailsUser(userInfo._id));
      }else{
        setName(user.name);
        setEmail(user.email);
      }
    

  }, [dispatch, userInfo._id,user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
        alert('Password are not matched');
    }else{
        dispatch(updateUserProfile({userId:userInfo._id,
        name,email, password
        }));
    }

  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <React.Fragment>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
          {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">ConfirmPassword</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirmPassword"
                onChange={(e) =>setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </React.Fragment>
        )}
      </form>
    </div>
  );
}

export default ProfileScreen;

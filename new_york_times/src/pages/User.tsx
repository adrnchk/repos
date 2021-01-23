import React from "react";
import { useSelector } from "react-redux";
import firebase from "../fire";
import { Redirect } from "react-router-dom";

import userPhoto from "../resourses/img/user.svg";
import { render } from "@testing-library/react";

interface IUser {
  userInfo: {
    name: string;
    avatar: string;
    email: string;
  };
}
function User() {
  let user = firebase.auth().currentUser;
  let storageRef = firebase
    .storage()
    .ref("Users/" + user?.email + "/avatar.jpg");
  let file: any = null;
  let name: string = "";
  let url: string = "";
  const _handleImageChange = (e: any) => {
    e.preventDefault();

    let reader = new FileReader();
    file = e.target.files[0];
  };
  const _handleNameChange = (e: any) => {
    e.preventDefault();
    name = e.target.value;
  };
  const updateUser = () => {
    if (file) {
      storageRef.put(file).then((snap) => {
        snap.ref.getDownloadURL().then((obj) => {
          url = obj;
        });
      });
    }

    if (user)
      user
        .updateProfile({
          displayName: name ? name : user.displayName,
          photoURL: url ? url : user.photoURL,
        })
        .then(function () {
          // Update successful.
          console.log(user);
        })
        .catch(function (error) {
          // An error happened.
        });
  };
  const stor = useSelector(({ userInfo }: IUser) => {
    return {
      userInfo: userInfo,
    };
  });
  return (
    <div>
      {user ? (
        <div className="profile">
          <img
            width="100"
            src={stor.userInfo.avatar ? stor.userInfo.avatar : userPhoto}
          ></img>
          <label>Email: {stor.userInfo.email}</label>

          <label>Name: {stor.userInfo.name}</label>
          <input onChange={(e) => _handleNameChange(e)} type="text"></input>
          <input
            onChange={(e) => _handleImageChange(e)}
            type="file"
            accept=".png, .jpg, .jpeg"
          ></input>
          <button onClick={updateUser} className="gradient-button">
            Save changes
          </button>
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </div>
  );
}

export default User;

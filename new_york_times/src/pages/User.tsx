import React from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../fire";
import { Redirect } from "react-router-dom";
import userPhoto from "../resourses/img/user.svg";
import editIcon from "../resourses/img/edit.png";
import crossIcon from "../resourses/img/cross.png";
import {
  changeName,
  changeEmail,
  changeAvatar,
} from "../redux/actions/userInf";

interface IUser {
  userInfo: {
    name: string;
    avatar: string;
    email: string;
  };
}
function User() {
  const [edit, setedit] = React.useState(false);
  let user = firebase.auth().currentUser;
  const dispatch = useDispatch();
  let storageRef = firebase
    .storage()
    .ref("Users/" + user?.email + "/avatar.jpg");
  let file: any = null;
  let name: string = "";
  let url: string = "";
  const stor = useSelector(({ userInfo }: IUser) => {
    return {
      userInfo: userInfo,
    };
  });
  const _handleImageChange = (e: any) => {
    e.preventDefault();
    file = e.target.files[0];
  };
  const _handleNameChange = (e: any) => {
    e.preventDefault();
    name = e.target.value;
  };

  const updateUser = async () => {
    try {
      let snap;
      if (file) {
        snap = await storageRef.put(file);

        if (snap) {
          const obj = await snap.ref.getDownloadURL();

          url = obj;
        }
      }

      if (user)
        user
          .updateProfile({
            displayName: name ? name : user.displayName,
            photoURL: url ? url : user.photoURL,
          })
          .then(function () {
            dispatch(changeEmail(firebase.auth().currentUser?.email));
            dispatch(changeName(firebase.auth().currentUser?.displayName));
            dispatch(changeAvatar(firebase.auth().currentUser?.photoURL));
            console.log(user?.photoURL);
          })
          .catch(function (error) {
            // An error happened.
          });
      setedit(!edit);
    } catch (e) {}
  };

  return (
    <div>
      {user ? (
        <div className="profile">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="block">
                <img
                  className="editIcon"
                  width="30px"
                  src={edit ? crossIcon : editIcon}
                  alt="icon"
                  onClick={() => setedit(!edit)}
                />
                {edit ? (
                  <>
                    <div className="avatar-upload">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="imageUpload"
                          onChange={(e) => _handleImageChange(e)}
                          accept=".png, .jpg, .jpeg"
                        />
                        <label htmlFor="imageUpload"></label>
                      </div>
                      <div className="avatar-preview">
                        <div id="imagePreview">
                          <img
                            alt="img"
                            width="100"
                            src={
                              stor.userInfo.avatar
                                ? stor.userInfo.avatar
                                : userPhoto
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    alt="img"
                    width="100"
                    src={
                      stor.userInfo.avatar ? stor.userInfo.avatar : userPhoto
                    }
                  />
                )}

                <br />
                <label className="nameLabel">
                  {stor.userInfo.name ? stor.userInfo.name : "Your name"}
                  {`   `}
                </label>
                {/* <label>Email: {stor.userInfo.email}</label> */}
                <br />
                <br />
                <br />
                {edit && (
                  <div>
                    <input
                      className="name"
                      placeholder="Enter new name"
                      onChange={(e) => _handleNameChange(e)}
                      type="text"
                    ></input>

                    <button onClick={updateUser} className="gradient-button">
                      Save changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </div>
  );
}

export default User;

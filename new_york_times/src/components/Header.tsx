import React from "react";
import logo from "../resourses/img/new-york-times.svg";
import userPhoto from "../resourses/img/user.svg";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import { useSelector } from "react-redux";

interface IHeaderProps {
  user: firebase.User | null;
  logout: () => void;
}
interface IUser {
  userInfo: {
    name: string;
    avatar: string;
    email: string;
  };
}

function Header(props: IHeaderProps) {
  const [visible, setvisible] = React.useState(false);
  const user = firebase.auth().currentUser;
  const visibleChange = () => {
    setvisible(!visible);
  };
  const logOut = () => {
    props.logout();
    setvisible(!visible);
  };
  const toProfile = () => {
    setvisible(!visible);
  };
  const stor = useSelector(({ userInfo }: IUser) => {
    return {
      userInfo: userInfo,
    };
  });

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="280" src={logo} alt="logo" />
          </div>
        </Link>

        <div className="sort">
          {user ? (
            <div>
              <span>{stor.userInfo.email}</span>
              <img
                onClick={visibleChange}
                width="40"
                src={stor.userInfo.avatar ? stor.userInfo.avatar : userPhoto}
                alt={userPhoto}
              ></img>
              {visible && (
                <div className="sort__popup">
                  <ul onClick={visibleChange}>
                    <Link to="/profile">
                      <li>Profile</li>
                    </Link>
                    <li onClick={logOut}>Log out</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="button button--outline button--signup">
              <span>Log in</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

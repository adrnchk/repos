import React from "react";
import "./scss/app.scss";

import axios from "axios";
import fire from "./fire";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { Login, Home, Page, User } from "./pages";
import { useDispatch } from "react-redux";
import { changeName, changeEmail, changeAvatar } from "./redux/actions/userInf";
import { setArticles } from "./redux/actions/articles";
import firebase from "./fire";

function App() {
  const [user, setUser] = React.useState(Object);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [hasAccount, sethasAccount] = React.useState(false);

  const dispatch = useDispatch();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
    fire.firestore().collection("users").get();
  };
  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);

        dispatch(changeEmail(firebase.auth().currentUser?.email));
        dispatch(changeName(firebase.auth().currentUser?.displayName));
        dispatch(changeAvatar(firebase.auth().currentUser?.photoURL));
        console.log(firebase.auth().currentUser?.photoURL);
      } else setUser(null);
    });
  };

  React.useEffect(() => {
    authListener();

    axios
      .get(
        "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=irGthqswH66bnmG8G7Av0OkkAsQZNfmd"
      )
      .then(({ data }) => {
        dispatch(
          setArticles([
            data.results.map((element: any, index: number) => ({
              img: element.multimedia[0]?.url ? element.multimedia[0]?.url : "",
              title: element.title,
              url: element.url,
              published_date: element.published_date,
              updated: element.updated,
              abstract: element.abstract,
              id: index,
            })),
          ])
        );
        console.log(data.results);
      });
  }, []);
  return (
    <div className="App">
      <div className="wrapper">
        <Header logout={handleLogout} user={user}></Header>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/profile" component={User}></Route>
        {/* <Route exact path="/page" component = {Page}></Route> */}
        <Switch>
          <Route path="/page/:id" component={Page} />
        </Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              hasAccount={hasAccount}
              sethasAccount={sethasAccount}
              emailError={emailError}
              passwordError={passwordError}
              user={user}
            />
          )}
        ></Route>
      </div>
    </div>
  );
}

export default App;

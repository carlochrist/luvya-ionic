import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Login.css";
import { database, getCurrentUser, loginUser } from "../../../firebaseConfig";
import { toast } from "../../../toast";
import { Link, useHistory } from "react-router-dom";
import { setLoggedInState, setUserState } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

interface UserData {
  email: string;
  username: string;
  gender: string;
  lookingFor: string;
  hereFor: [];
  prevState: null;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null as any);
  const [pictures, setPictures] = useState([] as any);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const user = useSelector((state: any) => state.user);
  const loggedInState = useSelector((state: any) => state.loggedIn);

  async function login() {
    setBusy(true);
    const res: any = await loginUser(username, password);

    if (res) {
      // console.log(res);
      // console.log(res.user);

      getCurrentUser().then((userFirebase: any) => {
        // console.log(user);
        // console.log(userFirebase);

        if (user) {
          // hier abgleich
          database.collection("users").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              if (!loggedIn) {
                console.log("LOGIN TRIGGERED");

                const currentUser = doc.data();
                if (res.user.email === currentUser["email"]) {
                  currentUser.id = doc.id;

                  // setPictures
                  database
                    .collection("users")
                    .doc(doc.id)
                    .collection("pictures")
                    .onSnapshot((snapshot) => {
                      let pictures = snapshot.docs.map((doc) => doc.data());
                      currentUser.pictures = pictures;

                      console.log(currentUser);

                      dispatch(setUserState(currentUser));
                      // if (!Object.keys(user).length) {
                      if (history.location.pathname === "/login") {
                        history.replace("/main");
                      }
                      // }
                      // }
                    });
                }
              }
            });
          });
          toast("You are loggeed in!", 3000);
          // console.log(user);
        } else {
          history.replace("/main");
        }
      });
    }
    setBusy(false);
  }

  //   useEffect(() => {
  //     console.log(input);
  //   }, [input]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      {busy && (
        <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      )}
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Username"
          onIonChange={(e: any) => setUsername(e.target.value)}
        ></IonInput>
        <IonInput
          type="password"
          placeholder="Password"
          onIonChange={(e: any) => setPassword(e.target.value)}
        ></IonInput>
        <IonButton onClick={login} expand="full">
          Login
        </IonButton>

        <div className="ion-text-center">
          <p>
            New here? <Link to="/register">Register</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

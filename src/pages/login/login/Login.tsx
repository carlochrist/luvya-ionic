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
import { Plugins } from "@capacitor/core";
import firebase from "firebase";

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

    const { Geolocation } = Plugins;

    const setCurrentPosition = async (user: any) => {
      const coordinates = await Geolocation.getCurrentPosition();
      database
        .collection("users")
        .doc(user.id)
        .set(
          {
            location: new firebase.firestore.GeoPoint(
              coordinates.coords.latitude,
              coordinates.coords.longitude
            ),
          },
          { merge: true }
        );
    };

    if (res) {
      getCurrentUser().then((userFirebase: any) => {
        if (user) {
          if (!loggedIn) {
            console.log("LOGIN TRIGGERED");

            database.collection("users").onSnapshot((snapshot) => {
              snapshot.forEach((doc) => {
                if (!loggedIn) {
                  const currentUser = doc.data();
                  if (res.user.email === currentUser["email"]) {
                    console.log("LOCATION TRIGGERED");
                    currentUser.id = doc.id;
                    // add location
                    console.log("set location!");
                    setCurrentPosition(currentUser);
                  }
                }
              });
            });

            if (history.location.pathname === "/login") {
              history.replace("/main");
            }
          }

          // hier abgleich
          // database.collection("users").onSnapshot((snapshot) => {
          //   snapshot.forEach((doc) => {
          //     if (!loggedIn) {
          //       console.log("LOGIN TRIGGERED");

          //       const currentUser = doc.data();
          //       if (res.user.email === currentUser["email"]) {
          //         currentUser.id = doc.id;

          //         // setPictures
          //         database
          //           .collection("users")
          //           .doc(doc.id)
          //           .collection("pictures")
          //           .onSnapshot((snapshot) => {
          //             let pictures = snapshot.docs.map((doc) => doc.data());
          //             currentUser.pictures = pictures;

          //             console.log(currentUser);

          //             dispatch(setUserState(currentUser));
          //             // if (!Object.keys(user).length) {
          //             if (history.location.pathname === "/login") {
          //               history.replace("/main");
          //             }
          //             // }
          //             // }
          //           });
          //       }
          //     }
          //   });
          // });
          // toast("You are loggeed in!", 3000);
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

  // ion-item::part(native) {
  //   background-color: var(--ion-color-danger);
  // }

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      {busy && (
        <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      )}
      <IonContent className="ion-padding">
        <IonInput
          className="input__center"
          placeholder="Username"
          onIonChange={(e: any) => setUsername(e.target.value)}
        />
        <IonInput
          className="input__center"
          type="password"
          placeholder="Password"
          onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonButton onClick={login} expand="full" className="button">
          Login
        </IonButton>

        <div className="ion-text-center">
          <p>
            New here?{" "}
            <Link to="/register">
              <b>Register</b>
            </Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

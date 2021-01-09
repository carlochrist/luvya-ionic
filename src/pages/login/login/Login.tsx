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
import { database, loginUser } from "../../../firebaseConfig";
import { toast } from "../../../toast";
import { Link, useHistory } from "react-router-dom";
import { setUserState } from "../../../redux/actions";
import { useDispatch } from "react-redux";

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
  const [user, setUser] = useState(null as any);
  const [pictures, setPictures] = useState([] as any);

  async function login() {
    setBusy(true);
    const res: any = await loginUser(username, password);

    if (res) {
      // console.log(res);
      // console.log(res.user);

      // hier abgleich
      database.collection("users").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const currentUser = doc.data();
          if (res.user.email === currentUser["email"]) {
            currentUser.id = doc.id;

            // console.log(currentUser);

            // database
            //   .collection("users")
            //   .doc(doc.id)
            //   .collection("pictures")
            //   .onSnapshot((snapshot) => {
            //     setPictures(snapshot.docs.map((doc) => doc.data()));
            //   });

            // console.log(currentUser);
            // setUser(currentUser);

            dispatch(setUserState(currentUser));
            history.replace("/main");
          }
        });
      });
      toast("You are loggeed in!", 3000);
      // console.log(user);
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

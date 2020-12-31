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
import { loginUser } from "../../../firebaseConfig";
import { toast } from "../../../toast";
import { Link, useHistory } from "react-router-dom";
import { setUserState } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();

  async function login() {
    setBusy(true);
    const res: any = await loginUser(username, password);

    if (res) {
      dispatch(setUserState(res.user.email));
      history.replace("/main");
      toast("You are loggeed in!", 3000);
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

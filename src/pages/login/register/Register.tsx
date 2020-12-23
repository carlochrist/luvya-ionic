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
import "./Register.css";
import { Link } from "react-router-dom";
import { toast } from "../../../toast";
import { registerUser } from "../../../firebaseConfig";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);

  async function register() {
    setBusy(true);
    // validation
    if (password !== cPassword) {
      return toast("Passwords do not match");
    }

    if (username.trim() === "" || password.trim() === "") {
      return toast("Username and password are required");
    }

    const res = await registerUser(username, password);

    setBusy(false);
    if (res) {
      toast("You have registered successfully!");
    }
  }

  //   useEffect(() => {
  //     console.log(input);
  //   }, [input]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      {busy && (
        <IonLoading
          message="...registration in progress..."
          duration={0}
          isOpen={busy}
        />
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
        <IonInput
          type="password"
          placeholder="Confirm Password"
          onIonChange={(e: any) => setCPassword(e.target.value)}
        ></IonInput>
        <IonButton onClick={register} expand="full">
          Register
        </IonButton>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;

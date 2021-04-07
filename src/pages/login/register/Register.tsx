import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonLoading,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { toast } from "../../../toast";
import { registerUser } from "../../../firebaseConfig";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();

  async function register() {
    setBusy(true);
    // validation
    if (password !== cPassword) {
      return toast("Passwords do not match");
    }

    if (username.trim() === "" || password.trim() === "") {
      return toast("Username and password are required");
    }

    const res = await registerUser(username, password, gender, birthday);

    setBusy(false);
    if (res) {
      toast("You have registered successfully!");
    }

    history.replace("/login");
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
        <IonRadioGroup>
          <IonListHeader>
            <IonLabel>Gender</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Male</IonLabel>
            <IonRadio
              slot="start"
              value="male"
              onClick={(e: any) => setGender(e.target.value)}
            ></IonRadio>
          </IonItem>
          <IonItem>
            <IonLabel>Female</IonLabel>
            <IonRadio
              slot="start"
              value="female"
              onClick={(e: any) => setGender(e.target.value)}
            ></IonRadio>
          </IonItem>
        </IonRadioGroup>

        <IonInput
          type="date"
          placeholder="Birthday"
          onIonChange={(e: any) => setBirthday(e.target.value)}
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

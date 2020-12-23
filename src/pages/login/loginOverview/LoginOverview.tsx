import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./LoginOverview.css";
import { Link } from "react-router-dom";

const LoginOverview: React.FC = () => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Luvya!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton routerLink="/login" color="primary" expand="full">
          Login
        </IonButton>
        <IonButton routerLink="/register" color="secondary" expand="full">
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginOverview;

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
import "./MatchGame.css";
import { useSelector } from "react-redux";
import { logoutUser } from "../../firebaseConfig";
import { useHistory } from "react-router";

const MatchGame: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  const [busy, setBusy] = useState(false);

  return (
    <IonPage>
      lol
      <IonHeader>
        <IonToolbar>
          <IonTitle>MatchGame</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <IonContent className="ion-padding">
        <IonButton routerLink="/login" color="primary" expand="full">
          Login
        </IonButton>
        <IonButton routerLink="/register" color="secondary" expand="full">
          Register
        </IonButton>
      </IonContent> */}
      <IonContent className="ion-padding">
        matchgamelol
        <IonLoading message="Logging out..." duration={0} isOpen={busy} />
        <p>Hey {username}!</p>
      </IonContent>
    </IonPage>
  );
};

export default MatchGame;

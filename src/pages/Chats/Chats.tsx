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
import "./Chats.css";
import { useSelector } from "react-redux";
import { logoutUser } from "../../firebaseConfig";
import { useHistory } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";

const Chats: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await logoutUser();
    history.replace("/");
    setBusy(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        chats chats chats chats chats
        <IonButton routerLink="/main/matchgame"> back </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Chats;

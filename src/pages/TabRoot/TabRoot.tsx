import React, { useState } from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonApp,
  IonToolbar,
  IonTitle,
  IonTab,
  IonHeader,
  IonContent,
  IonPage,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import {
  card,
  chatbubble,
  ellipse,
  heart,
  personCircle,
  square,
  triangle,
} from "ionicons/icons";
// import MatchGame from "./pages/MatchGame/MatchGame";
import MatchGame from "../MatchGame/MatchGame";
import Profile from "../Profile/Profile";
import { IonReactRouter } from "@ionic/react-router";
import Chats from "../Chats/Chats";

const TabRoot: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/main" to="/main/matchgame" />
        <Route path="/main/profile" render={() => <Profile />} exact={true} />
        <Route
          path="/main/matchgame"
          component={MatchGame}
          exact={true}
          render={() => <Redirect to="/main/matchgame" />}
        />
        <Route path="/main/chats" component={Chats} exact={true} />
        {/* <Route
          path="/main"
          render={() => <Redirect to="/main/matchgame" />}
          exact={true}
        /> */}
      </IonRouterOutlet>
      <Profile />
      <IonTabBar slot="bottom">
        <IonTabButton tab="profile" href="/main/profile">
          <IonIcon icon={personCircle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="matchgame" href="/main/matchgame">
          <IonIcon icon={heart} />
          <IonLabel>MatchGame</IonLabel>
        </IonTabButton>
        <IonTabButton tab="chats" href="/main/chats">
          <IonIcon icon={chatbubble} />
          <IonLabel>Chats</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabRoot;

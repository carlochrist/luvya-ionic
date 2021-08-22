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
import { Redirect, Route, Switch } from "react-router";
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
import "./TabRoot.scss";
import ChatScreen from "../Chats/ChatScreen/ChatScreen";

const TabRoot: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Redirect exact path="/main" to="/main/matchgame" />
          <Route path="/main/profile" render={() => <Profile />} exact={true} />
          <Route
            path="/main/matchgame"
            component={MatchGame}
            exact={false}
            render={() => <Redirect to="/main/matchgame" />}
          />
          <Route path="/main/chats" component={Chats} exact={true} />
          {/* <Route path="/main/chats/:id" component={ChatScreen} exact={true} /> */}
          <Route path="/main/chat" component={ChatScreen} exact={true} />
          {/* <Route
          path="/main"
          render={() => <Redirect to="/main/matchgame" />}
          exact={true}
        /> */}
        </Switch>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton
          tab="profile"
          href="/main/profile"
          className="iontab__button"
        >
          <IonIcon icon={personCircle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="matchgame"
          href="/main/matchgame"
          className="iontab__button"
        >
          <IonIcon icon={heart} />
          <IonLabel>MatchGame</IonLabel>
        </IonTabButton>
        <IonTabButton tab="chats" href="/main/chats" className="iontab__button">
          <IonIcon icon={chatbubble} />
          <IonLabel>Chats</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabRoot;

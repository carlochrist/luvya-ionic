import React, { useEffect, useState } from "react";
import { Redirect, Route, Router } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  card,
  chatbubble,
  ellipse,
  heart,
  personCircle,
  square,
  triangle,
} from "ionicons/icons";
// import Tab1 from "./pages/Tab1";
// import Tab2 from "./pages/Tab2";
// import Tab3 from "./pages/Tab3";
// import Tab4 from "./pages/Tab4";

import Login from "./pages/login/login/Login";
import Register from "./pages/login/register/Register";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import MatchGame from "./pages/MatchGame/MatchGame";
import { getCurrentUser } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { setUserState } from "./redux/actions";
import MainTabs from "./pages/TabRoot/TabRoot";
import LoginOverview from "./pages/login/loginOverview/LoginOverview";
import Profile from "./pages/Profile/Profile";
import TabRoot from "./pages/TabRoot/TabRoot";
import Chats from "./pages/Chats/Chats";

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/main" render={() => <TabRoot />} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/" component={LoginOverview} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [busy, setBusy] = useState<Boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      getCurrentUser().then((user: any) => {
        console.log(user);
        if (user) {
          // logged in
          setUserLoggedIn(true);
          // dispatch(setUserState(user.email));
          console.log(userLoggedIn);
          window.history.replaceState({}, "", "/main");
        } else {
          setUserLoggedIn(false);
          console.log(userLoggedIn);

          window.history.replaceState({}, "", "/");
        }
        setBusy(false);
      })
    ) {
      // regular login
    }
  }, []);

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />} </IonApp>;
};

export default App;

import React, { useEffect, useState } from "react";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./LoginOverview.css";
import { Redirect, Route } from "react-router";
import Register from "../register/Register";
import Login from "../login/Login";
import { IonReactRouter } from "@ionic/react-router";

const LoginOverview: React.FC = () => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    console.log(input);
  }, [input]);

  const routeTo = () => {
    console.log("test123");
    window.history.replaceState({}, "", "/register");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>Luvya</IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton color="primary" expand="full" routerLink="/login">
          Login
        </IonButton>
        <IonButton color="secondary" expand="full" routerLink="/register">
          Register
        </IonButton>
      </IonContent>
    </IonPage>
    // <IonApp>
    //   <IonReactRouter>
    //     <IonRouterOutlet>

    //       <Route path="/login" component={Login} />
    //       <Route path="/register" component={Register} />
    //       {/* <Route path="/" render={() => <Redirect to="/start" />} /> */}
    //       {/* <Redirect from="/" to="/start" /> */}
    //       <Route exact path="/" render={() => <Redirect to="/login" />} />
    //     </IonRouterOutlet>
    //     <IonContent className="ion-padding">
    //       <IonButton color="primary" expand="full" href="/login">
    //         Login
    //       </IonButton>
    //       <IonButton color="secondary" expand="full" href="/register">
    //         Register
    //       </IonButton>
    //     </IonContent>
    //   </IonReactRouter>
    // </IonApp>
  );
};

export default LoginOverview;

// <IonApp>
//   <IonReactRouter>
//     <IonRouterOutlet>

//       <Route path="/login" component={Login} />
//       <Route path="/register" component={Register} />
//       {/* <Route path="/" render={() => <Redirect to="/start" />} /> */}
//       {/* <Redirect from="/" to="/start" /> */}
//       <Route exact path="/" render={() => <Redirect to="/login" />} />
//     </IonRouterOutlet>
//     <IonContent className="ion-padding">
//       <IonButton color="primary" expand="full" href="/login">
//         Login
//       </IonButton>
//       <IonButton color="secondary" expand="full" href="/register">
//         Register
//       </IonButton>
//     </IonContent>
//   </IonReactRouter>
// </IonApp>

{
  /* <IonReactRouter>
<IonHeader>
  <IonToolbar>
    <IonTitle>Login</IonTitle>
  </IonToolbar>
</IonHeader>
<IonRouterOutlet>
  <Route path="/login/login" component={Login} exact={true} />
  <Route path="/login/register" component={Register} exact={true} />
</IonRouterOutlet>

<IonContent className="ion-padding">
  <IonButton href="/login/login" color="primary" expand="full">
    Login
  </IonButton>
  <IonButton href="/login/register" color="secondary" expand="full">
    Register
  </IonButton>
</IonContent>
</IonReactRouter> */
}

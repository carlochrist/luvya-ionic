import React from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

const arr = [
  {
    name: "Finn",
    desc: "xd",
  },
  {
    name: "Han",
    desc: "lol",
  },
  {
    name: "Rey",
    desc: "yoo",
  },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Information" /> */}
        <IonList>
          {arr.map((element) => (
            <IonItemSliding key={element.name}>
              <IonItem>
                <IonAvatar>
                  <img
                    src={`https://ionicframework.com/docs/demos/api/list/avatar-${element.name.toLowerCase()}.png`}
                  ></img>
                </IonAvatar>

                <IonLabel className="ion-padding">
                  <h2>{element.name}</h2>
                  <h3>{element.desc}</h3>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="start">
                <IonItemOption>Info</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

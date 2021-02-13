import React, { CSSProperties } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonImg,
  IonButton,
} from "@ionic/react";
import { useSelector } from "react-redux";

type MatchModalProps = {
  // closeAction: Function;
  text: string;
};

const myStyles: CSSProperties = {
  textAlign: "center",
};

const MatchModal: React.FC = () => {
  const userMatched = useSelector((state: any) => state.userMatched);

  const log = () => {
    console.log(userMatched);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Match!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p style={myStyles}>You matched with {userMatched?.username}</p>

        <IonImg src={userMatched?.pictures[0].imageUrl} />

        {/* <IonButton onClick={log}>log xd</IonButton> */}
      </IonContent>
    </>
  );
};

// class MatchModal extends React.Component<MatchModalProps> {

//     const userMatched = useSelector((state: any) => state.userMatched);

//   render() {
//     return (
//       <>
//         <IonHeader>
//           <IonToolbar color="primary">
//             <IonTitle>My Modal</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent className="ion-padding">
//           <p>Match</p>
//         </IonContent>
//       </>
//     );
//   }
// }

export default MatchModal;
// export default ({closeAction, text}: { closeAction: Function, text: string }) => (
//     <MatchModal closeAction={closeAction} text={text}>
//     </MatchModal>
//   )

// export default ({ text }: { text: string }) => (
//   <MatchModal text={text}></MatchModal>
// );

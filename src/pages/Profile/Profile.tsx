import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  storage,
  getCurrentUser,
  logoutUser,
  database,
} from "../../firebaseConfig";
import { useHistory } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import ImageUpload from "./ImageUpload/ImageUpload";
import MatchGame from "../MatchGame/MatchGame";
import firebaseConfig from "../../firebaseConfig";
import { CameraResultType } from "@capacitor/core";
import { useCamera, availableFeatures } from "@ionic/react-hooks/camera";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { setUserState } from "../../redux/actions";

const Profile: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  // const [user, setUser] = useState(getCurrentUser());
  const [checked, setChecked] = useState(false);
  const [picture, setPicture] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);
  const loggedInState = useSelector((state: any) => state.loggedIn);

  // const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //   setDidMount(true);
  //   return () => setDidMount(false);
  // }, []);

  // if (!didMount) {
  //   return null;
  // }

  async function logout() {
    setBusy(true);
    setUserState(null);
    await logoutUser();
    history.replace("/");
    setBusy(false);
  }

  //     { dataResponse, isLoading, isError, progress },

  const [
    { dataResponse, isLoading, isError, progress },
    setFileData,
    clearError,
  ] = firebaseConfig();

  const { photo, getPhoto } = useCamera();

  // promptLabelHeader?: string;
  // promptLabelCancel?: string;
  // promptLabelPhoto?: string;
  // promptLabelPicture?: string;

  const handleTakePhoto = () => {
    console.log(availableFeatures);
    if (availableFeatures.getPhoto) {
      getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      console.log(photo);
    }

    // database
    //   .collection("users")
    //   .doc(doc.id)
    //   .collection("pictures")
    //   .onSnapshot((snapshot) => {
    //     setPictures(snapshot.docs.map((doc) => doc.data()));
    //   });

    //   database.collection("users")
    //   .doc(user.id)
    //   .collection("pictures")
    //   .set(
    //     {

    //       gender: user.gender,
    //       lookingFor: user.lookingFor,
    //       hereFor: user.hereFor,
    //     },
    //     { merge: true }
    //   );
  };

  const log = () => {
    console.log(photo);
    console.log(user);
    console.log(loggedInState);
  };

  const upload = () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child("test");
    // fileRef.put(photo: any)
  };

  // when the photo state changes, then call setFileData to upload
  // the image using firebase-hook
  useEffect(() => {
    setFileData(photo);
  }, [photo, setFileData]);

  // useEffect(() => {
  //   getCurrentUser().then((user: any) => {
  //     // setUser(user);
  //   });
  // }, []);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      console.log(user);
      history.replace("/main/matchgame");
    }
  }, []);

  // useEffect(() => {
  //   if (user === undefined) {
  //     return;
  //   } else {
  //     // set picture
  //     // console.log(user);
  //     // console.log(user.pictures[0]);
  //     // history.replace("/main/profile");
  //     // setFileData(user.pictures[0]);
  //     // do stuff
  //     // database.collection("users").doc(user.id).set(
  //     //   {
  //     //     gender: user.gender,
  //     //     lookingFor: user.lookingFor,
  //     //     hereFor: user.hereFor,
  //     //   },
  //     //   { merge: true }
  //     // );
  //   }
  // }, [user]);

  const checkIfChecked = (hereFor: string) => {
    let checked = false;
    if (user !== null) {
      // console.log("CHECK x3");
      // console.log(user);
      checked = user.hereFor.indexOf(hereFor) !== -1 ? true : false;
    }
    return checked;
  };

  const checkPropertyValue = (property: string, value: string) => {
    return user[property] === value ? true : false;
  };

  const updateUserData = async (event: any) => {
    // // object-destructuring
    const { name, value, checked } = event.target;

    // console.log(event);
    // console.log(event.target);
    // console.log(event.detail);
    // console.log(name);
    // console.log(value);

    // check if ion-input
    if (name.startsWith("ion-input")) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 3 sec
      user.username = value;
    }

    // check if radio (looking for)
    if (name.startsWith("ion-rb")) {
      user.lookingFor = value;
    }

    // check if checkbox (hereFor)
    if (name.startsWith("ion-cb")) {
      if (user.hereFor.indexOf(value) !== -1) {
        user.hereFor.splice(user.hereFor.indexOf(value), 1);
      } else {
        user.hereFor.push(value);
      }
    }

    // dispatch(setUserState(user));

    // if (!user.hasOwnProperty("likes")) {
    //   user.likes = any[] = [];
    // }

    // if (!user.hasOwnProperty("dislikes")) {
    //   user.dislikes = any[] = [];
    // }

    // await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec

    // database.collection("users").doc(user.id).set(
    //   {
    //     gender: user.gender,
    //     lookingFor: user.lookingFor,
    //     hereFor: user.hereFor,
    //     username: user.username,
    //     // likes: user.likes,
    //     // dislikes: user.dislikes,
    //   },
    //   { merge: true }
    // );
  };

  const saveData = () => {
    database.collection("users").doc(user.id).set(
      {
        gender: user.gender,
        lookingFor: user.lookingFor,
        hereFor: user.hereFor,
        username: user.username,
        // likes: user.likes,
        // dislikes: user.dislikes,
      },
      { merge: true }
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      {Object.keys(user).length !== 0 ? (
        <IonContent className="ion-padding">
          {/* {photo ? (
          <div>
            <pre>{JSON.stringify(photo, null, 2)}</pre>
            <IonCard>
              <img src={photo.dataUrl || photo.webPath} />
            </IonCard>
          </div>
        ) : null} */}

          {user.pictures[0] ? (
            <div>
              <IonCard>
                <img src={user.pictures[0].imageUrl} />
              </IonCard>
            </div>
          ) : null}

          <div>
            {/* <IonInput type= onClick={handleTakePhoto}>Take/Select Photo</IonButton> */}
            <IonButton onClick={handleTakePhoto}>Take/Select Photo</IonButton>
          </div>
          {/* <!-- the toast for errors --> */}
          <IonToast
            isOpen={isError ? true : false}
            onDidDismiss={() => clearError(false)}
            message={isError && isError.message}
            color="danger"
            position="bottom"
            buttons={[
              {
                text: "Done",
                role: "cancel",
                handler: () => {
                  console.log("Cancel clicked");
                },
              },
            ]}
          />

          <form>
            <IonItem lines="full">
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                type="text"
                required
                value={user.username}
                onIonChange={updateUserData}
              ></IonInput>{" "}
            </IonItem>

            <IonRadioGroup value={user.lookingFor}>
              <IonListHeader>
                <IonLabel>Looking for</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonLabel>Male</IonLabel>
                <IonRadio
                  slot="start"
                  value="male"
                  onClick={updateUserData}
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel>Female</IonLabel>
                <IonRadio
                  slot="start"
                  value="female"
                  onClick={updateUserData}
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel>Both</IonLabel>
                <IonRadio
                  slot="start"
                  value="both"
                  onClick={updateUserData}
                ></IonRadio>
              </IonItem>
            </IonRadioGroup>

            {/* 
          <IonItem key={track}>
              { ios &&
                <IonIcon slot="start" icon={iconMap[track]} color="medium" />
              }
              <IonLabel>{track}</IonLabel>
              <IonCheckbox
                onClick={() => toggleTrackFilter(track)}
                checked={filteredTracks.indexOf(track) !== -1}
                color="primary"
                value={track}
              ></IonCheckbox>
            </IonItem> */}

            <IonList lines="full">
              <IonListHeader>
                <IonLabel>HereFor</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonCheckbox
                  checked={checkIfChecked("chats")}
                  value="chats"
                  onClick={updateUserData}
                />
                <IonLabel>Chats</IonLabel>
              </IonItem>
              <IonItem>
                <IonCheckbox
                  checked={checkIfChecked("acquaintances")}
                  value="acquaintances"
                  onClick={updateUserData}
                />
                <IonLabel>bla</IonLabel>
              </IonItem>
              <IonItem>
                <IonCheckbox
                  checked={checkIfChecked("dates")}
                  value="dates"
                  onClick={updateUserData}
                />
                <IonLabel>blabla</IonLabel>
              </IonItem>
            </IonList>
          </form>

          {/* <IonButton onClick={log}>log</IonButton> */}
          {/* <IonButton onClick={saveData}>Save</IonButton> */}
          <IonButton onClick={logout}>logout</IonButton>
        </IonContent>
      ) : null}
    </IonPage>
  );
};

export default Profile;

// {/* get loading information from hook and display progress if necessary */}
// {isLoading && progress && (
//   <IonProgressBar value={progress.value}></IonProgressBar>
// )}

// {availableFeatures.getPhoto ? null : (
//   <input
//     type="file"
//     onChange={(e: any) => {
//       setFileData(e.target.files[0]);
//     }}
//   />
// )}
// <pre style={{ fontSize: "smaller" }}>
//   {JSON.stringify(dataResponse, null, 2)}
// </pre>
// {dataResponse && (
//   <img
//     src={dataResponse.downloadUrl}
//     alt={dataResponse.metaData.name}
//   />
// )}

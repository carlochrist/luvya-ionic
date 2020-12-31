import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { storage, getCurrentUser, logoutUser } from "../../firebaseConfig";
import { useHistory } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import ImageUpload from "./ImageUpload/ImageUpload";
import MatchGame from "../MatchGame/MatchGame";
import firebaseConfig from "../../firebaseConfig";
import { CameraResultType } from "@capacitor/core";
import { useCamera, availableFeatures } from "@ionic/react-hooks/camera";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

const Profile: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  async function logout() {
    setBusy(true);
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
    }
  };

  const log = () => {
    console.log(photo);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p> PROFILE!</p>

        {photo ? (
          <div>
            <pre>{JSON.stringify(photo, null, 2)}</pre>
            <IonCard>
              <img src={photo.dataUrl || photo.webPath} />
            </IonCard>
          </div>
        ) : null}

        <div>
          {/* <IonInput type= onClick={handleTakePhoto}>Take/Select Photo</IonButton> */}
          <IonButton onClick={handleTakePhoto}>Take/Select Photo</IonButton>
          <IonButton onClick={log}>Upload</IonButton>
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

        <IonButton onClick={logout}>logout</IonButton>
      </IonContent>
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

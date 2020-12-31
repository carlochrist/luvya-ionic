import React, { useEffect, useState } from "react";
import {
  IonButton,
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
import "./ImageUpload.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import firebase from "firebase";
import {
  firebaseApp,
  storage,
  database,
  getCurrentUser,
} from "../../../firebaseConfig";
import firebaseConfig from "../../../firebaseConfig";
import { CameraResultType } from "@capacitor/core";
import { useCamera, availableFeatures } from "@ionic/react-hooks/camera";

const ImageUpload: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  const [busy, setBusy] = useState(false);

  const [user, setUser] = useState(getCurrentUser());

  //     { dataResponse, isLoading, isError, progress },

  const [
    { dataResponse, isLoading, isError, progress },
    setFileData,
    clearError,
  ] = firebaseConfig();

  // getCurrentUser().then((user: any) => {
  //   console.log(user);
  //   if (user) {
  //     // logged in
  //     setUserLoggedIn(true);
  //     // dispatch(setUserState(user.email));
  //     console.log(userLoggedIn);
  //     window.history.replaceState({}, "", "/main");
  //   } else {
  //     setUserLoggedIn(false);
  //     console.log(userLoggedIn);

  //     window.history.replaceState({}, "", "/");
  //   }
  //   setBusy(false);
  // })

  // const [image, setImage] = useState(null);
  // const [progress, setProgress] = useState(0);
  // const [caption, setCaption] = useState("");

  // const handleChange = (e: any) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  // const logData = () => {
  //   console.log("user: ", user);
  // };

  // const handleUpload = () => {
  //   console.log(user);
  //   console.log(image);

  //   let uploadTask = null;

  //   if (image) {
  //     uploadTask = storage.ref(`images/${image?.name}`).put(image);
  //   }

  //   if (uploadTask) {
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // progress function
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setProgress(progress);
  //       },
  //       (error) => {
  //         // Error function
  //         console.log(error);
  //         alert(error.message);
  //       },
  //       () => {
  //         // complete function
  //         storage
  //           .ref("images")
  //           .child(image.name)
  //           .getDownloadURL()
  //           .then((url) => {
  //             // post image inside db
  //             database
  //               .collection("users")
  //               .doc(user.user.id)
  //               .collection("pictures")
  //               .add({
  //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //                 imageUrl: url,
  //                 // caption: caption,
  //                 // username: user.user.username,
  //               });
  //             setProgress(0);
  //             setCaption("");
  //             setImage(null);
  //           });
  //       }
  //     );
  //   }
  // };

  // return (
  //   <div className="imageupload">
  //     <p>Add picture: </p>
  //     <input type="file" onChange={handleChange} />
  //     <IonButton onClick={handleUpload}>Upload</IonButton>
  //     <IonButton onClick={logData}>log</IonButton>
  //     <progress className="imageupload__progress" value={progress} max="100" />
  //   </div>
  // );

  const { photo, getPhoto } = useCamera();

  const handleTakePhoto = () => {
    if (availableFeatures.getPhoto) {
      getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
    }
  };

  // when the photo state changes, then call setFileData to upload
  // the image using firebase-hook
  useEffect(() => {
    setFileData(photo);
  }, [photo, setFileData]);

  return (
    <div>
      <IonContent className="ion-padding">
        {/* get loading information from hook and display progress if necessary */}
        {isLoading && progress && (
          <IonProgressBar value={progress.value}></IonProgressBar>
        )}

        {availableFeatures.getPhoto ? null : (
          <input
            type="file"
            onChange={(e: any) => {
              setFileData(e.target.files[0]);
            }}
          />
        )}
        <pre style={{ fontSize: "smaller" }}>
          {JSON.stringify(dataResponse, null, 2)}
        </pre>
        {dataResponse && (
          <img
            src={dataResponse.downloadUrl}
            alt={dataResponse.metaData.name}
          />
        )}

        <div>
          <IonButton onClick={handleTakePhoto}>Take Photo</IonButton>
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
      </IonContent>
    </div>
  );
};

export default ImageUpload;

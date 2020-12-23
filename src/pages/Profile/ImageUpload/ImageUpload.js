import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { firebaseApp, storage, database } from "./../../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

// destructuring -->  ImageUpload(props) --> ImageUpload({username})
export default function ImageUpload(user) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const logData = () => {
    console.log("user: ", user);
  };

  const handleUpload = () => {
    console.log(user);
    console.log(user.user.id);

    // const FieldValue = database.firestore.FieldValue;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            database
              .collection("users")
              .doc(user.user.id)
              .collection("pictures")
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                imageUrl: url,
                // caption: caption,
                // username: user.user.username,
              });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <p>Add picture: </p>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
      <progress className="imageupload__progress" value={progress} max="100" />
    </div>
  );
}

// <input
// type="text"
// placeholder="Enter a caption..."
// onChange={(event) => setCaption(event.target.value)}
// value={caption}
// />

// <Button onClick={logData}>log</Button>

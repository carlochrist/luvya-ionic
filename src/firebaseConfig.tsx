import { rejects } from "assert";
import * as firebase from "firebase";
import { useEffect, useState } from "react";
import { toast } from "./toast";

const firebaseApp = {
  apiKey: "AIzaSyDL9jQJPOo2mDZbb38K1HNyqsvLryLPjrs",
  authDomain: "luvya-app-new.firebaseapp.com",
  databaseURL: "https://luvya-app-new.firebaseio.com",
  projectId: "luvya-app-new",
  storageBucket: "luvya-app-new.appspot.com",
  messagingSenderId: "981263410376",
  appId: "1:981263410376:web:9b3664a22b0fa4d0e571fd",
};

firebase.default.initializeApp(firebaseApp);

const database = firebase.default.firestore();
const auth = firebase.default.auth();
const storage = firebase.default.storage();

export { firebaseApp, database, auth, storage };

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
        unsubscribe();
      } else {
        resolve(null);
      }
    });
  });
}

export async function loginUser(username: string, password: string) {
  const email = `${username}@luvya.com`;

  try {
    const res = await firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password);
    // console.log(res);
    return res;
  } catch (error) {
    toast(error.message, 4000);
    return false;
  }
}

export async function registerUser(
  username: string,
  password: string,
  gender: string
) {
  const email = `${username}@luvya.com`;

  try {
    const res = await firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        database.collection("users").add({
          email: email,
          username: "",
          gender: gender,
          lookingFor: "",
          hereFor: [],
        });
      });
    console.log(res);
    return true;
  } catch (error) {
    toast(error.message, 4000);
    return false;
  }
}

export function logoutUser() {
  return firebase.default.auth().signOut();
}

// defining types...
type UploadDataResponse =
  | { metaData: firebase.default.storage.FullMetadata; downloadUrl: any }
  | undefined;
type ProgressResponse = { value: number } | undefined | null;
type DataAsDataUrl = { dataUrl: string; format: string };
type UploadSource = File | DataAsDataUrl | undefined;

// the firebase reference to storage
const storageRef = storage.ref();

function FirebaseFileUploadApi(): [
  {
    dataResponse: UploadDataResponse;
    isLoading: boolean;
    isError: any;
    progress: ProgressResponse;
  },
  Function,
  Function
] {
  // the data from the file upload response
  const [dataResponse, setDataResponse] = useState<UploadDataResponse>();

  // sets properties on the file to be uploaded
  const [fileData, setFileData] = useState<UploadSource>();

  // if we are loading a file or not
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // if an error happened during the process
  const [isError, setIsError] = useState<any>(false);

  // used for tracking the % of upload completed
  const [progress, setProgress] = useState<ProgressResponse>(null);

  const clearError = () => {
    setIsError(null);
  };

  // this function will be called when the any properties in the dependency array changes
  useEffect(() => {
    /**
     *
     * @param _value
     */
    const setUp = (
      _value: UploadSource
    ): firebase.default.storage.UploadTask => {
      if (_value instanceof File) {
        let fName = `${new Date().getTime()}-${_value.name}`;
        // setting the firebase properties for the file upload
        let ref = storageRef.child("images/" + fName);
        return ref.put(_value);
      } else {
        let v = _value as DataAsDataUrl;
        let fName = `${new Date().getTime()}.${v.format}`;
        // setting the firebase properties for the file upload
        let ref = storageRef.child("images/" + fName);
        return ref.putString(v.dataUrl, "data_url");
      }
    };

    const uploadData = async () => {
      // initialize upload information
      setIsError(false);
      setIsLoading(true);

      setProgress({ value: 0 });

      // handle a file upload or a dataUrl upload

      let uploadTask = setUp(fileData);
      console.log(uploadTask);
      // wrap the whole thing in a try catch block to update the error state
      try {
        // tracking the state of the upload to assist in updating the
        // application UI
        uploadTask.on(
          firebase.default.storage.TaskEvent.STATE_CHANGED,
          (_progress) => {
            var value = _progress.bytesTransferred / _progress.totalBytes;
            console.log("Upload is " + value * 100 + "% done");
            setProgress({ value });
          },
          (_error) => {
            setIsLoading(false);
            setIsError(_error);
          },
          async () => {
            setIsError(false);
            setIsLoading(false);

            // need to get the url to download the file
            let downloadUrl = await uploadTask.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                getCurrentUser().then((user: any) => {
                  if (user) {
                    database.collection("users").onSnapshot((snapshot) => {
                      snapshot.forEach((doc) => {
                        const currentUser = doc.data();
                        if (user.email === currentUser["email"]) {
                          // post image inside db
                          database
                            .collection("users")
                            .doc(doc.id)
                            .collection("pictures")
                            .add({
                              timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
                              imageUrl: url,
                              // caption: caption
                            });
                        }
                      });
                    });
                  } else {
                  }
                });
              });
            // set the data when upload has completed
            setDataResponse({
              metaData: uploadTask.snapshot.metadata,
              downloadUrl,
            });
            // reset progress
            setProgress(null);
          }
        );
        console.log("TRY");
      } catch (_error) {
        setIsLoading(false);
        setIsError(_error);
        console.log("CATCH");
      }
    };
    fileData && uploadData();
  }, [fileData]);

  return [
    { dataResponse, isLoading, isError, progress },
    setFileData,
    clearError,
  ];
}

export default FirebaseFileUploadApi;

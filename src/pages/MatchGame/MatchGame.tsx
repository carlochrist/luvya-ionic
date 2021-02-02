import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./MatchGame.css";
import { useSelector } from "react-redux";
import { database, logoutUser } from "../../firebaseConfig";
import { useHistory } from "react-router";
import TinderCard from "react-tinder-card";
import SwipeButtons from "./Swipe/SwipeButtons";
import {
  closeOutline,
  flashOutline,
  heartOutline,
  reloadCircleOutline,
  star,
} from "ionicons/icons";

const MatchGame: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [users, setUsers] = useState([] as any[]);

  const log = () => {
    console.log(user);
    console.log(users);
  };

  //   const transformUndefinedToEmptyArray = (obj, keyToTransform) => {
  // obj[keyToTransform] = [];
  //   };

  useEffect(() => {
    // console.log("reload USERS!!!");
    // console.log(user);
    // console.log(users);

    // setUsers(null);

    const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data());

        const currentUser = {
          id: doc.id,
          email: doc.data().email,
          gender: doc.data().gender,
          pictures: [] as any[],
          likes: doc.data().likes,
          dislikes: doc.data().dislikes,
          ...doc.data(),
        };

        // transformUndefinedToEmptyArray(currentUser, 'likes')

        if (user.likes === undefined) {
          user.likes = [];
        }

        if (user.dislikes === undefined) {
          user.dislikes = [];
        }

        if (currentUser.likes === undefined) {
          currentUser.likes = [];
        }

        if (currentUser.dislikes === undefined) {
          currentUser.dislikes = [];
        }

        if (user.email !== currentUser.email) {
          // console.log("user:", user);
          // console.log("currentUser:", currentUser);

          if (
            user.lookingFor === currentUser.gender ||
            user.lookingFor === "both"
          ) {
            if (!user.likes.includes(currentUser.email)) {
              if (!user.dislikes.includes(currentUser.email)) {
                {
                  database
                    .collection("users")
                    .doc(currentUser.id)
                    .collection("pictures")
                    .get()
                    .then((response) => {
                      const fetchedPictures: any[] = [];
                      response.forEach((document) => {
                        const fetchedPicture = {
                          id: document.id,
                          ...document.data(),
                        };
                        fetchedPictures.push(fetchedPicture);
                      });

                      currentUser.pictures = fetchedPictures;
                      // currentUser['pictures'] = fetchedPictures;

                      if (currentUser.pictures.length > 0) {
                        setUsers((oldUsers) => {
                          if (
                            oldUsers.find(
                              (user) => user.email === currentUser.email
                            )
                          )
                            return oldUsers;
                          return [...oldUsers, currentUser];
                        });
                      }
                    })
                    .catch((error) => {
                      // setError(error);
                      console.log(error);
                    });
                }
              }
            }
          }
          // remove user (gender)
          else {
            setUsers((users) =>
              users.filter((user) => user.id === currentUser.id)
            );
          }
        }
      });
    });

    return () => {
      // this is the cleanup...
      unsubscribe();
    };

    // this will run ONCE when the component loads and never again
  }, [user]);

  const onSwipe = (direction: any, swipedUser: any) => {
    console.log("You swiped: " + direction);

    // get latest user-version
    database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = {
          id: doc.id,
          email: doc.data().email,
          username: doc.data().username,
          gender: doc.data().gender,
          pictures: [] as any[],
          likes: doc.data().likes,
          dislikes: doc.data().dislikes,
          ...doc.data(),
        };

        if (!currentUser.hasOwnProperty("likes")) {
          currentUser.likes = [];
        }

        if (!currentUser.hasOwnProperty("dislikes")) {
          currentUser.dislikes = [];
        }

        if (
          currentUser.id === swipedUser.id &&
          !user.likes.includes(currentUser.email)
        ) {
          console.log("hier");

          if (direction === "left" || direction === "right") {
            if (direction === "left") {
              if (!user.dislikes.includes(currentUser.email)) {
                user.dislikes.push(currentUser.email);
                database.collection("users").doc(user.id).set(
                  {
                    dislikes: user.dislikes,
                  },
                  { merge: true }
                );
              }
            } else {
              user.likes.push(currentUser.email);
              database.collection("users").doc(user.id).set(
                {
                  likes: user.likes,
                },
                { merge: true }
              );

              // check for match
              console.log(currentUser);
              console.log(user);
              if (currentUser.hasOwnProperty("likes")) {
                if (currentUser.likes.includes(user.email)) {
                  //Matchedwith als Objekt —> + chatId

                  // add new chat and get id
                  database.collection("chats").add({
                    userEmail1: user.email,
                    userEmail2: currentUser.email,
                    userName1: user.username,
                    userName2: currentUser.username,
                    messages: [],
                  });

                  console.log("MATCH!");
                  //  console.log("User: ", user);
                  //  console.log("currentUser: ", currentUser);

                  // add pictures to currentUser
                  currentUser.pictures = user.pictures;
                  // setUserMatched(currentUser);
                  // setShowMatchModal(true);
                }
              }
            }
          }
        }
      });
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MatchGame</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton onClick={log}>log</IonButton>

        <div className="matchGame__outerCardContainer">
          {users.map((user, index) => (
            <div key={user.id} className="matchGame__innerCardContainer">
              {user.pictures && (
                <div className="swipe">
                  <TinderCard
                    key={user.username}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => onSwipe(dir, user)}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${user.pictures[0].imageUrl})`,
                        position: index === 0 ? "relative" : "relative",
                      }}
                      className="card"
                    >
                      <h3 style={{ color: "black" }}>{user.username}</h3>
                      <p>{index}</p>
                    </div>
                  </TinderCard>
                </div>
              )}
            </div>
          ))}
        </div>

        <IonLoading message="Logging out..." duration={0} isOpen={busy} />
      </IonContent>
      <div className="swipeButtons">
        <IonButton className="swipeButtons__repeat" color="warning">
          <IonIcon icon={reloadCircleOutline} />
        </IonButton>
        <IonButton className="swipeButtons__left" color="danger">
          <IonIcon icon={closeOutline} />
        </IonButton>
        <IonButton className="swipeButtons__star" color="primary">
          <IonIcon icon={star} />
        </IonButton>
        <IonButton className="swipeButtons__right" color="success">
          <IonIcon icon={heartOutline} />
        </IonButton>
        <IonButton className="swipeButtons__lightning" color="tertiary">
          <IonIcon icon={flashOutline} />
        </IonButton>
      </div>
    </IonPage>
  );
};

export default MatchGame;

import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./MatchGame.css";
import { useDispatch, useSelector } from "react-redux";
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
// import MatchModal from "./MatchModal";
import { setUserMatchedState, setUserState } from "../../redux/actions";
import MatchModal from "./MatchModal";
import moment from "moment";
import Chats from "../Chats/Chats";
import { Plugins } from "@capacitor/core";
import * as geolib from "geolib";

const MatchGame: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  const dispatch = useDispatch();

  const [busy, setBusy] = useState(false);
  const user = useSelector((state: any) => state.user);
  const userMatched = useSelector((state: any) => state.userMatched);
  const [users, setUsers] = useState([] as any[]);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const log = () => {
    console.log(user);
    console.log(users);
    console.log(getCurrentPosition());
  };

  //   const transformUndefinedToEmptyArray = (obj, keyToTransform) => {
  // obj[keyToTransform] = [];
  //   };

  const { Geolocation } = Plugins;

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log("Current", coordinates);

    let myCords = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };

    let distance = Math.round(
      geolib.getDistance(myCords, {
        latitude: 51.525,
        longitude: 7.4575,
      }) / 1000
    );

    console.log("You are ", distance, "km away from 51.525, 7.4575");
    return distance;
  };

  const watchPosition = () => {
    const wait = Geolocation.watchPosition({}, (position, err) => {});
  };

  const getDistance = (userCard: any) => {
    let distance = "";

    if (userCard.location !== undefined) {
      let myCords = {
        latitude: user.location.latitude,
        longitude: user.location.longitude,
      };

      let userCardCords = {
        latitude: userCard.location.latitude,
        longitude: userCard.location.longitude,
      };

      distance = Math.round(
        geolib.getDistance(myCords, userCardCords) / 1000
      ).toString();
    }

    // console.log(user);
    // console.log(user.location);
    // console.log(userCard.location);
    // console.log(myCords);
    // console.log(userCardCords);
    // console.log(distance);

    // let distance = Math.round(
    //   geolib.getDistance(user.location, userCard.location) / 1000
    // );

    return distance;
  };

  useEffect(() => {
    const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = {
          id: doc.id,
          email: doc.data().email,
          gender: doc.data().gender,
          pictures: [] as any[],
          chats: [] as any[],
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
          // remove user by gender
          else {
            setUsers((users) =>
              users.filter((user) => user.id !== currentUser.id)
            );
          }
        } else {
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

                  // setPictures
                  database
                    .collection("users")
                    .doc(doc.id)
                    .collection("pictures")
                    .onSnapshot((snapshot) => {
                      let pictures = snapshot.docs.map((doc) => doc.data());
                      currentUser.pictures = pictures;
                      console.log("currentUser: ", currentUser);
                      dispatch(setUserMatchedState(currentUser));
                    });

                  // add pictures to currentUser
                  // currentUser.pictures = user.pictures;
                  // setUserMatched(currentUser);
                  setShowMatchModal(true);
                }
              }
            }
          }
        }
      });
    });
  };

  async function closeModal() {
    await setShowMatchModal(false);
  }

  const jumpToChat = () => {
    setShowMatchModal(false);
    history.replace("/main/chats");
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
        {/* <IonButton onClick={() => setShowMatchModal(true)}>showModal</IonButton> */}

        <IonModal isOpen={showMatchModal} swipeToClose={true}>
          <MatchModal></MatchModal>
          <div>
            <IonButton onClick={() => setShowMatchModal(false)}>
              Continue swiping
            </IonButton>
            <IonButton onClick={() => jumpToChat()}>
              {/* Jump to chat with {userMatched?.username} */}
              Jump to chats
            </IonButton>
          </div>
          {/* <MyModal>

        </MyModal> */}
        </IonModal>

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
                      <h3
                        style={{
                          color: "white",
                          textShadow: "3px 3px 3px #000000",
                        }}
                      >
                        <b> {user.username}, </b>
                        {moment().diff(user.birthday, "years", false)}
                        <p> {getDistance(user)} km away</p>
                      </h3>

                      {/* <p>{index}</p> */}
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

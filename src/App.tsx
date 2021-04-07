import React, { useEffect, useState } from "react";
import { Redirect, Route, Router, useHistory } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  card,
  chatbubble,
  ellipse,
  heart,
  personCircle,
  square,
  triangle,
} from "ionicons/icons";
// import Tab1 from "./pages/Tab1";
// import Tab2 from "./pages/Tab2";
// import Tab3 from "./pages/Tab3";
// import Tab4 from "./pages/Tab4";

import Login from "./pages/login/login/Login";
import Register from "./pages/login/register/Register";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import MatchGame from "./pages/MatchGame/MatchGame";
import { database, getCurrentUser } from "./firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "./redux/actions";
import MainTabs from "./pages/TabRoot/TabRoot";
import LoginOverview from "./pages/login/loginOverview/LoginOverview";
import Profile from "./pages/Profile/Profile";
import TabRoot from "./pages/TabRoot/TabRoot";
import Chats from "./pages/Chats/Chats";

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/main" render={() => <TabRoot />} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/" component={LoginOverview} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [busy, setBusy] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.userSelected);

  useEffect(() => {
    console.log("RELOAD APP");
    console.log(getCurrentUser());
    // setUserState(null)
    if (
      getCurrentUser().then((user: any) => {
        // console.log(user);
        if (user) {
          // logged in
          setUserLoggedIn(true);

          console.log(user);

          // TODO: outsource
          database.collection("users").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const currentUser = doc.data();
              if (user.email === currentUser["email"]) {
                currentUser.id = doc.id;

                if (currentUser.chats === undefined) {
                  currentUser.chats = [];
                }

                // setPictures
                database
                  .collection("users")
                  .doc(doc.id)
                  .collection("pictures")
                  .onSnapshot((snapshot) => {
                    let pictures = snapshot.docs.map((doc) => doc.data());
                    currentUser.pictures = pictures;

                    // setChats
                    database.collection("chats").onSnapshot((snapshot) => {
                      snapshot.forEach((doc) => {
                        const chat = doc.data();
                        chat.id = doc.id;
                        if (
                          chat.userEmail1 === currentUser.email ||
                          chat.userEmail2 === currentUser.email
                        ) {
                          // add match-picture to chat
                          database
                            .collection("users")
                            .onSnapshot((snapshot) => {
                              snapshot.forEach((doc) => {
                                const currentUserChat = {
                                  id: doc.id,
                                  email: doc.data().email,
                                  pictures: [] as any[],
                                  username: doc.data().username,
                                  ...doc.data(),
                                };

                                let matchUserEmail =
                                  chat.userEmail1 === currentUser.email
                                    ? chat.userEmail2
                                    : chat.userEmail1;

                                let matchUserName =
                                  chat.userEmail1 === currentUser.email
                                    ? chat.userName2
                                    : chat.userName1;

                                chat.emailMatch = matchUserEmail;
                                chat.nameMatch = matchUserName;

                                if (
                                  currentUserChat.email !== currentUser.email
                                ) {
                                  // add latest messages to chat
                                  database
                                    .collection("chats")
                                    .doc(chat.id)
                                    .collection("messages")
                                    .orderBy("timestamp", "asc")
                                    .limitToLast(1)
                                    .get()
                                    .then((response) => {
                                      response.forEach((document) => {
                                        const fetchedMessage = {
                                          id: document.id,
                                          ...document.data(),
                                        };

                                        if (chat.messages.length === 0) {
                                          chat.messages.push(fetchedMessage);
                                        }

                                        database
                                          .collection("users")
                                          .doc(currentUserChat.id)
                                          .collection("pictures")
                                          // .orderBy("timestamp", "asc")
                                          // .limitToLast(1)
                                          .get()
                                          .then((response) => {
                                            response.forEach((document) => {
                                              const fetchedPicture = {
                                                id: document.id,
                                                ...document.data(),
                                              };

                                              if (
                                                currentUserChat.email ===
                                                matchUserEmail
                                              ) {
                                                chat.pictureMatch = fetchedPicture;

                                                if (
                                                  currentUser.chats
                                                    .map(
                                                      (chatObj: any) =>
                                                        chatObj.id
                                                    )
                                                    .indexOf(chat.id) === -1
                                                ) {
                                                  currentUser.chats.push(chat);
                                                }

                                                console.log(currentUser);

                                                dispatch(
                                                  setUserState(currentUser)
                                                );
                                              }
                                            });
                                          });
                                      });
                                    });
                                }
                              });
                            });

                          // if (!user.hasOwnProperty("chats")) {
                          //   user.chats = [] as any[];
                          // }

                          // let matchedUserEmail = "";

                          // if (chat.userEmail1 === user.email) {
                          //   matchedUserEmail = chat.userEmail2;
                          // } else {
                          //   matchedUserEmail = chat.userEmail1;
                          // }

                          // if (
                          //   !user.chats.find(
                          //     (chat: any) =>
                          //       chat.userEmail1 === matchedUserEmail ||
                          //       chat.userEmail2 === matchedUserEmail
                          //   )
                          // ) {
                          //   user.chats.push(chat);
                          //   //setChats(user.chats);
                          // }

                          console.log(user);
                          // dispatch(setUserState(currentUser));
                        }
                      });
                    });

                    if (!Object.keys(user).length) {
                      if (history.location.pathname === "/login") {
                        history.replace("/main");
                      }
                    }
                    // }
                  });
              }
            });
          });
          // dispatch(setUserState(user));
          window.history.replaceState({}, "", "/main");
          // history.replace("/main/matchgame");
        } else {
          setUserLoggedIn(false);
          console.log(userLoggedIn);

          window.history.replaceState({}, "", "/");
        }
        setBusy(false);
      })
    ) {
      // regular login
    }
  }, [user]);

  // const dispatch = useDispatch();

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />} </IonApp>;
};

// export function updateUserData() {
//   if (
//     getCurrentUser().then((user: any) => {
//       if (user) {
//         // TODO: outsource
//         database.collection("users").onSnapshot((snapshot) => {
//           snapshot.forEach((doc) => {
//             const currentUser = doc.data();
//             if (user.email === currentUser["email"]) {
//               currentUser.id = doc.id;

//               if (currentUser.chats === undefined) {
//                 currentUser.chats = [];
//               }

//               // setPictures
//               database
//                 .collection("users")
//                 .doc(doc.id)
//                 .collection("pictures")
//                 .onSnapshot((snapshot) => {
//                   let pictures = snapshot.docs.map((doc) => doc.data());
//                   currentUser.pictures = pictures;

//                   // setChats
//                   database.collection("chats").onSnapshot((snapshot) => {
//                     snapshot.forEach((doc) => {
//                       const chat = doc.data();
//                       chat.id = doc.id;
//                       if (
//                         chat.userEmail1 === currentUser.email ||
//                         chat.userEmail2 === currentUser.email
//                       ) {
//                         // add match-picture to chat
//                         database.collection("users").onSnapshot((snapshot) => {
//                           snapshot.forEach((doc) => {
//                             const currentUserChat = {
//                               id: doc.id,
//                               email: doc.data().email,
//                               pictures: [] as any[],
//                               username: doc.data().username,
//                               ...doc.data(),
//                             };

//                             let matchUserEmail =
//                               chat.userEmail1 === currentUser.email
//                                 ? chat.userEmail2
//                                 : chat.userEmail1;

//                             let matchUserName =
//                               chat.userEmail1 === currentUser.email
//                                 ? chat.userName2
//                                 : chat.userName1;

//                             chat.emailMatch = matchUserEmail;
//                             chat.nameMatch = matchUserName;

//                             if (currentUserChat.email !== currentUser.email) {
//                               // add latest messages to chat
//                               database
//                                 .collection("chats")
//                                 .doc(chat.id)
//                                 .collection("messages")
//                                 .orderBy("timestamp", "asc")
//                                 .limitToLast(1)
//                                 .get()
//                                 .then((response) => {
//                                   response.forEach((document) => {
//                                     const fetchedMessage = {
//                                       id: document.id,
//                                       ...document.data(),
//                                     };

//                                     if (chat.messages.length === 0) {
//                                       chat.messages.push(fetchedMessage);
//                                     }

//                                     database
//                                       .collection("users")
//                                       .doc(currentUserChat.id)
//                                       .collection("pictures")
//                                       // .orderBy("timestamp", "asc")
//                                       // .limitToLast(1)
//                                       .get()
//                                       .then((response) => {
//                                         response.forEach((document) => {
//                                           const fetchedPicture = {
//                                             id: document.id,
//                                             ...document.data(),
//                                           };

//                                           if (
//                                             currentUserChat.email ===
//                                             matchUserEmail
//                                           ) {
//                                             chat.pictureMatch = fetchedPicture;

//                                             if (
//                                               currentUser.chats
//                                                 .map(
//                                                   (chatObj: any) => chatObj.id
//                                                 )
//                                                 .indexOf(chat.id) === -1
//                                             ) {
//                                               currentUser.chats.push(chat);
//                                             }

//                                             console.log(currentUser);

//                                             dispatch(setUserState(currentUser));
//                                           }
//                                         });
//                                       });
//                                   });
//                                 });
//                             }
//                           });
//                         });
//                       }
//                     });
//                   });

//                   // }
//                 });
//             }
//           });
//         });
//       }
//     })
//   )
//     return null;
// }

export default App;

import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Chats.css";
import { useDispatch, useSelector } from "react-redux";
import { database, logoutUser } from "../../firebaseConfig";
import { useHistory } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import ChatScreen from "./ChatScreen/ChatScreen";
import MatchBar from "./MatchBar/MatchBar";
import { setUserSelectedState, setUserState } from "../../redux/actions";
import Chat from "./Chat/Chat";
import moment from "moment";
import { Link } from "react-router-dom";

interface ChatsProps {
  chatIsOpen: Boolean;
}

const Chats: React.FC<ChatsProps> = ({ chatIsOpen }) => {
  const user = useSelector((state: any) => state.user);
  const userEmail = useSelector((state: any) => state.userEmail);
  const history = useHistory();
  const dispatch = useDispatch();

  const [chats, setChats] = useState([] as any[]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [chatOpened, setChatOpened] = useState(false);
  const [chatToOpen, setChatToOpen] = useState({});
  const userSelected = useSelector((state: any) => state.userSelected);

  const logData = () => {
    console.log(chats);
    // console.log(chats[0].messages);
    // console.log(chats[0].messages[0]);
  };

  // useEffect(() => {
  //   if (userSelected !== undefined) {
  //     history.replace("/main/chats/" + userSelected.id);
  //   }

  //   // this will run ONCE when the component loads and never again
  // }, [userSelected]);

  const getUserChat = (userEmail: any) => {
    // let foundChat = chats.filter(
    //   (chat) => chat.userEmail1 === userEmail || chat.userEmail2 === userEmail
    // )[0];
    // if (foundChat.userEmail1 === loggedInUser.user.email) {
    //   foundChat.username1 = loggedInUser.user.username;
    //   foundChat.username2 = getUserName(foundChat);
    // } else {
    //   foundChat.username1 = getUserName(foundChat);
    //   foundChat.username2 = loggedInUser.user.username;
    // }
    // return foundChat;
  };

  const getUser = (chat: any) => {
    // let userEmail =
    //   chat.userEmail1 === loggedInUser.user.email
    //     ? chat.userEmail2
    //     : chat.userEmail1;
    // return matchedUsers.filter((user) => user.email === userEmail)[0];
  };

  const getUserName = (chat: any) => {
    // let userEmail =
    //   chat.userEmail1 === loggedInUser.user.email
    //     ? chat.userEmail2
    //     : chat.userEmail1;
    // return matchedUsers.filter((user) => user.email === userEmail)[0].username;
  };

  const getLastMessageDatetime = (chat: any) => {
    // const seconds = Math.max(
    //   ...chat.messages.map((message) => message.timestamp.seconds)
    // );
    // // let date = new Date(1970, 0, 1); // Epoch
    // let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // // date.setUTCSeconds(seconds);
    // date.setSeconds(seconds);
    // // date.setTime(seconds);
    // // date.toLocaleString("de-DE");
    // // date.toDateString(); // outputs to "Thu May 28 2015"
    // // date.toGMTString();
    // console.log(date);
    // return date.toString();
  };

  const getLastMessage = (chat: any) => {
    // if (chat.messages.length !== 0) {
    //   return chat.messages.reduce((prev, current) =>
    //     prev.timestamp.seconds > current.timestamp.seconds ? prev : current
    //   ).message;
    // }
  };

  const getUserImage = (chat: any) => {
    // let userEmail =
    //   chat.userEmail1 === loggedInUser.user.email
    //     ? chat.userEmail2
    //     : chat.userEmail1;
    // let user = matchedUsers.filter((user) => user.email === userEmail);
    // if (user !== undefined && user.length > 0) {
    //   return user[0].pictures[0].imageUrl;
    // } else {
    //   return "";
    // }
  };

  const handleChange = (clickedUser: any) => {
    // let chatToOpenData = getUserChat(clickedUser.email);
    // chatToOpenData.loggedInUser = loggedInUser.user.email;
    // chatToOpenData.matchedUserImage = getUserImage(chatToOpenData);
    // setChatToOpen(chatToOpenData);
    // console.log(chatToOpenData);
    // setChatOpened(true);
  };

  const logUser = () => {
    console.log(user);
    console.log(userEmail);
    console.log(chats);

    // console.log(user.chats);
    // setChats(user.chats);

    // --> chats bei User laden setzen

    // console.log(userSelected);
  };

  // useEffect(() => {
  //   database.collection("chats").onSnapshot((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       const chat = doc.data();
  //       chat.id = doc.id;

  //       if (chat.userEmail1 === user.email || chat.userEmail2 === user.email) {
  //         console.log(chat);
  //       }

  //       // add latest messages to chat
  //       database
  //         .collection("chats")
  //         .doc(chat.id)
  //         .collection("messages")
  //         .orderBy("timestamp", "asc")
  //         .limitToLast(1)
  //         .get()
  //         .then((response) => {
  //           response.forEach((document) => {
  //             const fetchedMessage = {
  //               id: document.id,
  //               ...document.data(),
  //             };
  //             chat.messages.push(fetchedMessage);
  //           });
  //         });
  //     });
  //   });
  // }, []);

  useEffect(() => {
    // currentUser === user
    // add chats to user
    database.collection("chats").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const chat = doc.data();
        chat.id = doc.id;

        if (
          chat.userEmail1.toLowerCase() === userEmail.email.toLowerCase() ||
          chat.userEmail2.toLowerCase() === userEmail.email.toLowerCase()
        ) {
          // add match-picture to chat
          database.collection("users").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const currentUserChat = {
                id: doc.id,
                email: doc.data().email,
                pictures: [] as any[],
                ...doc.data(),
              };

              let currentUserEmail =
                chat.userEmail1 === userEmail.email
                  ? chat.userEmail2
                  : chat.userEmail1;

              if (currentUserEmail !== user.Email) {
                database
                  .collection("users")
                  .doc(currentUserChat.id)
                  .collection("pictures")
                  .orderBy("timestamp", "asc")
                  .limitToLast(1)
                  .get()
                  .then((response) => {
                    response.forEach((document) => {
                      const fetchedPicture = {
                        id: document.id,
                        ...document.data(),
                      };
                      // console.log(fetchedPicture);
                      chat.pictureMatch = fetchedPicture;
                      // console.log(chat);
                      // fetchedPictures.push(fetchedPicture);

                      // if (!user.hasOwnProperty("chats")) {
                      //   user.chats = [] as any[];
                      // }

                      // let matchedUserEmail = "";

                      // if (chat.userEmail1 === user.email) {
                      //   matchedUserEmail = chat.userEmail2;
                      // } else {
                      //   matchedUserEmail = chat.userEmail1;
                      // }

                      // if (user.chats !== undefined) {
                      //   if (
                      //     !user.chats.find(
                      //       (chat: any) =>
                      //         chat.userEmail1 === matchedUserEmail ||
                      //         chat.userEmail2 === matchedUserEmail
                      //     )
                      //   ) {
                      //     user.chats.push(chat);
                      //     //setChats(user.chats);
                      //   }
                      // }

                      // add latest messages to chat
                      database
                        .collection("chats")
                        .doc(chat.id)
                        .collection("messages")
                        .orderBy("timestamp", "asc")
                        // .limitToLast(1)
                        .get()
                        .then((response) => {
                          response.forEach((document) => {
                            const fetchedMessage = {
                              id: document.id,
                              ...document.data(),
                            };
                            chat.messages.push(fetchedMessage);

                            // console.log(chat);

                            // setUsers((oldUsers) => {
                            //                     if (
                            //                       oldUsers.find((user) => user.email === currentUser.email)
                            //                     )
                            //                       return oldUsers;
                            //                     return [...oldUsers, currentUser];
                            //                   });
                            setChats((oldChats) => {
                              if (
                                oldChats.find(
                                  (oldChat) =>
                                    oldChat.userEmail1.toLowerCase() ===
                                      currentUserEmail.toLowerCase() ||
                                    oldChat.userEmail2.toLowerCase() ===
                                      currentUserEmail.toLowerCase()
                                )
                              )
                                return oldChats;
                              return [...oldChats, chat];
                            });
                          });
                        });
                    });
                  });
              }
            });
          });
        }
      });
    });
    // }, [user.chats]);
  }, [chats]);

  const openUserChat = (chat: any) => {
    // console.log(chat);

    setChatToOpen(chat);
    setChatOpened(true);

    //   <ChatScreen
    //   chat={chatToOpen}
    //   closeChatScreen={(bool) => setChatOpened(bool)}
    // />

    //   history.replace("/main/chat", );

    // history.push({
    //   pathname: "/main/chat",
    //   chat: chatToOpen,
    // });

    // history.push("/main/chat", { chat: chatToOpen }, {closeChatScreen: close});

    // let matchedUserEmail =
    //   chat.userEmail1 === user.email ? chat.userEmail2 : chat.userEmail1;
    // database.collection("users").onSnapshot((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     const currentUser = {
    //       id: doc.id,
    //       email: doc.data().email,
    //       gender: doc.data().gender,
    //       pictures: [] as any[],
    //       likes: doc.data().likes,
    //       dislikes: doc.data().dislikes,
    //       ...doc.data(),
    //     };

    //     if (currentUser.email === matchedUserEmail) {
    //       database
    //         .collection("users")
    //         .doc(currentUser.id)
    //         .collection("pictures")
    //         .get()
    //         .then((response) => {
    //           const fetchedPictures: any[] = [];
    //           response.forEach((document) => {
    //             const fetchedPicture = {
    //               id: document.id,
    //               ...document.data(),
    //             };
    //             fetchedPictures.push(fetchedPicture);
    //           });

    //           currentUser.pictures = fetchedPictures;
    //           dispatch(setUserSelectedState(currentUser));
    //           // history.push("/main/chats/chat");
    //         })
    //         .catch((error) => {
    //           // setError(error);
    //           console.log(error);
    //         });
    //     }
    //   });
    // });
  };

  const logChat = (chat: any) => {
    console.log(chat);
  };

  const showMatchBar = () => {
    for (let index = 0; index < user.chats.length; index++) {
      console.log(user.chats[index]);
      if (user.chats[index].messages.length > 0) {
        return true;
      }
      return false;
    }
  };

  return (
    <IonPage>
      {/* <IonButton onClick={logUser}></IonButton> */}
      {chatOpened ? (
        <div>
          <ChatScreen
            chat={chatToOpen}
            closeChatScreen={(bool) => setChatOpened(bool)}
          />
        </div>
      ) : (
        <div>
          <IonButton onClick={logUser}>log</IonButton>
          <h6>New Matches</h6>
          {{ showMatchBar } ? (
            <MatchBar openChat={(chat) => openUserChat(chat)} />
          ) : null}

          {/* <p>{user.chats}</p> */}

          {/* {chats?.map((chat: any, index: number) => (
            <div key={chat.id}>{chat.id && <p>{chat.id}</p>}</div>
          ))} */}
          <h6>Messages</h6>
          {chats.map((chat: any) => {
            if (chat.messages.length > 0) {
              return (
                <div
                  key={chat.id}
                  className="chat"
                  onClick={() => openUserChat(chat)}
                >
                  <Chat chat={chat} />
                </div>
              );
            }
          })}
        </div>
      )}
    </IonPage>
  );
};

export default Chats;

// {user?.map((user: any, index: number) => (
//   <div>
//     {/* <p>{chat}</p> */}
//     <p>{user.id}</p>
//   </div>
// ))}

// {user?.chats?.map((chat: any, index: number) => (
//   <div>
//     {/* <p>{chat}</p> */}
//     <p>{index}</p>
//   </div>
// ))}

// {user?.chats?.map((chat: any, index: number) => {
//   return (
//     <div>
//       <p>{chat.userEmail1}</p>
//       <p>{chat.userEmail2}</p>
//     </div>

//     // <div onClick={() => handleChange(getUser(chat))}>
//     //   <p>{chat.userEmail1}</p>
//     //   <p>{chat.userEmail2}</p>
//     //   {/* <Chat
//     //     name={getUserName(chat)}
//     //     message={getLastMessage(chat)}
//     //     timestamp={getLastMessageDatetime(chat)}
//     //     profilePic={getUserImage(chat)}
//     //   /> */}
//     // </div>
//   );
// })}

import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import firebase from "firebase";
import { database } from "../../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
} from "@ionic/react";
import { setUserSelectedState } from "../../../redux/actions";

const ChatScreen: React.FC = () => {
  const [input, setInput] = useState("");
  // const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([] as any[]);
  const [messagesSent, setMessagesSent] = useState(false);
  const user = useSelector((state: any) => state.user);
  const userSelected = useSelector((state: any) => state.userSelected);
  const dispatch = useDispatch();

  const sendMessage = (e: any) => {
    e.preventDefault();

    database.collection("chats").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const chat = doc.data();

        chat.id = doc.id;

        if (
          (chat.userEmail1 === user.email || chat.userEmail2 === user.email) &&
          (chat.userEmail1 === userSelected.email ||
            chat.userEmail2 === userSelected.email)
        ) {
          console.log(chat);

          database.collection("chats").doc(chat.id).collection("messages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userEmail: user.email,
            username: user.username,
          });
          // setMessages([...messages, { message: input }]);
        }
      });
    });

    setInput("");
  };

  // const getMatchUsername = () => {
  //   // console.log(chat);
  //   return chat.chat.loggedInUser === chat.chat.userEmail1
  //     ? chat.chat.username2
  //     : chat.chat.username1;
  // };
  // const getOwnUsername = () => {
  //   return chat.chat.loggedInUser === chat.chat.userEmail1
  //     ? chat.chat.username1
  //     : chat.chat.username2;
  // };
  // database.collection("chats").doc(chat.chat.id).collection("messages").add({
  //   message: input,
  //   timestamp: "",
  //   userEmail: chat.chat.loggedInUser,
  //   username: getOwnUsername(),
  // });
  // useEffect(() => {
  //   const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       const currentUser = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //       if (loggedInUser.user.email !== currentUser.email) {
  //         if (
  //           loggedInUser.user.lookingFor === currentUser.gender ||
  //           loggedInUser.user.lookingFor === "both"
  //         ) {
  //           if (
  //             !loggedInUser.user.dislikes.includes(currentUser.email) &&
  //             !loggedInUser.user.likes.includes(currentUser.email)
  //           ) {
  //             database
  //               .collection("users")
  //               .doc(currentUser.id)
  //               .collection("pictures")
  //               .get()
  //               .then((response) => {
  //                 const fetchedPictures = [];
  //                 response.forEach((document) => {
  //                   const fetchedPicture = {
  //                     id: document.id,
  //                     ...document.data(),
  //                   };
  //                   fetchedPictures.push(fetchedPicture);
  //                 });
  //                 currentUser.pictures = fetchedPictures;
  //                 setUsers((oldUsers) => {
  //                   if (
  //                     oldUsers.find((user) => user.email === currentUser.email)
  //                   )
  //                     return oldUsers;
  //                   return [...oldUsers, currentUser];
  //                 });
  //               })
  //               .catch((error) => {
  //                 // setError(error);
  //                 console.log(error);
  //               });
  //           }
  //         }
  //       }
  //     });
  //   });
  //   return () => {
  //     // this is the cleanup...
  //     unsubscribe();
  //   };
  // this will run ONCE when the component loads and never again
  // }, []);
  // useEffect runs a piece of code based on a specific condition

  // useEffect(() => {
  //   // let mounted = true;
  //   database
  //     .collection("chats")
  //     .doc(chat.chat.id)
  //     .collection("messages")
  //     .orderBy("timestamp", "asc")
  //     .onSnapshot((snapshot) => {
  //       // every time a new post is added, this code fires
  //       // console.log(snapshot);
  //       // snapshot.docs.map((doc) => console.log(doc.data()));
  //       setMessages(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           message: doc.data(),
  //         }))
  //       );
  //       // }
  //     });
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = database
  //     .collection("chats")
  //     .doc(chat.chat.id)
  //     .collection("messages")
  //     .get()
  //     .then((response) => {
  //       response.forEach((document) => {
  //         const fetchedMessage = {
  //           id: document.id,
  //           ...document.data(),
  //         };
  //         setMessages((oldMessages) => [...oldMessages, fetchedMessage]);
  //       });
  //     })
  //     .catch((error) => {
  //       // setError(error);
  //       console.log(error);
  //     });
  //   return () => {
  //     // this is the cleanup...
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    database.collection("chats").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const chat = doc.data();
        chat.id = doc.id;

        if (
          (chat.userEmail1 === user.email || chat.userEmail2 === user.email) &&
          (chat.userEmail1 === userSelected.email ||
            chat.userEmail2 === userSelected.email)
        ) {
          console.log(chat);
          console.log(chat.messages.length);

          // add messages to chat

          database
            .collection("chats")
            .doc(chat.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
              // every time a new post is added, this code fires

              // messages found
              if (snapshot.docs.length > 0) {
                setMessagesSent(true);
              }

              setMessages(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  message: doc.data(),
                }))
              );
              // }
            });

          // database
          //   .collection("chats")
          //   .doc(chat.id)
          //   .collection("messages")
          //   .get()
          //   .then((response) => {
          //     response.forEach((message) => {
          //       // messages found
          //       setMessagesSent(true);

          //     });
          //   })
          //   .catch((error) => {
          //     // setError(error);
          //     console.log(error);
          //   })
        }
      });
    });
  }, []);

  const checkForOwnMessage = (message: any) => {
    return message.message.userEmail === user.email ? true : false;
  };

  // const logData = () => {
  //   console.log(chat);
  // };

  const navigateBackToChats = () => {
    console.log(userSelected);
    dispatch(setUserSelectedState(null));
  };

  return (
    <div className="chatScreen">
      <IonButton onClick={navigateBackToChats}> back </IonButton>
      chatscreen
      {!messagesSent ? (
        <div className="chatScreen__timestamp">
          <IonAvatar
            style={{
              display: "flex",
              margin: "auto",
              marginBottom: "10px",
            }}
          >
            <img src={userSelected.pictures[0].imageUrl} />
          </IonAvatar>
          You matched with {userSelected.username} on XXX
        </div>
      ) : null}
      <IonContent fullscreen>
        <IonButton onClick={navigateBackToChats}> back </IonButton>

        {/* <IonInfiniteScroll>
          <IonInfiniteScrollContent> */}
        {messages.map((message) =>
          !checkForOwnMessage(message) ? (
            <div key={message.id} className="chatScreen__message">
              <IonAvatar className="chatScreen__image">
                <img src={userSelected.pictures[0].imageUrl} />
              </IonAvatar>
              <p className="chatScreen__text">{message.message.message}</p>
            </div>
          ) : (
            <div key={message.id} className="chatScreen__message">
              <p className="chatScreen__text__self">
                {message.message.message}
              </p>
            </div>
          )
        )}
        {/* </IonInfiniteScrollContent>
        </IonInfiniteScroll> */}
      </IonContent>
      <div>
        <form className="chatScreen__input">
          <IonInput
            value={input}
            onIonChange={(e: any) => setInput(e.target.value)}
            type="text"
            className="chatScreen__inputField"
            placeholder="Type a message..."
          ></IonInput>

          {/* <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="chatScreen__inputField"
            placeholder="Type a message..."
          /> */}
          <button
            type="submit"
            onClick={sendMessage}
            className="chatScreen__inputButton"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;

// {chat.chat.messages.map((message) =>
//   !checkForOwnMessage(message) ? (
//     <div key={message.id} className="chatScreen__message">
//       <Avatar
//         className="chatScreen__image"
//         alt={message.name}
//         src={chat.chat.matchedUserImage}
//       />
//       <p className="chatScreen__text">{message.message}</p>
//     </div>
//   ) : (
//     <div key={message.id} className="chatScreen__message">
//       <p className="chatScreen__text__self">{message.message}</p>
//     </div>
//   )
// )}

// {messages.map((message, index) => (
//   <div key={message.id}>
//     {message.message.userName1}
//     {message.message.userName2}
//   </div>
// ))}

// <Button onClick={() => logData()}>log chat </Button>

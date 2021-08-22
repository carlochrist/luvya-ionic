import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import firebase from "firebase";
import { database } from "../../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { setUserSelectedState, setUserState } from "../../../redux/actions";
import { useHistory } from "react-router";
import { AnyAaaaRecord } from "dns";

interface ChatScreenProps {
  chat: any;
  closeChatScreen(bool: boolean): any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ chat, closeChatScreen }) => {
  const history = useHistory();
  const [input, setInput] = useState("");
  // const [chat, setChat] = useState(null);
  // const [messages, setMessages] = useState(chat.messages as any[]);
  const [messages, setMessages] = useState([] as any[]);
  const [noMessagesSent, setNoMessagesSent] = useState(false);
  const user = useSelector((state: any) => state.user);
  const userSelected = useSelector((state: any) => state.userSelected);
  const dispatch = useDispatch();

  const logChat = () => {
    // console.log(chat);
    // console.log(user);
    console.log(messages);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();

    let messageObj = {
      id: "0",
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userEmail: user.email,
      username: user.username,
    };

    database.collection("chats").doc(chat.id).collection("messages").add({
      message: messageObj.message,
      timestamp: messageObj.timestamp,
      userEmail: messageObj.userEmail,
      username: messageObj.username,
    });

    // console.log(messages);

    // messageObj.id = "000";

    setMessages([...messages, messageObj]);

    // database.collection("users").onSnapshot((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     const currentUser = doc.data();
    //     if (user.email === currentUser["email"]) {
    //       currentUser.id = doc.id;

    //       setMessages([...messages, { message: input }]);

    //       for (let i = 0; i < user.chats.length; i++) {
    //         if (user.chats[i].id === chat.id) {
    //           user.chats[i].messages = messages;
    //         }
    //       }

    //       dispatch(setUserState(user));
    //     }
    //   });
    // });

    // database.collection("chats").onSnapshot((snapshot) => {
    //   snapshot.forEach(async (doc) => {
    //     const chat2 = doc.data();

    //     chat.id = doc.id;

    //     console.log(user);
    //     console.log(chat);

    //     if (
    //       (chat.userEmail1 === user.email || chat.userEmail2 === user.email) &&
    //       (chat.userEmail1 === userSelected.email ||
    //         chat.userEmail2 === userSelected.email)
    //     ) {
    //       console.log(chat);

    //       let messageObj = {
    //         message: input,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //         userEmail: user.email,
    //         username: user.username,
    //       };

    //       console.log(messageObj);
    //       console.log(firebase.firestore.FieldValue.serverTimestamp());

    //       database.collection("chats").doc(chat.id).collection("messages").add({
    //         message: messageObj.message,
    //         timestamp: messageObj.timestamp,
    //         userEmail: messageObj.userEmail,
    //         username: messageObj.username,
    //       });

    //       // await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec

    //       // update latest message

    //       // database.collection("chats").onSnapshot((snapshot) => {
    //       //   snapshot.forEach((doc) => {
    //       //     const chat2 = doc.data();

    //       //     chat.id = doc.id;
    //       //     if (chat.id === chat2.id) {
    //       //       user.chats.filter(
    //       //         (chatFilter: { id: any }) => chatFilter.id === chat.id
    //       //       )[0].messages[0] = chat2;
    //       //     }
    //       //   });
    //       // });

    //       // user.chats.filter(
    //       //   (chatFilter: { id: any }) => chatFilter.id === chat.id
    //       // )[0].messages[0] = messageObj;

    //       console.log(user);

    //       // setMessages([...messages, { message: input }]);
    //     }
    //   });
    // });

    setInput("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const scrollbar = document.getElementById("scrollbar");
    if (scrollbar) {
      console.log("scroll down!");
      scrollbar.scrollTop = scrollbar?.scrollHeight;
    }
  };

  const navigateBackToChats = () => {
    console.log(user);
    console.log(userSelected);

    // history.replace("/main/chats");
    history.replace("/main/matchgame");

    // database.collection("chats").onSnapshot((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     const chat2 = doc.data();

    //     chat.id = doc.id;
    //     if (chat.id === chat2.id) {
    //       user.chats.filter(
    //         (chatFilter: { id: any }) => chatFilter.id === chat.id
    //       )[0].messages[0] = chat2;
    //     }
    //   });
    // });

    // dispatch(setUserSelectedState(null));
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

  useEffect(() => {
    database
      .collection("chats")
      .doc(chat.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get()
      .then((response) => {
        response.forEach((document) => {
          const fetchedMessage = {
            id: document.id,
            ...document.data(),
          };
          setMessages((oldMessages) => [...oldMessages, fetchedMessage]);
        });
      })
      .catch((error) => {
        // setError(error);
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   database.collection("chats").onSnapshot((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       console.log("test");
  //       const chat = doc.data();
  //       chat.id = doc.id;

  //       if (
  //         (chat.userEmail1 === user.email || chat.userEmail2 === user.email) &&
  //         (chat.userEmail1 === userSelected.email ||
  //           chat.userEmail2 === userSelected.email)
  //       ) {
  //         console.log(chat);
  //         console.log(chat.messages.length);

  //         // add messages to chat

  //         database
  //           .collection("chats")
  //           .doc(chat.id)
  //           .collection("messages")
  //           .orderBy("timestamp", "asc")
  //           .onSnapshot((snapshot) => {
  //             // every time a new post is added, this code fires

  //             // messages found
  //             if (snapshot.docs.length > 0) {
  //               setNoMessagesSent(false);
  //             }

  //             setMessages(
  //               snapshot.docs.map((doc) => ({
  //                 id: doc.id,
  //                 message: doc.data(),
  //               }))
  //             );
  //             // }
  //           });

  //         // database
  //         //   .collection("chats")
  //         //   .doc(chat.id)
  //         //   .collection("messages")
  //         //   .get()
  //         //   .then((response) => {
  //         //     response.forEach((message) => {
  //         //       // messages found
  //         //       setMessagesSent(true);

  //         //     });
  //         //   })
  //         //   .catch((error) => {
  //         //     // setError(error);
  //         //     console.log(error);
  //         //   })
  //       }
  //     });
  //   });
  // }, []);

  const checkForOwnMessage = (message: any) => {
    return (
      !message.hasOwnProperty("userEmail") || message.userEmail === user.email
    );
  };

  // const logData = () => {
  //   console.log(chat);
  // };

  const back = () => {
    closeChatScreen(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="chats__header">
          {/* <IonButton
            onClick={navigateBackToChats}
            className="chats__header__back"
          >
            back
          </IonButton> */}

          <IonButton onClick={back} className="chats__header__back">
            back
          </IonButton>

          <IonButton onClick={logChat} className="chats__header__back">
            log
          </IonButton>
          <div className="chats__header-user">
            <IonAvatar>
              {/* <img src={userSelected.pictures[0].imageUrl} /> */}
            </IonAvatar>
            {/* <p>{userSelected.username}</p> */}
          </div>
        </div>
      </IonHeader>

      {noMessagesSent ? (
        <div className="chatScreen__timestamp">
          <IonAvatar
            style={{
              display: "flex",
              margin: "auto",
              marginBottom: "10px",
            }}
          >
            <img src={chat.pictureMatch.imageUrl} />
          </IonAvatar>
          You matched with {chat.username} on XXX
        </div>
      ) : null}

      <div className="chatScreen__scroll" id="scrollbar">
        {messages.map((message: any) =>
          !checkForOwnMessage(message) ? (
            <div key={message.id} className="chatScreen__message">
              <IonAvatar className="chatScreen__image">
                <img src={chat.pictureMatch.imageUrl} />
              </IonAvatar>
              <p className="chatScreen__text">{message.message}</p>
            </div>
          ) : (
            <div key={message.id} className="chatScreen__message">
              <p className="chatScreen__text__self">{message.message}</p>
            </div>
          )
        )}
      </div>

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
    </IonPage>
  );
};

export default ChatScreen;

// <IonContent fullscreen className="scrollBar">
// {/* <IonInfiniteScroll>
// <IonInfiniteScrollContent> */}
// <div className="">
//   {messages.map((message) =>
//     !checkForOwnMessage(message) ? (
//       <div key={message.id} className="chatScreen__message">
//         <IonAvatar className="chatScreen__image">
//           <img src={userSelected.pictures[0].imageUrl} />
//         </IonAvatar>
//         <p className="chatScreen__text">{message.message.message}</p>
//       </div>
//     ) : (
//       <div key={message.id} className="chatScreen__message">
//         <p className="chatScreen__text__self">
//           {message.message.message}
//         </p>
//       </div>
//     )
//   )}
// </div>

// {/* </IonInfiniteScrollContent>
// </IonInfiniteScroll> */}
// </IonContent>

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

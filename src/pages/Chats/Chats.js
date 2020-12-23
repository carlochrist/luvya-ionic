import React, { useState, useEffect } from "react";
import "./Chats.css";
import Chat from "./Chat/Chat";
import { database } from "./../firebase";
import MatchBar from "./MatchBar/MatchBar";
import ChatScreen from "./ChatScreen/ChatScreen";

function Chats(loggedInUser) {
  const [chats, setChats] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [chatOpened, setChatOpened] = useState(false);
  const [chatToOpen, setChatToOpen] = useState({});

  //Matchedwith als Objekt —> + chatId

  useEffect(() => {
    const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = {
          id: doc.id,
          ...doc.data(),
        };

        if (loggedInUser.user.email !== currentUser.email) {
          if (
            loggedInUser.user.likes.includes(currentUser.email) &&
            currentUser.likes.includes(loggedInUser.user.email)
          ) {
            console.log(currentUser);

            database
              .collection("users")
              .doc(currentUser.id)
              .collection("pictures")
              .get()
              .then((response) => {
                const fetchedPictures = [];
                response.forEach((document) => {
                  const fetchedPicture = {
                    id: document.id,
                    ...document.data(),
                  };
                  fetchedPictures.push(fetchedPicture);
                });

                currentUser.pictures = fetchedPictures;
                setMatchedUsers((oldUsers) => [...oldUsers, currentUser]);
              })
              .catch((error) => {
                // setError(error);
                console.log(error);
              });
          }
        }
      });
    });

    return () => {
      // this is the cleanup...
      unsubscribe();
    };

    // this will run ONCE when the component loads and never again
  }, []);

  useEffect(() => {
    const unsubscribe = database.collection("chats").onSnapshot((snapshot) =>
      snapshot.forEach((doc) => {
        const currentChat = {
          id: doc.id,
          ...doc.data(),
        };

        if (
          currentChat.userEmail1 === loggedInUser.user.email ||
          currentChat.userEmail2 === loggedInUser.user.email
        ) {
          database
            .collection("chats")
            .doc(currentChat.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .get()
            .then((response) => {
              const fetchedMessages = [];
              response.forEach((message) => {
                const fetchedMessage = {
                  id: message.id,
                  ...message.data(),
                };
                fetchedMessages.push(fetchedMessage);
              });

              currentChat.messages = fetchedMessages;
              setChats((oldChats) => [...oldChats, currentChat]);
            })
            .catch((error) => {
              // setError(error);
              console.log(error);
            });

          // setChats((oldChats) => [...oldChats, currentChat]);
        }

        // console.log(currentChat);
      })
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const logData = () => {
    console.log(chats);
    console.log(chats[0].messages);
    console.log(chats[0].messages[0]);
  };

  const getUserChat = (userEmail) => {
    let foundChat = chats.filter(
      (chat) => chat.userEmail1 === userEmail || chat.userEmail2 === userEmail
    )[0];

    if (foundChat.userEmail1 === loggedInUser.user.email) {
      foundChat.username1 = loggedInUser.user.username;
      foundChat.username2 = getUserName(foundChat);
    } else {
      foundChat.username1 = getUserName(foundChat);
      foundChat.username2 = loggedInUser.user.username;
    }
    return foundChat;
  };

  const getUser = (chat) => {
    let userEmail =
      chat.userEmail1 === loggedInUser.user.email
        ? chat.userEmail2
        : chat.userEmail1;
    return matchedUsers.filter((user) => user.email === userEmail)[0];
  };

  const getUserName = (chat) => {
    let userEmail =
      chat.userEmail1 === loggedInUser.user.email
        ? chat.userEmail2
        : chat.userEmail1;
    return matchedUsers.filter((user) => user.email === userEmail)[0].username;
  };

  const getLastMessageDatetime = (chat) => {
    const seconds = Math.max(
      ...chat.messages.map((message) => message.timestamp.seconds)
    );
    // let date = new Date(1970, 0, 1); // Epoch
    let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // date.setUTCSeconds(seconds);

    date.setSeconds(seconds);
    // date.setTime(seconds);
    // date.toLocaleString("de-DE");

    // date.toDateString(); // outputs to "Thu May 28 2015"
    // date.toGMTString();

    console.log(date);
    return date.toString();
  };

  const getLastMessage = (chat) => {
    if (chat.messages.length !== 0) {
      return chat.messages.reduce((prev, current) =>
        prev.timestamp.seconds > current.timestamp.seconds ? prev : current
      ).message;
    }
  };

  const getUserImage = (chat) => {
    let userEmail =
      chat.userEmail1 === loggedInUser.user.email
        ? chat.userEmail2
        : chat.userEmail1;
    let user = matchedUsers.filter((user) => user.email === userEmail);

    if (user !== undefined && user.length > 0) {
      return user[0].pictures[0].imageUrl;
    } else {
      return "";
    }
  };

  const handleChange = (clickedUser) => {
    let chatToOpenData = getUserChat(clickedUser.email);
    chatToOpenData.loggedInUser = loggedInUser.user.email;
    chatToOpenData.matchedUserImage = getUserImage(chatToOpenData);
    setChatToOpen(chatToOpenData);
    console.log(chatToOpenData);
    setChatOpened(true);
  };

  //  profilePic={() => getUserImage(message.userEmail)}

  return (
    <div>
      {chatOpened ? (
        <div>
          <ChatScreen chat={chatToOpen} />
        </div>
      ) : (
        <div>
          <MatchBar matchedUsers={matchedUsers} onChange={handleChange} />
          {chats.map((chat, index) => {
            return (
              <div key={chat.id} onClick={() => handleChange(getUser(chat))}>
                {chat.messages.length > 0 ? (
                  <Chat
                    name={getUserName(chat)}
                    message={getLastMessage(chat)}
                    timestamp={getLastMessageDatetime(chat)}
                    profilePic={getUserImage(chat)}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Chats;

// {chats.map((chat, index) => {
//   return (
//     <div
//       key={chat.id}
//       className=""
//       onClick={() => getUserImage("susi@gmx.de")}
//     >
//       {chat.messages.map((message, index) => {
//         return (
//           <div key={message.id} className="chats">
//             <Chat
//               name={message.userName}
//               message={message.message}
//               timestamp={new Date(message.timestamp).toLocaleDateString(
//                 "en-US"
//               )}
//               profilePic={getUserImage(message.userEmail)}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// })}

import React, { useEffect, useState } from "react";
import {
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
import { logoutUser } from "../../firebaseConfig";
import { useHistory } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import ChatScreen from "./ChatScreen/ChatScreen";
import MatchBar from "./MatchBar/MatchBar";
import { setUserSelectedState, setUserState } from "../../redux/actions";

const Chats: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
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
    console.log(userSelected);
  };

  return (
    <IonPage>
      {/* <IonButton onClick={logUser}></IonButton> */}
      {userSelected ? (
        <div>
          <ChatScreen />
        </div>
      ) : (
        <div>
          <MatchBar />
          {/* {chats.map((chat, index) => {
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
          })} */}
        </div>
      )}
    </IonPage>
  );
};

export default Chats;

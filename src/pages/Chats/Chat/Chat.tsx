import React from "react";
// import Avatar from "@material-ui/core/Avatar";
import "./Chat.css";
import { Link } from "react-router-dom";
import { IonAvatar } from "@ionic/react";
import moment from "moment";

interface ChatProps {
  chat: any;
  // user: any;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  return (
    <div key={chat.id} className="chat__chat">
      <IonAvatar className="chat__image">
        <img src={chat.pictureMatch.imageUrl} />
      </IonAvatar>
      <div className="chat__details">
        <h2>{chat.nameMatch}</h2>
        <p>{chat.messages[0]?.message}</p>
      </div>
      {/* <p className="chat__timestamp">
      {new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(chat.messages[0]?.timestamp.seconds)}
    </p> */}
      <div className="chat__timestamp">
        {moment(new Date(chat.messages[0]?.timestamp.seconds * 1000)).format(
          "DD/MM/YYYY HH:MM"
        )}
      </div>
    </div>
  );
};

export default Chat;

// TODO: add name where is no pic

//    <Link to={`/chat/${name}`}>
//    </Link>

// {
//   user.pictures && (
//     <IonAvatar>
//       <img src={user.pictures[0].imageUrl} />
//     </IonAvatar>
//   );
// }
// <p>{user.username}</p>;

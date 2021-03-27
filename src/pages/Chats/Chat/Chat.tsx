import React from "react";
// import Avatar from "@material-ui/core/Avatar";
import "./Chat.css";
import { Link } from "react-router-dom";
import { IonAvatar } from "@ionic/react";

const Chat: React.FC = () => {
  return (
    <div className="chat">
      {/* <IonAvatar className="chat__image">
        <img src={user.pictures[0].imageUrl} />
      </IonAvatar>
      <div className="chat__details">
        <h2>{name}</h2>
        <p>{message}</p>
      </div>
      <p className="chat__timestamp">{timestamp}</p> */}
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

import { IonAvatar, IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { database, getCurrentUser } from "../../../firebaseConfig";
import { setUserSelectedState } from "../../../redux/actions";
// import Avatar from "@material-ui/core/Avatar";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme: any) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//   },
//   large: {
//     width: theme.spacing(10),
//     height: theme.spacing(10),
//   },
// }));

const logData = (user: any) => {
  console.log(user);
};

const MatchBar: React.FC = () => {
  // const classes = useStyles();

  // const setUserInChatsComponent = (clickedUser: any) => {
  //   matchedUsers.onChange(clickedUser);
  // };

  const user = useSelector((state: any) => state.user);
  const userSelected = useSelector((state: any) => state.userSelected);

  const [matchedUsers, setMatchedUsers] = useState([] as any[]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // console.log(getCurrentUser());
    console.log(user);

    // const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     // console.log(user);
    //     if (!Object.keys(user).length) {
    //       // if (history.location.pathname === "/login") {
    //       //   history.replace("/main");
    //       // }
    //       history.replace("/main/matchgame");
    //     } else {
    //       const currentUser = {
    //         id: doc.id,
    //         email: doc.data().email,
    //         gender: doc.data().gender,
    //         pictures: [] as any[],
    //         likes: doc.data().likes,
    //         dislikes: doc.data().dislikes,
    //         ...doc.data(),
    //       };

    //       // console.log(currentUser);

    //       //     currentUser.chats
    //       //     .map(
    //       //       (chatObj: any) =>
    //       //         chatObj.id
    //       //     )
    //       //     .indexOf(chat.id) === -1
    //       // ) {
    //       //   currentUser.chats.push(chat);
    //       // }

    //       // user.chats.map((chatObj: any) => chatObj.userEmail1 === currentUser.email ||
    //       //       chatObj.userEmail2 === currentUser.email)

    //       if (
    //         currentUser.email != user.email &&
    //         user.likes.includes(currentUser.email) &&
    //         currentUser.likes.includes(user.email)
    //       ) {
    //         console.log(user);
    //         // if (!user.hasOwnProperty("chats")) {
    //         //   console.log("hier")
    //         //   user.chats = [];
    //         // }

    //         if (user.chats === undefined) {
    //           user.chats = [];
    //         }
    //         // console.log(user);
    //         // console.log(
    //         //   user.chats.map((chatObj: any) => {
    //         //     if (
    //         //       (chatObj.userEmail1 === currentUser.email ||
    //         //         chatObj.userEmail2 === currentUser.email) &&
    //         //       chatObj.messages.length > 0
    //         //     ) {
    //         //       return false;
    //         //     } else {
    //         //       return true;
    //         //     }
    //         //   })
    //         // );
    //         if (
    //           !user.chats
    //             .map((chatObj: any) => {
    //               if (
    //                 (chatObj.userEmail1 === currentUser.email ||
    //                   chatObj.userEmail2 === currentUser.email) &&
    //                 chatObj.messages.length > 0
    //               ) {
    //                 return false;
    //               } else {
    //                 return true;
    //               }
    //             })
    //             .includes(false)
    //           // .map((boolElement: any) => boolElement)
    //           // .indexOf(false) !== -1
    //           // .map((boolElement: any) => {
    //           //   if (boolElement === false) return false;
    //           // })
    //         ) {
    //           console.log(user);
    //           database
    //             .collection("users")
    //             .doc(currentUser.id)
    //             .collection("pictures")
    //             .get()
    //             .then((response) => {
    //               const fetchedPictures: any[] = [];
    //               response.forEach((document) => {
    //                 const fetchedPicture = {
    //                   id: document.id,
    //                   ...document.data(),
    //                 };
    //                 fetchedPictures.push(fetchedPicture);
    //               });

    //               currentUser.pictures = fetchedPictures;
    //               // currentUser['pictures'] = fetchedPictures;

    //               if (currentUser.pictures.length > 0) {
    //                 setMatchedUsers((oldUsers) => {
    //                   if (
    //                     oldUsers.find(
    //                       (user) => user.email === currentUser.email
    //                     )
    //                   )
    //                     // console.log(oldUsers);
    //                     return oldUsers;
    //                   return [...oldUsers, currentUser];
    //                 });
    //               }
    //             })
    //             .catch((error) => {
    //               // setError(error);
    //               console.log(error);
    //             });
    //         }
    //       }
    //     }
    //   });
    // });

    // return () => {
    //   // this is the cleanup...
    //   unsubscribe();
    // };

    // this will run ONCE when the component loads and never again
  }, [user.chats]);

  const logData = () => {
    console.log(user);
    // console.log(matchedUsers);
  };

  const setUserInChatsComponent = (clickedChat: any) => {
    // matchedUsers.onChange(clickedUser);
    // console.log(clickedChat);

    database.collection("users").onSnapshot((snapshot) => {
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

        if (currentUser.email !== user.email) {
          if (
            currentUser.email === clickedChat.userEmail1 ||
            currentUser.email === clickedChat.userEmail2
          ) {
            // console.log(currentUser);

            // setPictures
            database
              .collection("users")
              .doc(currentUser.id)
              .collection("pictures")
              .onSnapshot((snapshot) => {
                let pictures = snapshot.docs.map((doc) => doc.data());
                currentUser.pictures = pictures;
                dispatch(setUserSelectedState(currentUser));
              });
          }
        }
      });
    });

    // --> chat auslesen, user finden -->
    // dispatch(setUserSelectedState(clickedUser));
    // console.log(userSelected);
  };

  const logUser = () => {
    console.log(userSelected);
    console.log(user);
    console.log(matchedUsers);
  };

  const checkIfAlreadyChattedWithAllMatches = () => {
    for (let index = 0; index < user.chats.length; index++) {
      if (user.chats[index].messages.length > 0) {
        return false;
      }
    }
    return true;
  };

  const getUserName = (chat: {
    userEmail1: any;
    userName2: any;
    userName1: any;
  }) => {
    return chat.userEmail1 === user.email ? chat.userName2 : chat.userName1;
  };

  return (
    <div>
      {/* <IonButton onClick={logUser}>log user</IonButton> */}

      {/* {!{ checkIfAlreadyChattedWithAllMatches } ? (
        <p style={{ textAlign: "center" }}>Matches</p>
      ) : null} */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="matchedUsers"
      >
        {/* matchbar xd */}
        {/* <IonButton onClick={logData}>log</IonButton> */}
        {/* {user.chats.map((user: any) => (
          <div>
            <p>{user.id}</p>
            <IonAvatar>
              <img src={user.pictureMatch.imageUrl} />
            </IonAvatar>
          </div>
        ))} */}
        {user.chats.map((chat: any) => (
          <div
            key={chat.id}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
            onClick={() => setUserInChatsComponent(chat)}
          >
            {chat.messages.length == 0 && (
              <div>
                <IonAvatar>
                  <img src={chat.pictureMatch.imageUrl} />
                </IonAvatar>
                <p>{getUserName(chat)}</p>
              </div>
            )}
          </div>
        ))}
        {/* {matchedUsers.map((user: any) => (
          <div
            key={user.id}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
            onClick={() => setUserInChatsComponent(user)}
          >
            {user.pictures && (
              <IonAvatar>
                <img src={user.pictures[0].imageUrl} />
              </IonAvatar>
            )}
            <p>{user.username}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MatchBar;

// <img
// className=""
// src={user.pictures[0].imageUrl}
// alt=""
// width="50%"
// heigth="50%"
// />

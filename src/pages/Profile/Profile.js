import React, { useEffect, useState } from "react";
import { database, auth } from "./../firebase";
import "./Profile.css";
import ImageUpload from "./ImageUpload/ImageUpload";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Profile(props) {
  const [user, setUser] = useState(null);
  const [pictures, setPictures] = useState([]);
  const carouselSettings = {
    dots: true,
    fade: true,
    infinte: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: true,
    slidesToScroll: 1,
    className: "slides",
  };
  const history = useHistory();

  useEffect(() => {
    let unsubscribe;

    // get loggedin user
    unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const currentUser = doc.data();

        // console.log("vergleich!!!!!!!");
        // console.log(props.user.email);
        // console.log(currentUser.email);

        if (props.user.email === currentUser["email"]) {
          currentUser.id = doc.id;
          if (!currentUser.hasOwnProperty("gender")) {
            currentUser.gender = "male";
          }
          if (!currentUser.hasOwnProperty("lookingFor")) {
            currentUser.lookingFor = "";
          }
          if (!currentUser.hasOwnProperty("hereFor")) {
            currentUser.hereFor = [];
          }

          database
            .collection("users")
            .doc(doc.id)
            .collection("pictures")
            .onSnapshot((snapshot) => {
              setPictures(snapshot.docs.map((doc) => doc.data()));
            });

          setUser(currentUser);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    props.onChange(null);
    auth.signOut();
    jumpIntoChat();
  };

  const jumpIntoChat = () => {
    history.push("/");
  };

  const updateUserData = (event) => {
    // object-destructuring
    const { name, value, type, checked } = event.target;

    // console.log(event);
    // console.log(name);
    // console.log(value);
    // console.log(type);
    // console.log(checked);

    if (type === "checkbox") {
      if (user.hereFor.indexOf(name) !== -1) {
        user.hereFor.splice(user.hereFor.indexOf(name), 1);
      } else {
        user.hereFor.push(name);
      }
    } else {
      user[name] = value;
    }

    database.collection("users").doc(user.id).set(
      {
        gender: user.gender,
        lookingFor: user.lookingFor,
        hereFor: user.hereFor,
      },
      { merge: true }
    );
    console.log(user);
  };

  const logData = () => {
    console.log("props: ", props);
    console.log("user: ", user);
    console.log("pictures: ", pictures);
  };

  const checkIfChecked = (hereFor) => {
    return user.hereFor.indexOf(hereFor) !== -1 ? true : false;
  };

  const logUser = () => {
    console.log(props);
    console.log(user);
  };

  return (
    <div>
      <div className="profile">
        {pictures ? (
          <Carousel>
            {pictures.map((picture) => {
              // console.log(picture);
              return (
                <div key={picture.timestamp} className="profile__picture">
                  <img width="500px" src={picture.imageUrl} />
                </div>
              );
            })}
          </Carousel>
        ) : null}
      </div>

      <ImageUpload user={user} />

      <div>
        <button onClick={logUser}>log user</button>
        {user ? <label>Hey {user.username}!</label> : null}

        <form>
          {user ? (
            <div>
              <br />
              <br />
              <label>Gender: </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={updateUserData}
                />
                male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={updateUserData}
                />
                female
              </label>

              <br />
              <br />

              <label>Looking for: </label>
              <label>
                <input
                  type="radio"
                  name="lookingFor"
                  value="male"
                  checked={user.lookingFor === "male"}
                  onChange={updateUserData}
                />
                male
              </label>
              <label>
                <input
                  type="radio"
                  name="lookingFor"
                  value="female"
                  checked={user.lookingFor === "female"}
                  onChange={updateUserData}
                />
                female
              </label>
              <label>
                <input
                  type="radio"
                  name="lookingFor"
                  value="both"
                  checked={user.lookingFor === "both"}
                  onChange={updateUserData}
                />
                both
              </label>

              <br />
              <br />

              <label>Here for: </label>

              <label>
                <input
                  type="checkbox"
                  name="chats"
                  checked={checkIfChecked("chats")}
                  onChange={updateUserData}
                />
                chats
              </label>

              <label>
                <input
                  type="checkbox"
                  name="acquaintances"
                  checked={checkIfChecked("acquaintances")}
                  onChange={updateUserData}
                />
                acquaintances
              </label>

              <label>
                <input
                  type="checkbox"
                  name="dates"
                  checked={checkIfChecked("dates")}
                  onChange={updateUserData}
                />
                dates
              </label>

              <br />
              <br />
            </div>
          ) : null}
        </form>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;

// {pictures ? (
//   <Slider {...carouselSettings} className="Slider">
//     {pictures.map((picture) => {
//       // console.log(picture);
//       return (
//         <div className="profile__picture">
//           <img width="500px" src={picture.imageUrl} />
//         </div>
//       );
//     })}
//   </Slider>
// ) : null}

// <div className="profile">
// {pictures ? (
//   <Slider {...carouselSettings} className="Slider">
//     {pictures.map((picture) => {
//       // console.log(picture);
//       return (
//         <div className="profile__picture">
//           <img width="500px" src={picture.imageUrl} />
//         </div>
//       );
//     })}
//   </Slider>
// ) : null}
// </div>

// <input
// value={user ? { user } : null}
// onChange={(e) => {
//   setUser(e.target.value);
// }}
// />
// <button onClick={updateUserData}>Update</button>
// <button onClick={logData}>log data</button>

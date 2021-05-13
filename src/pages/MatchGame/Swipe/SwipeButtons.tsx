import { IonButton, IonContent, IonIcon } from "@ionic/react";
import {
  star,
  reloadCircleOutline,
  closeCircleOutline,
  flashOutline,
  heartOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSwipeButtonClicked } from "../../../redux/actions";
import "./SwipeButtons.css";

const SwipeButtons: React.FC = () => {
  const dispatch = useDispatch();

  const swipeButtonClicked = useSelector(
    (state: any) => state.swipeButtonClicked
  );

  const log = () => {
    console.log("test");
  };

  const onClickSwipeButton = (name: String) => {
    let swipeButtonClicked = {
      name: name,
    };
    dispatch(setSwipeButtonClicked(swipeButtonClicked));
  };

  return (
    <div className="swipeButtons__swipeButtons">
      <IonButton
        className="swipeButtons__repeat"
        onClick={() => onClickSwipeButton("repeat")}
        color="x"
      >
        <IonIcon icon={reloadCircleOutline} />
      </IonButton>
      <IonButton
        className="swipeButtons__left"
        onClick={() => onClickSwipeButton("dislike")}
        color="x"
      >
        <IonIcon icon={closeCircleOutline} />
      </IonButton>
      <IonButton
        className="swipeButtons__star"
        onClick={() => onClickSwipeButton("superlike")}
        color="x"
      >
        <IonIcon icon={star} />
      </IonButton>
      <IonButton
        className="swipeButtons__right"
        onClick={() => onClickSwipeButton("like")}
        color="x"
      >
        <IonIcon icon={heartOutline} />
      </IonButton>
      <IonButton
        className="swipeButtons__lightning"
        onClick={() => onClickSwipeButton("flash")}
        color="x"
      >
        <IonIcon icon={flashOutline} />
      </IonButton>
    </div>
  );
};

export default SwipeButtons;

import { IonButton, IonContent, IonIcon } from "@ionic/react";
import {
  star,
  reloadCircleOutline,
  closeCircleOutline,
  flashOutline,
  heartOutline,
} from "ionicons/icons";
import React, { useState } from "react";
const SwipeButtons: React.FC = () => {
  return (
    <IonContent>
      <div className="swipeButtons">
        <IonButton className="swipeButtons__repeat">
          <IonIcon icon={reloadCircleOutline} />
        </IonButton>
        <IonButton className="swipeButtons__left">
          <IonIcon icon={closeCircleOutline} />
        </IonButton>
        <IonButton className="swipeButtons__star">
          <IonIcon icon={star} />
        </IonButton>
        <IonButton className="swipeButtons__right">
          <IonIcon icon={heartOutline} />
        </IonButton>
        <IonButton className="swipeButtons__lightning">
          <IonIcon icon={flashOutline} />
        </IonButton>
      </div>
    </IonContent>
  );
};

export default SwipeButtons;

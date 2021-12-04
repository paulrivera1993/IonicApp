import React, { useState, useEffect } from "react";

import logo from "../images/logo.jpg";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLoading,
} from "@ionic/react";

export const HomePage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-text-center">
          <IonCardContent className="ion-justify-content-center">
            <IonRow className="ion-justify-content-center">
              <IonCol size="7">
                <img src={logo} alt="team logo" />
              </IonCol>
            </IonRow>
          </IonCardContent>
          <IonCardHeader>
            <IonCardTitle>Bienvenido</IonCardTitle>
          </IonCardHeader>
          <IonRow className="ion-justify-content-center">
            <IonCol size="7">
              <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={"Cargando..."}
                duration={5000}
              />
            </IonCol>
          </IonRow>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

import React from "react";
import {
  IonItem,
  IonButton,
  IonLabel,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonThumbnail,
  IonImg,
  IonIcon,
} from "@ionic/react";

import { newspaperOutline, newspaperSharp } from "ionicons/icons";
import axios from "axios";

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [
  { src: "http://placekitten.com/g/200/300", text: "a picture of a cat" },
];

export const NoticiasPage: React.FC = () => {
  const [items, setItems] = React.useState([]);


  const apiKey = "32a3e2286757486b8b9d40d3accc4db1";
  const endpoint = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

  const enviarPeticionGet = () => {
    return axios.get(endpoint).then((response) => {
      console.log(response);
      return response.data;
    });
  };

  React.useEffect(() => {
    enviarPeticionGet().then((data) => setItems(data.articles));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Noticias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem margin-top>
          <IonIcon></IonIcon>
          <h1>
            <IonIcon color="medium" ios={newspaperOutline} md={newspaperSharp}>
              {" "}
            </IonIcon>
            Noticias
          </h1>
        </IonItem>
        <IonList color="primary">
          {items.map((item, i) => {
          

            return (
              <IonItem key={i}>
                <IonThumbnail slot="start">
                  <IonImg src={item["urlToImage"]} />
                </IonThumbnail>
                <IonLabel> {item["title"]}</IonLabel>

                <IonButton href={item["url"]} color="primary" slot="end">
                  Leer
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
        {/* <IonList>
          {items.map((image, i) => (
            <IonItem key={i}>
              <IonThumbnail slot="start">
                <IonImg src={image.src} />
              </IonThumbnail>
              <IonLabel>{image.text}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonPage>
  );
};

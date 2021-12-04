import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonLabel,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonText,
  IonGrid,
  IonIcon,
} from "@ionic/react";
import { partlySunnyOutline, partlySunnySharp } from "ionicons/icons";
import axios from "axios";

export const ClimaPage: React.FC = () => {
  const [items, setItems] = useState({});
  const [ciudad, setCiudad] = useState("");
  const [fecha, setFecha] = useState("");
  const [temp, setTemp] = useState("");
  const [feelLike, setFeelLike] = useState("");
  const [condition, setCondition] = useState("");
  const [winDir, setWindDir] = useState("");
  const [winKph, setWindKph] = useState("");
  const [humedad, setHumedad] = useState("");
  const [presionMb, setPresionMb] = useState("");
  const [visKm, setVisKm] = useState("");
  const apiKey = "21720835998b4c559bf103309212711";
  const endpoint = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=santiago&aqi=no`;

  const enviarPeticion = () => {
    return axios.get(endpoint).then((response) => {
      setItems(response.data);
      setCiudad(response.data.location.name);
      setFecha(response.data.location.localtime);
      setTemp(response.data.current.temp_c);
      setFeelLike(response.data.current.feellike_c);
      setCondition(response.data.current.condition.text);
      setWindDir(response.data.current.wind_dir);
      setWindKph(response.data.current.wind_kph);
      setHumedad(response.data.current.humidity);
      setPresionMb(response.data.current.pressure_mb);
      setVisKm(response.data.current.vis_km);
      return response.data;
    });
  };

  useEffect(() => {
    if (Object.keys(items).length === 0) {
      enviarPeticion();
    }

    console.log("items", items);
  }, [items]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Clima</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-text-left">
          <IonRow className="ion-justify-content-center">
            {items && (
              <>
                <IonCol color="danger">
                  <IonItem>
                    <IonLabel>
                      <IonText color="danger">
                        <h6>{fecha}</h6>
                      </IonText>
                      <h1>{ciudad}, CL</h1>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </>
            )}
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <h1 margin-left className="">
                <IonIcon
                  color="medium"
                  ios={partlySunnyOutline}
                  md={partlySunnySharp}
                />
                {temp} °C
              </h1>
              <IonText color="dark">
                <h4>
                  feels like {feelLike}°C. {condition}.{" "}
                </h4>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonToolbar color="light">
              <IonRow>
                <IonCol margin-left>
                  <IonText>
                    {winKph} k/h {winDir}{" "}
                  </IonText>
                </IonCol>
                <IonCol margin-left>
                  <IonText>{presionMb}hPa</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>humedad: {humedad}%</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>Visibilidad: {visKm}</IonText>
                </IonCol>
              </IonRow>
            </IonToolbar>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

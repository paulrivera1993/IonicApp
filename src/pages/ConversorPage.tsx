import React, { useEffect, useState } from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonListHeader,
  IonText,
} from "@ionic/react";
import axios from "axios";

export const ConversorPage: React.FC = () => {
  const [moneyOrigin, setMoneyOrigin] = useState("");
  const [moneyTarget, setMoneyTarget] = useState("");
  const [tasas, setTasas] = useState({});
  const [euro, setEuro] = useState({ valor: 0 });
  const [dolar, setDolar] = useState({ valor: 0 });
  const [cantidad, setCantidad] = useState<any | null>(null);
  const [resultado, setResultado] = useState(0);

  // const obtenerResultado = () => {
  //   if (moneyTarget && moneyOrigin && cantidad) {
  //     if (moneyOrigin === "clp" && moneyTarget === "usd") {
  //       resultado:number = cantidad * dolar ;
  //     } else {
  //       resultado = cantidad * euro;
  //     }
  //   }
  //   return null;
  // };
  function procesarResultado(cantidad: number, tasa: number): number {
    return cantidad / tasa;
  }
  function determinarCalculo() {
      if (dolar && euro) {
        if (moneyOrigin === "clp") {
          if (moneyTarget === "usd") {
            setResultado(procesarResultado(cantidad, dolar.valor));
          } else if (moneyTarget === "eur") {
            setResultado(procesarResultado(cantidad, euro.valor));
          } else {
            setResultado(cantidad);
          }
        }
        if (moneyOrigin === "usd") {
          if(moneyTarget === "clp"){
            const tasa = (cantidad * dolar.valor)
            setResultado(tasa)
          }
          if(moneyTarget === "eur"){
            const clp= dolar.valor * cantidad
            const tasa = clp / euro.valor
            setResultado(tasa)
          }
        }
        if(moneyTarget === moneyOrigin){
          setResultado(cantidad)
        }
      }else{
        setResultado(cantidad);
      }
  }

  const swapCurrency = () => {
    setResultado(0);
    determinarCalculo();
    const temp = moneyOrigin;
    setMoneyOrigin(moneyTarget);
    setMoneyTarget(temp);
  };

  useEffect(() => {
    if (Object.keys(tasas).length === 0) {
      axios.get("https://mindicador.cl/api").then((respuesta) => {
        setTasas(respuesta.data);
        setDolar(respuesta.data.dolar);
        setEuro(respuesta.data.euro);
      });
    }
    determinarCalculo();

    console.log("tasas", dolar.valor);
    console.log("cantidad", cantidad);
    console.log("moneyTarget", moneyTarget);
    console.log("moneyOrigin", moneyOrigin);
    console.log("dolar", dolar);
    console.log("euro", euro);
  }, [tasas, moneyOrigin, moneyTarget, cantidad, dolar, euro]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Conversor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonListHeader>
          <IonLabel>Conversor de Divisas</IonLabel>
        </IonListHeader>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Cantidad</IonLabel>
            <IonInput
              type="number"
              value={cantidad}
              onIonChange={(e) => setCantidad(e.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Moneda</IonLabel>
            <IonSelect
              value={moneyOrigin}
              okText="confirmar"
              cancelText="cancelar"
              onIonChange={(e) => setMoneyOrigin(e.detail.value)}
            >
              <IonSelectOption value="clp">Peso Chileno CLP</IonSelectOption>
              <IonSelectOption value="usd">Dolar USD</IonSelectOption>
              <IonSelectOption value="eur">Euro EUR</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton
            onClick={() => swapCurrency()}
            className="ion-margin-top"
            type="submit"
            expand="block"
          >
            Invertir Conversión
          </IonButton>
          <IonItem>
            <IonLabel>Moneda</IonLabel>
            <IonSelect
              value={moneyTarget}
              okText="confirmar"
              cancelText="cancelar"
              onIonChange={(e) => setMoneyTarget(e.detail.value)}
            >
              <IonSelectOption value="clp">Peso Chileno CLP</IonSelectOption>
              <IonSelectOption value="usd">Dolar USD</IonSelectOption>
              <IonSelectOption value="eur">Euro EUR</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <div className="ion-text-center">
          <IonText color="primary">
            <h1>
              {resultado} {moneyTarget.toUpperCase()}
            </h1>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

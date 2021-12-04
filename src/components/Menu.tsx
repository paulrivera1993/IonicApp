import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  homeOutline,
  homeSharp,
  calculatorOutline,
  calculatorSharp,
  partlySunnyOutline,
  partlySunnySharp,
  newspaperOutline,
  newspaperSharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Inicio",
    url: "/page/Inicio",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Clima",
    url: "/page/Clima",
    iosIcon: partlySunnyOutline,
    mdIcon: partlySunnySharp,
  },
  {
    title: "Conversor",
    url: "/page/Conversor",
    iosIcon: calculatorOutline,
    mdIcon: calculatorSharp,
  },
  {
    title: "Noticias",
    url: "/page/noticias",
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Proyecto App</IonListHeader>
          <IonNote>Aplicación para el Proyecto</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

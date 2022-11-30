import React, {
  FC,
  memo,
  useReducer,
  useRef,
  useEffect,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./App.css";
import { Button, Image } from '@salutejs/plasma-ui';
import { headline2} from '@salutejs/plasma-tokens';
import task from './assets/task.png'
import ListItem from "./components/list-item/ListItem";
import {
  isAndroid
} from "react-device-detect";
import { reducer } from "./store";

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(getState)
    //alert(getState)
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  
  return createAssistant({ getState });
};

export const App: FC = memo(() => {
  //const [appState, dispatch] = useReducer(reducer, { notes: [] });
  const list = [
    {
      title: "Сервисы Сбера в одном приложении",
      subtitle: "Информация об инвестициях, страховках и пенсии"
    },
    {
      title: "Вход и оплата в экосистеме по Сбер ID",
      subtitle: "Не нужно вспоминать пароль и вводить номер карты"
    },
    {
      title: "Персональные предложения и скидки",
      subtitle: "Возможность получать скидки от партнёров и индивидуальные условия от банка"
    },
  ]
  const link = isAndroid ? "android-app://ru.sberbankmobile/sberbankid/agreement?servicesCode=25?" :
    "sbolonline://sberbankid/omniconsent?servicesCode=25"
  const link_and = "android-app://ru.sberbankmobile/sberbankid/agreement?servicesCode=25"
  const link_ios = "sbolonline://sberbankid/omniconsent?servicesCode=25"
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);
    //alert(JSON.stringify(assistantRef.current, null, 4));
    console.log(assistantRef.current)
    assistantRef.current.on("data", ({ action }: any) => {
      //alert(action);
      // if (action) {
      //   dispatch(action);
      // }
    });
  }, []);

  return (
    <main className="container">
      <Image
        src={task}
        width="120px"
        height="120px"
        alt="Картинка для примера"
      />
      <h2 style={headline2}>
        Бесплатная услуга
        <br />
        "Удобный доступ"
      </h2>
      <div style={{ display: "flex", flexDirection: "column", }}>
        {
          list.map((item, index) =>
            <ListItem key={index} index={index + 1} title={item.title} subtitle={item.subtitle} />
          )
        }
        
        <Button size="m" view="primary" onClick={()=>{console.log(isAndroid, link)}}>
          <a href={link} android-apk={link_and} target="_self"> Узнать больше и управлять</a>
        </Button>
      </div>
    </main>
  );
});

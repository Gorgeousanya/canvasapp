import React, {
  FC,
  memo,
  useReducer,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./App.css";
import { Button, Image } from '@salutejs/plasma-ui';
import { headline2 } from '@salutejs/plasma-tokens';
import task from './assets/task.png'
import ListItem from "./components/list-item/ListItem";
import {
  isAndroid
} from "react-device-detect";
import { GlobalStyle } from './components/GlobalStyles';
import {
  CHAR_SBER,
  CharacterId,
  AssistantCharacter
} from './types'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


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
  const [character, setCharacter] = useState<CharacterId>(CHAR_SBER);
  const [log, setLog] = useState<string>("");
  const notify = (event: any) => toast(event);
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
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);
    //alert(JSON.stringify(assistantRef.current, null, 4));
    console.log(assistantRef.current)
    assistantRef.current.on("data", ( action : any) => {
      //alert(action);
      // if (action) {
      //   dispatch(action);
      // }
      setLog(JSON.stringify(assistantRef.current))
      handleAssistantDataEvent(action)
    });

    assistantRef.current.on("command", (event) => {
      notify(`command ${JSON.stringify(event)}`);
      setLog(JSON.stringify(event))
          console.log(`AssistantWrapper: _assistant.on(start)`, event);
        });

     assistantRef.current.on("start", () => {
        console.log(`AssistantWrapper: _assistant.on(start)`);
      });
  
    //   assistantRef.current.on("ANSWER_TO_USER", (event) => {
    //     console.log(`AssistantWrapper: _assistant.on(raw)`, event);
    //   });
    
  }, []);

   const handleAssistantDataEventCharacter = (event: any) => {
          console.log('AssistantWrapper.handleAssistantEventCharacter: character.id:', event.character.id);
          //emit('event-character', event.character);
          setCharacter(event.character?.id)
        }

    const handleAssistantDataEventSmartAppData = (event: any) => {
      console.log('AssistantWrapper.handleAssistantEventSmartAppData: event:', event);

      if (event.sub !== undefined) {
        // this.emit('event-sub', event.sub);
        // /*await*/ this._App.handleAssistantSub(event.sub);
      }

      const {action} = event;
      dispatchAssistantAction(action);
    }

    const dispatchAssistantAction = (action: any) => {
      console.log('AssistantWrapper.dispatchAssistantAction:', action)
      notify(`${action.type} ${action.command}`);
      if (!action) return;

      switch (action.command) { //action.type
        case 'add':
          window.location.replace(link);
          break;

        default:
        // console.warn('dispatchAssistantAction: Unknown action.type:', action.type)

      }
    }

   const handleAssistantDataEvent = (event:any) => {
      console.log('AssistantWrapper.handleAssistantDataEvent: event:', event);
      notify(event.type);
      switch (event?.type) {
  
        case "character":
          notify(event.type);
          console.log(event.type)
          handleAssistantDataEventCharacter(event);
          break;
        case "sdk_answer":
          // notify(event.type);
          // console.log("sdk_answer", event);
          handleAssistantDataEventSmartAppData(event);
          break;

        case "smart_app_data":
          console.log(event.type);
          notify(event.type);
          handleAssistantDataEventSmartAppData(event);
          break
  
        default:
          break
      }
      
    }
    
  return (
    <GlobalStyle character={character}>
      <ToastContainer />
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
        <Button size="m" view="primary" onClick={()=>{window.location.replace(link)}}>
          {/* <a href={link} target="_self"> Узнать больше и управлять</a> */}Узнать больше и управлять
        </Button>
        
      </div>
    </main>
    </GlobalStyle>
  );
});

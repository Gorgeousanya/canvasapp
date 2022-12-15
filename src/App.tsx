import React, {
  FC,
  memo,
  useReducer,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import { GlobalStyle } from './components/GlobalStyles';
import {
  CHAR_SBER,
  CharacterId,
  AssistantCharacter,
  SomeBackendMessage
} from './types'
import { reducer } from './store';
import {
  isIOS
} from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};

export const App: FC = memo(() => {
  const [character, setCharacter] = useState<CharacterId>(CHAR_SBER);
  const link = isIOS ? "sbolonline://sberbankid/omniconsent?servicesCode=25" : "android-app://ru.sberbankmobile/sberbankid/agreement?servicesCode=25?"
  
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();
  const notify = (event: any) => toast(event);
  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);
    //alert(JSON.stringify(assistantRef.current, null, 4));
    console.log(assistantRef.current)
    notify(`isIOS ${isIOS} ${link}`);
    assistantRef.current.on("data", (action: any) => {
      // if (action) {
      //   dispatch(action);
      // }
      handleAssistantDataEvent(action)
    });


    assistantRef.current.on("command", (event: any) => {
      notify(`command ${JSON.stringify(event)}`);
      // const {payload} = event;
      dispatchAssistantAction(event?.command);
    })

    assistantRef.current.on("start", () => {
      console.log(`AssistantWrapper: _assistant.on(start)`);
    });

    //   assistantRef.current.on("ANSWER_TO_USER", (event) => {
    //     console.log(`AssistantWrapper: _assistant.on(raw)`, event);
    //   });

  }, []);
  const handleAssistantDataEventSmartAppData = (event: any) => {
    console.log('AssistantWrapper.handleAssistantEventSmartAppData: event:', event);

    const { action } = event;
    dispatchAssistantAction(action);
  }

  const dispatchAssistantAction = (action: any) => {
    notify(`action ${action} `);
    if (!action) return;

    switch (action) { //action.type
      case 'deeplink':
        setTimeout(() => window.location.replace(link), 2000);
        break;

      default:
      // console.warn('dispatchAssistantAction: Unknown action.type:', action.type)
    }
  }

  const handleAssistantDataEvent = (event: any) => {
    console.log('AssistantWrapper.handleAssistantDataEvent: event:', event);
    switch (event?.type) {
      case "character":
        console.log(event.type)
        setCharacter(event.character?.id)
        break;
      case "sdk_answer":
        handleAssistantDataEventSmartAppData(event);
        break;

      case "smart_app_data":
        console.log(event.type);
        handleAssistantDataEventSmartAppData(event);
        break

      default:
        break
    }
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home link={link}/>,
    },
  ]);
  return (
    <GlobalStyle character={character}>
      <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
      </React.StrictMode>
    </GlobalStyle>
  );
});

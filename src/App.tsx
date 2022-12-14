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
import { Profile } from './pages/Profile'
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reducer } from './store';
import {
  isAndroid
} from "react-device-detect";




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
  // const [appState, dispatch] = useReducer(reducer, { notes: [] });
  const [appState, dispatch] = useReducer(reducer, { notes: [], value: '', flag: false });
  const [character, setCharacter] = useState<CharacterId>(CHAR_SBER);
  const notify = (event: any) => toast(event);
  const link = isAndroid ? "android-app://ru.sberbankmobile/sberbankid/agreement?servicesCode=25?" :
  "sbolonline://sberbankid/omniconsent?servicesCode=25"
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();
  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);
    //alert(JSON.stringify(assistantRef.current, null, 4));
    console.log(assistantRef.current)
    assistantRef.current.on("data", (action: any) => {
      // if (action) {
      //   dispatch(action);
      // }
      handleAssistantDataEvent(action)
    });


    assistantRef.current.on("command", (event: any) => {
      //notify(`command ${JSON.stringify(event)}`);
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

  const sendData = (data: string) => {
    console.log("sendData", data)
    assistantRef.current?.sendData(
      { action: { action_id: "front_fill_papers", parameters: { 'snils': data}  } }
    )
  }

  const handleAssistantDataEventSmartAppData = (event: any) => {
    console.log('AssistantWrapper.handleAssistantEventSmartAppData: event:', event);

    if (event.sub !== undefined) {
      // this.emit('event-sub', event.sub);
      // /*await*/ this._App.handleAssistantSub(event.sub);
    }

    const { action } = event;
    dispatchAssistantAction(action);
  }

  const dispatchAssistantAction = (action: any) => {
    // notify(`action ${action} `);
    if (!action) return;

    switch (action) { //action.type
      case 'add':
        //notify("добавить")
        setTimeout(() => window.location.replace(link), 3000);
        break;

      default:
      // console.warn('dispatchAssistantAction: Unknown action.type:', action.type)
    }
  }

  const handleAssistantDataEvent = (event: any) => {
    console.log('AssistantWrapper.handleAssistantDataEvent: event:', event);
    switch (event?.type) {
      case "character":
        // notify(event.type);
        console.log(event.type)
        setCharacter(event.character?.id)
        break;
      case "sdk_answer":
        // notify(event.type);
        handleAssistantDataEventSmartAppData(event);
        break;

      case "smart_app_data":
        console.log(event.type);
        // notify(event.type);
        handleAssistantDataEventSmartAppData(event);
        break

      default:
        break
    }
  }

  const changeValue = (event: any) => {
    dispatch({ type: "change_value", value: event})
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home link={link}/>,
    },
    {
      path: "/profile",
      element: <Profile onClick={sendData} value={appState.value} changeValue={changeValue}/>
    }
  ]);
  return (
    <GlobalStyle character={character}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </GlobalStyle>
  );
});

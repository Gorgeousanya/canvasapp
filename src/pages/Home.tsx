  import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link
  } from "react-router-dom";
  import "./App.css";
  import { Button, Image, Header, ActionButton } from '@salutejs/plasma-ui';
  import { IconPersone } from "@salutejs/plasma-icons";
  import { headline2 } from '@salutejs/plasma-tokens';
  import task from '../assets/task.png'
  import ListItem from "../components/list-item/ListItem";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { link, list } from  '../assets/data'
  
  export default function Home(){
    return (
        <main className="container">
          <Link to={`profile`} style={{ marginLeft: "auto", marginBottom: "16px" }}>
          <Button
            size="s"
            text="Профиль"
            contentRight={<IconPersone />}
            onClick={() => { }}
          ></Button></Link>
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
            <Button
              text="Узнать больше и управлять"
              size="m"
              view="primary"
              onClick={() => { window.location.replace(link) }}
            />
          </div>
        </main>
    );
  };
  
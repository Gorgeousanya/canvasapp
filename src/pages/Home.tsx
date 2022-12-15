import "./App.css";
import { Button, Image } from '@salutejs/plasma-ui';
import { headline2 } from '@salutejs/plasma-tokens';
import task from '../assets/task.png'
import ListItem from "../components/list-item/ListItem";
import 'react-toastify/dist/ReactToastify.css';
import { list } from '../assets/data'

export default function Home(props: any) {
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
        <Button
          text="Узнать больше и управлять"
          size="m"
          view="primary"
          onClick={() => { window.location.replace(props.link) }}
        />
      </div>
    </main>
  );
};

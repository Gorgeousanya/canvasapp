import { Button, Image, Header, TextField } from '@salutejs/plasma-ui';
import { headline2 } from '@salutejs/plasma-tokens';


export default function Profile() {
    return (
        <main className="container">
            <Header
                back={true}
                title="Профиль"
                onBackClick={() => window.location.replace('/')}
            >
                {/* <Button>Header content</Button> */}
            </Header>
            <h2 style={headline2}>
                Заполнение данных
            </h2>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <TextField
                    placeholder="Имя"
                    size="l"
                    style={{marginBottom: "16px"}}
                />
                <Button
                    text="Сохранить"
                    size="m"
                    view="primary"
                    onClick={() => { }}
                />
            </div>
        </main>
    )
}
import { ActionButton, Button, Header, TextField } from '@salutejs/plasma-ui';
import { headline2 } from '@salutejs/plasma-tokens';
import { useState, FC, useReducer } from 'react';
import { reducer } from '../store';
import { IconEdit } from "@salutejs/plasma-icons";

export const Profile = (props: any) => {
    // const [value, setValue] = useState<string>('')
    const [appState, dispatch] = useReducer(reducer, { notes: [], value: '', flag: false });
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
                {!appState.flag ?
                    <TextField
                        placeholder="Имя"
                        size="l"
                        style={{ marginBottom: "16px" }}
                        value={appState.value}
                        onChange={(event) => {
                            dispatch({ type: "change_value", value: event.target.value })
                        }}
                    /> :
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <h2 style={headline2}>{appState.value}</h2>
                        <ActionButton style={{ marginLeft: "auto" }} onClick={() => dispatch({ type: "change_flag", flag: false })}>
                            <IconEdit />
                        </ActionButton>
                    </div>
                }
                <Button
                    text="Сохранить"
                    size="m"
                    view="primary"
                    onClick={
                        () => {
                            props.onClick(appState.value);
                            if (appState.value != "")
                                dispatch({ type: "change_flag", flag: true })
                        }
                    }
                />
            </div>
        </main>
    )
}
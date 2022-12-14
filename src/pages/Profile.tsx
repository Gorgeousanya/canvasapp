import { ActionButton, Button, Header, TextField } from '@salutejs/plasma-ui';
import { headline2 } from '@salutejs/plasma-tokens';
import { IconEdit } from "@salutejs/plasma-icons";
import React, {
    useState,
} from "react";

export const Profile = (props: any) => {
    const [flag, setFlag] = useState<boolean>(false)
    const [status, setStatus] = useState<any>(undefined)
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
                {!flag ?
                    <TextField
                        placeholder="СНИЛС"
                        size="l"
                        style={{ marginBottom: "16px" }}
                        value={props.value}
                        status={status}
                        onChange={(event) => {
                            props.changeValue(event.target.value)
                        }}
                    /> :
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <h2 style={headline2}>{props.value}</h2>
                        <ActionButton style={{ marginLeft: "auto" }} onClick={() => setFlag(false)}>
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
                            if ((props.value.replace(/[^\d]/g, '') != "")&&(props.value.replace(/[^\d]/g, '').length == 11)&&(parseInt(props.value.replace(/[^\d]/g, ''))))
                            {
                                setFlag(true)
                                setStatus(undefined)
                                props.onClick(props.value.replace(/[^\d]/g, ''));
                                props.changeValue(`${props.value.replace(/[^\d]/g, '').slice(0, 3)}-${props.value.replace(/[^\d]/g, '').slice(3, 6)}-${props.value.replace(/[^\d]/g, '').slice(6, 9)} ${props.value.replace(/[^\d]/g, '').slice(-2)}`)
                            }
                            else {
                                setStatus("error")
                            }
                        }
                    }
                />
            </div>
        </main>
    )
}
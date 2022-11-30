export type TListItem = {
    index: number,
    title: string,
    subtitle: string
}

export const CHAR_SBER = 'sber'; // Сбер
export const CHAR_EVA = 'eva';   // Афина
export const CHAR_JOY = 'joy';   // Джой
export type CharacterId = typeof CHAR_SBER
  | typeof CHAR_EVA
  | typeof CHAR_JOY

  interface AssistantEventGeneric {
    type: string
    sdk_meta: {
      mid: string //
                  // "-1"
                  // "1635880800399"
      requestId: any   // undefined
    }
  
  }
  
  export interface AssistantCharacter {
    id: CharacterId
    name: 'Сбер' | 'Афина' | 'Джой'
    gender: 'male' | 'female'
    appeal: 'official' | 'no_official'
  }
  
  interface AssistantEventCharacter extends AssistantEventGeneric {
    type: 'character'
    character: AssistantCharacter
  }

  interface AssistantEventSmartAppData extends AssistantEventGeneric {
    type: 'smart_app_data'
    sub: string     // идентификатор пользователя
                    // "noN0Crr3wgIDB0zPleKresJJBnQWbTybFS96aH/CO1ag1UKZFmqfjY9pgDfQAAv8DJiarMJBCd+OSKUzNTk2jw0W/jbBIC6V/xwQdmSX5cA3bAbhWkZVtK9z3zFc8Mkh3O1nZa/qn3SAagVDNjZIB6p4Z9Wzb0Lm
    user_id: string //
                    // "webdbg_userid_rwe0x9uv3qbmr4sw5uxfc"
    action: any
    //action: "init-user"
    // sdk_meta: {mid: "1635879771615"}
    // sub: "noN0Crr3wgIDB0zPleKresJJBnQWbTybFS96aH/CO1ag1UKZFmqfjY9pgDfQAAv8DJiarMJBCd+OSKUzNTk2jw0W/jbBIC6V/xwQdmSX5cA3bAbhWkZVtK9z3zFc8Mkh3O1nZa/qn3SAagVDNjZIB6p4Z9Wzb0Lm/uzDjpy3qh0="
    // type: "smart_app_data"
    // user_id: "webdbg_userid_rwe0x9uv3qbmr4sw5uxfc"
  }
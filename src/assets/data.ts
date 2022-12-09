import {
    isAndroid
  } from "react-device-detect";

export const link = isAndroid ? "android-app://ru.sberbankmobile/sberbankid/agreement?servicesCode=25?" :
  "sbolonline://sberbankid/omniconsent?servicesCode=25"

export const list = [
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
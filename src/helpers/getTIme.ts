const weekdays = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const getTime = (date: string, isOnlyTime = false) => {
  const today = new Date();
  const messageDate = new Date(date);

  const diff = today.getTime() - messageDate.getTime();

  const hours = diff / 1000 / 3600;
  const days = hours / 24;

  if (hours < 24 || isOnlyTime)
    return `${messageDate.getHours()}:${messageDate.getMinutes() > 9 ? messageDate.getMinutes() : `0${messageDate.getMinutes()}`}`;

  if (days < 7) {
    return weekdays[messageDate.getDay()];
  }

  return `${messageDate.getDate()}.${messageDate.getMonth() + 1 > 9 ? messageDate.getMonth() + 1 : `0${messageDate.getMonth() + 1}`}.${messageDate.getFullYear()}`;
};

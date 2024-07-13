export const getTime = (date: string) => {
  const messageDate = new Date(date);

  return `${messageDate.getHours()}:${messageDate.getMinutes() > 9 ? messageDate.getMinutes() : `0${messageDate.getMinutes()}`}`;
};

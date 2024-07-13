import { Message } from '@/types';

const monphts = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const sortByDate = (messages: Message[]): Record<string, Message[]> => {
  return messages.reduce((acc: Record<string, Message[]>, message) => {
    const date = new Date(message.createdAt);
    const dayAndMonth = `${date.getDate()} ${monphts[date.getMonth()]}`;
    if (acc[dayAndMonth] === undefined) {
      acc[dayAndMonth] = [message];
    } else {
      acc[dayAndMonth].push(message);
    }
    return acc;
  }, {});
};

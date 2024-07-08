import { Avatar, AvatarFallback, Typography } from '../ui';

const ChatCard = () => {
  return (
    <div className="flex p-2 gap-2 transition-all cursor-pointer hover:bg-slate-200 border-b-[1px] border-b-slate-300">
      <Avatar className="w-16 h-16">
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden">
        <Typography variant="p" className="font-medium text-nowrap">
          Name User
        </Typography>
        <Typography
          variant="p"
          className="overflow-hidden text-ellipsis text-nowrap"
        >
          last message 123 1 123 23 1313 1 32
        </Typography>
      </div>
    </div>
  );
};

export { ChatCard };

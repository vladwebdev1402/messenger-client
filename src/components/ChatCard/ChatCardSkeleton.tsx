import { Avatar, Skeleton, Typography } from '../ui';

const ChatCardSkeleton = () => {
  return (
    <div className="flex p-2 gap-2 transition-all cursor-pointer hover:bg-slate-200 border-b-[1px] border-b-slate-300">
      <Skeleton className="rounded-full">
        <Avatar className="w-16 h-16 relative overflow-visible" />
      </Skeleton>

      <div className="overflow-hidden w-full">
        <Skeleton className="inline-block">
          <Typography variant="p" className="font-medium text-nowrap">
            Login Login
          </Typography>
        </Skeleton>
        <Typography
          variant="p"
          className="overflow-hidden text-ellipsis text-nowrap mt-2"
        >
          <>
            <Skeleton className="inline-block">Message Message</Skeleton>
            <Skeleton className="float-right">
              <span className="text-xs float-right pl-2 text-end mt-3 font-medium">
                10:10
              </span>
            </Skeleton>
          </>
        </Typography>
      </div>
    </div>
  );
};

export { ChatCardSkeleton };

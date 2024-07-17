import { Card, CardDescription, Skeleton } from '../ui';

const MessageCardSkeleton = () => {
  return (
    <Card className={'self-start max-w-[560px] p-2'}>
      <Skeleton className="inline-block">
        <span className="font-medium text-sm">Auth message</span>
      </Skeleton>
      <div className="p-0">
        <CardDescription className="text-primary break-words">
          <Skeleton className="inline-block mt-2">
            text message text message text message
          </Skeleton>
          <Skeleton className="inline-block ml-2 float-right mt-2">
            <span className="text-xs pl-2 text-end font-medium">10:10</span>
          </Skeleton>
        </CardDescription>
      </div>
    </Card>
  );
};

export { MessageCardSkeleton };

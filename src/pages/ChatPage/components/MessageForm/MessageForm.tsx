import { FC, KeyboardEvent } from 'react';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from '@/components';

const messageScheme = z.object({
  message: z.string().min(1),
});

type Props = {
  onSubmit: (data: { message: string }) => void;
};

const MessageForm: FC<Props> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof messageScheme>>({
    resolver: zodResolver(messageScheme),
  });

  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const data = form.getValues();

      if (data.message.length > 1) {
        handleSubmitMessage(data);
      }
    }
  };

  const handleSubmitMessage = (data: { message: string }) => {
    form.reset({
      message: '',
    });
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitMessage)}
        className="flex gap-2 w-full p-2"
        onKeyDown={handleKeyPress}
      >
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Введите сообщение..."
                  {...field}
                  autoComplete="off"
                  className="resize-none h-[70px] border-0 focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          className="block h-full border-none self-center"
        >
          <Send />
        </Button>
      </form>
    </Form>
  );
};

export { MessageForm };

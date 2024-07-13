import { FC } from 'react';
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
                  className="resize-none h-[70px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="outline">
          <Send />
        </Button>
      </form>
    </Form>
  );
};

export { MessageForm };

import { UseMutationOptions } from '@tanstack/react-query';

export type MutationOptions<Response, Params> = UseMutationOptions<
  Response,
  Error,
  Params
>;

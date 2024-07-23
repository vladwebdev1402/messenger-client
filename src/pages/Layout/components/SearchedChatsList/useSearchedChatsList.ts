import { useGetChats, useGetSearchUsersByLogin } from '@/api';

export const useSearchedChatsList = (searchLogin: string) => {
  const { data: myChats } = useGetChats();
  const { isFetching: searchFetching, data: searchData } =
    useGetSearchUsersByLogin(searchLogin);

  const searchResult = {
    myChats:
      myChats?.filter((chat) =>
        chat.user.login.toLowerCase().includes(searchLogin.toLocaleLowerCase()),
      ) ?? [],
    searchChats:
      searchData?.filter(
        (user) =>
          !myChats?.some((chat) =>
            chat.user.login
              .toLowerCase()
              .includes(user.login.toLocaleLowerCase()),
          ),
      ) ?? [],
  };

  return {
    searchFetching,
    searchResult,
  };
};

import useSWR from "swr";

import fetcher from "@/libs/fetcher";

// This hook able to imagine similar like Redux
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;

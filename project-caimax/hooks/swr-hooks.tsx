import useSWR from 'swr';

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

export function useUserById(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users?id=${id}`,
    fetcher,
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutateUser: mutate,
  };
}

export function useUsers(query?: string, page?: number) {
  if (!page && !query) {
    const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);
    return {
      users: data,
      isLoading,
      isError: error,
      mutateUsers: mutate,
    };
  } else if (page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/users?page=${page}`,
      fetcher,
    );
    return {
      users: data,
      isLoading,
      isError: error,
      mutateUsers: mutate,
    };
  } else if (query && !page) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/users?query=${query}`,
      fetcher,
    );
    return {
      users: data,
      isLoading,
      isError: error,
      mutateUsers: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/users?page=${page}&query=${query}`,
      fetcher,
    );
    return {
      users: data,
      isLoading,
      isError: error,
      mutateUsers: mutate,
    };
  }
}

export function useTotalUsers() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/count/users',
    fetcher,
  );

  return {
    totalUsers: data,
    isLoading,
    isError: error,
    mutateTotalUsers: mutate,
  };
}

export function useTotalUsersPages(query?: string) {
  if (!query) {
    const { data, error, isLoading, mutate } = useSWR(
      '/api/count/users/pages',
      fetcher,
    );
    return {
      totalPages: data,
      isLoading,
      isError: error,
      mutateTotalPages: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/count/users/pages?query=${query}`,
      fetcher,
    );
    return {
      totalPages: data,
      isLoading,
      isError: error,
      mutateTotalPages: mutate,
    };
  }
}

export function useAccessActivity(
  query?: string,
  page?: number,
  userId?: string,
) {
  if (userId && !page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/accessActivity?id=${userId}`,
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  } else if (userId && page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/accessActivity?id=${userId}&page=${page}`,
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  } else if (userId && query && !page) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/accessActivity?id=${userId}&query=${query}`,
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  } else if (userId && page && query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/accessActivity/users?id=${userId}&page=${page}&query=${query}`,
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  } else if (!page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      '/api/accessActivity',
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  } else if (page && !query) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/accessActivity?page=${page}`,
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  } else if (query && !page) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/accessActivity?query=${query}`,
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/accessActivity?page=${page}&query=${query}`,
      fetcher,
    );
    return {
      accessActivity: data,
      isLoading,
      isError: error,
      mutateAccessActivity: mutate,
    };
  }
}
export function useTotalAccessActivity() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/count/accessActivity',
    fetcher,
  );
  return {
    totalAccessActivity: data,
    isLoading,
    isError: error,
    mutateTotalAccessActivity: mutate,
  };
}
export function useTotalAccessActivityPages(query?: string) {
  if (!query) {
    const { data, error, isLoading, mutate } = useSWR(
      '/api/count/accessActivity/pages',
      fetcher,
    );
    return {
      totalPages: data,
      isLoading,
      isError: error,
      mutateTotalPages: mutate,
    };
  } else {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/count/accessActivity/pages?query=${query}`,
      fetcher,
    );
    return {
      totalPages: data,
      isLoading,
      isError: error,
      mutateTotalPages: mutate,
    };
  }
}

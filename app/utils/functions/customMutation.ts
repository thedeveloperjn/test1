import { useState, useEffect, useCallback } from 'react';


// Define the shape of the MutationConfig object
interface MutationConfig<TData, TError, TVariables> {
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
}

// Define the shape of the QueryConfig object
interface QueryConfig<TData, TError> {
    enabled?: boolean;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
}

// Define the return type of the useMutation hook
interface UseMutationResult<TData, TError, TVariables> {
    mutate: (variables: TVariables) => void;
    data: TData | undefined;
    error: TError | undefined;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}

// Define the return type of the useQuery hook
interface UseQueryResult<TData, TError> {
    data: TData | undefined;
    error: TError | undefined;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    refetch: () => void;
}

function useCustomMutation<TData, TError, TVariables>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    config?: MutationConfig<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables> {
    const [data, setData] = useState<TData | undefined>(undefined);
    const [error, setError] = useState<TError | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const mutate = useCallback(async (variables: TVariables) => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        setData(undefined);
        setError(undefined);

        try {
            const result = await mutationFn(variables);
            setData(result);
            setIsSuccess(true);
            if (config?.onSuccess) {
                config.onSuccess(result);
            }
        } catch (err) {
            setIsError(true);
            setError(err as TError);
            if (config?.onError) {
                config.onError(err as TError);
            }
        } finally {
            setIsLoading(false);
        }
    }, [mutationFn, config]);

    return { mutate, data, error, isLoading, isError, isSuccess };
}

function useCustomQuery<TData, TError>(
    queryKey: string,
    queryFn: () => Promise<TData>,
    config?: QueryConfig<TData, TError>
): UseQueryResult<TData, TError> {
    const [data, setData] = useState<TData | undefined>(undefined);
    const [error, setError] = useState<TError | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        setData(undefined);
        setError(undefined);

        try {
            const result = await queryFn();
            setData(result);
            setIsSuccess(true);
            if (config?.onSuccess) {
                config.onSuccess(result);
            }
        } catch (err) {
            setIsError(true);
            setError(err as TError);
            if (config?.onError) {
                config.onError(err as TError);
            }
        } finally {
            setIsLoading(false);
        }
    }, [queryFn, config]);

    useEffect(() => {
        if (config?.enabled !== false) {
            fetchData();
        }
    }, [fetchData, config?.enabled]);

    return { data, error, isLoading, isError, isSuccess, refetch: fetchData };
}

export { useCustomMutation, useCustomQuery };

import { changeHomeLoadingState } from '../store/action/loading'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

import { useEffect } from 'react'

export function useQueryWithLoading<TData, TError>(
    key: string[],
    queryFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {

    const query = useQuery<TData, TError>({
        queryKey: key,
        queryFn: queryFn,
        retry: true,
        ...options,
    })

    useEffect(() => {
        if (query.isLoading) {
            changeHomeLoadingState(true)
        } else {
            changeHomeLoadingState(false)
        }
    }, [query.isLoading, changeHomeLoadingState])

    return query
}


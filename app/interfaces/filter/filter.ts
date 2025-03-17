export interface FilterProps {
    type: string | null,
    value: string | string[] | number | number[] | null
}


export interface FilterSliceProps {
    filters: FilterProps[];
    sortBy: string | null
    isLoading: { state: boolean; id: string };
    error: any;
    changeFilter?: (filter: FilterProps) => void;
    changeSortBy?: (sortBy: string) => void;
    clearFilter?: () => void;


}
import { useLoadingSlice } from "../slice/loading";

export const changeHomeLoadingState = (state: boolean) => useLoadingSlice.setState({ isHomeLoading: state })



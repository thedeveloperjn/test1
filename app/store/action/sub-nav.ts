import { useSubNavSlice } from "../slice/nav-bar";


export const changeSubNavCategory = (category: string | null) => useSubNavSlice.setState({ category: category })



import { useAuthSlice } from "./slice/auth";
import { useCartSlice } from "./slice/cart";

// const useAppStore = create<StoreInterface>()(
//     (set, get, store) => ({
//         // ...useCartSlice(set, get, store),
//         ...useLoginModalSlice(set, get, store),
//         // ...useAuthSlice(set, get, store)
//     })
// );

export { useAuthSlice, useCartSlice };

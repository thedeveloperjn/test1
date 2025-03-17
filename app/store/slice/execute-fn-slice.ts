// store/useFunctionExecutor.ts
import { create } from 'zustand';

type FunctionExecutorState = {
    storedFunction: (() => void) | null; // State to store the function
    storeFunction: (fn: () => void) => void; // Action to store the function
    executeStoredFunction: () => void; // Action to execute the stored function
};

const useFunctionExecutor = create<FunctionExecutorState>((set) => ({
    storedFunction: null, // Initialize with null

    // Action to store a function
    storeFunction: (fn) => set({ storedFunction: fn }),

    // Action to execute the stored function
    executeStoredFunction: () => set((state) => {
        if (state.storedFunction) {
            state.storedFunction(); // Execute the stored function
        }
        return state; // Return the current state
    }),
}));

export default useFunctionExecutor;

import { z } from "zod";

export const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    // lastName: z.string().min(2, {
    //     message: "Last name must be at least 2 characters.",
    // }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 digits.",
    }),
    address: z.string().min(5, {
        message: "Please enter a valid address.",
    }),
    city: z.string().min(2, {
        message: "Please enter a valid city name",
    }),
    state: z.string().min(2, {
        message: "Please enter a valid state name",
    }),
    zipCode: z.string()
        .min(6, { message: "Please enter a valid ZIP Code" })
        .max(6, { message: "Please enter a valid ZIP Code" }),

    paymentMode: z.enum(["online-payment", "cod"], {
        required_error: "Please select a payment method.",
    }),
});

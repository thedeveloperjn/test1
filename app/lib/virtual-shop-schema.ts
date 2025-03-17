import { z } from "zod"

export const personalInfoSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    contactNo: z.string().min(10, { message: "Please enter a valid contact number" }),
    emailId: z.string().email({ message: "Please enter a valid email address" }),
    city: z.string().min(2, { message: "Please enter a valid city" }),
})

export const virtualShopSchema = personalInfoSchema.extend({
    categories: z.array(z.string()).min(1, { message: "Please select at least one category" }),
    priceRange: z.string().min(1, { message: "Please select a price range" }),
    remarks: z.string().optional(),
    preferedDate: z.string().min(1, { message: "Please select a preferred date" }),
    timeSlot: z.string().min(1, { message: "Please select a preferred time" }),
})

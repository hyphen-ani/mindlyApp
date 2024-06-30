import {z} from 'zod'

export const signUpSchema = z.object({
    username: z
    .string()
    .min(6, "Username must be atleast 6 Characters")
    .max(20, "Username must be no more than 20 Characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
    
    email: z.string().email({
        message: "Invalid Email Address"
    }),
    password: z.string().min(8, {
        message: "Password Should Be Atleast 8 Characters Long"
    })
})
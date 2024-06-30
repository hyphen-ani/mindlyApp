import {z} from 'zod'

export const messageSchema = z.object({
    content: z
    .string()
    .min(4, {
        message: "Content Must Be Atleast Of 4 Characters"
    })
    .max(400, {
        message: "Content Must Be No More Than 400 Characters"
    })
})
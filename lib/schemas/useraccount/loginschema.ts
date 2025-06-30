import { z } from "zod";


export const loginSchema = z.object({

    email: z.string().email("Enter a valid Email"),
    password: z.string().min(8, "Password must be at least 8 characters.").max(100)
});


export type LoginFormValues = z.infer<typeof loginSchema>;
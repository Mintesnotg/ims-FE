import { z } from "zod";


export const loginSchema = z.object({

    email:    z.string()
    .nonempty('Email is required')
    .email('Enter a valid email address'),
    password:z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be 100 characters or fewer'),
});


export type LoginFormValues = z.infer<typeof loginSchema>;
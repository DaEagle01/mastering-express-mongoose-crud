import { z } from 'zod'

export const OrderValidationSchema = z.object({
  productName: z.string().min(1, { message: 'Product name is required.' }),
  price: z.number().positive({ message: 'Product price must be positive.' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Product quantity must be a positive integer.' }),
})

export const UserValidationSchema = z.object({
  userId: z
    .number()
    .int()
    .positive({ message: 'UserId must be a positive integer.' }),
  username: z.string().min(5, {
    message: 'Username is required and must be at least 5 characters long.',
  }),
  password: z.string().min(6, {
    message: 'Password is required and must be at least 6 characters long.',
  }),
  fullName: z
    .object({
      firstName: z.string().min(1, { message: 'First name is required.' }),
      lastName: z.string().min(1, { message: 'Last name is required.' }),
    })
    .refine((data) => data.firstName && data.lastName, {
      message: 'Full name is required.',
    }),
  age: z
    .number()
    .int()
    .positive({ message: 'Age must be a positive integer.' }),
  email: z
    .string()
    .email({ message: 'This email is not valid.' })
    .min(5, { message: 'Email is required.' }),
  isActive: z.boolean().default(true),
  hobbies: z
    .array(z.string())
    .refine((data) => data.length > 0, { message: 'Hobbies are required.' }),
  address: z
    .object({
      street: z.string().min(1, { message: 'Street name is required.' }),
      city: z.string().min(1, { message: 'City name is required.' }),
      country: z.string().min(1, { message: 'Country name is required.' }),
    })
    .refine((data) => data.street && data.city && data.country, {
      message: 'Address is required.',
    }),
  orders: z.array(OrderValidationSchema).default([]),
})

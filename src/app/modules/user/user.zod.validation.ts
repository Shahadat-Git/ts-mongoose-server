import { z } from 'zod';
const fullnameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Please provide a valid first name' }),
  lastName: z.string().min(1, { message: 'Please provide a valid last name' }),
});

const addressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Please enter a valid street name' }),
  city: z.string().min(1, { message: 'Please enter a valid city name' }),
  country: z.string().min(1, { message: 'Please enter a valid country name' }),
});

export const ordersValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: 'Please provide a valid product name' }),
  price: z.number().min(0, { message: 'Price should be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity should be at least 1' }),
});

const userValidationSchema = z.object({
  userId: z.number().int({ message: 'User ID should be an integer' }),
  username: z.string().min(1, { message: 'Please enter a valid username' }),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters long' }),
  fullName: fullnameValidationSchema,
  age: z.number().min(0, { message: 'Age should be a non-negative number' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean().default(true),
  hobbies: z.array(
    z.string().min(1, { message: 'Please enter a valid hobby' }),
  ),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

export default userValidationSchema;

import { Model } from 'mongoose'

interface IOrder {
  productName: string
  price: number
  quantity: number
}

interface IUser {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders?: IOrder[]
}

interface UserModel extends Model<IUser> {
  getUserByUserId(id: string): Promise<IUser | null>
}

export { IUser, IOrder, UserModel }

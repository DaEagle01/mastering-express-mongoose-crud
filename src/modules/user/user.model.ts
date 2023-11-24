import { Schema, model } from 'mongoose'
import { IOrder, IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const orderSchema = new Schema<IOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required.'],
  },
})

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'UserId is required.'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'User name is required.'],
  },
  password: {
    type: String,
    required: [true, 'User name is required.'],
  },
  fullName: {
    type: {
      firstName: {
        type: String,
        required: [true, 'First name is required.'],
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required.'],
      },
    },
    required: [true, 'Full name is required.'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
  },
  isActive: {
    type: Boolean,
    default: true,
    required: [true, 'Activity status is required.'],
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies are required.'],
  },
  address: {
    type: {
      street: {
        type: String,
        required: [true, 'Street name is required.'],
      },
      city: {
        type: String,
        required: [true, 'City name is required.'],
      },
      country: {
        type: String,
        required: [true, 'Country name is required.'],
      },
    },
    required: [true, 'Address is required.'],
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
})

userSchema.statics.getUserByUserId = async (userId: string) => {
  const user = await User.findOne({ userId }, { password: 0 })
  return user
}

userSchema.pre('save', async function (next) {
  // here this refers to the document
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds),
  )
  next()
})

userSchema.post('save', function (user, next) {
  user.password = ''
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)

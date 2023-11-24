import { IOrder, IUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (userData: IUser) => {
  const result = await User.create(userData)
  return result
}

const getAllSUserFromDB = async () => {
  const result = await User.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
  )
  return result
}

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.getUserByUserId(userId)
  return result
}

const updateUserFromDB = async (userId: string, userData: IUser) => {
  const result = await User.findOneAndUpdate({ userId }, userData, {
    projection: { password: 0 },
    new: true,
    runValidators: true,
  })
  return result
}

const deleteUserFromDB = async (userId: string) => {
  const result = await User.findOneAndDelete({ userId })
  return result
}

const addProductToOrder = async (userId: string, orderData: IOrder) => {
  const result = await User.findOneAndUpdate(
    { userId },
    {
      $push: { orders: orderData },
    },
  )
  return result
}

const getAllOrdersByUser = async (userId: string) => {
  const result = await User.findOne({ userId }, { _id: 0, orders: 1 })
  return result
}

const getTotalOrderPriceByUser = async (userId: string) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: Number(userId),
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: '$_id',
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ])
  return result[0]
}

export const UserServices = {
  createUserIntoDB,
  getAllSUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addProductToOrder,
  getAllOrdersByUser,
  getTotalOrderPriceByUser,
}

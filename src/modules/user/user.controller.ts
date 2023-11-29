import { Request, Response } from 'express'
import { OrderValidationSchema, UserValidationSchema } from './user.validation'
import { UserServices } from './user.services'
import { User } from './user.model'

const userNotFoundStatus = (res: Response) => {
  return res.status(500).json({
    success: false,
    message: 'User not found',
    error: {
      code: 404,
      description: 'User not found!',
    },
  })
}

const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = UserValidationSchema.parse(req.body)

    const result = await UserServices.createUserIntoDB(validatedData)

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not created successfully.',
      error: {
        code: 404,
        description: error.message,
      },
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllSUserFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User fetching was not successful.',
      error: {
        code: 404,
        description: error.message,
      },
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await UserServices.getSingleUserFromDB(userId)

    if (!result) {
      userNotFoundStatus(res)
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const validatedData = UserValidationSchema.parse(req.body)

    const user = await User.getUserByUserId(userId)

    if (user) {
      const result = await UserServices.updateUserFromDB(userId, validatedData)
      res.status(201).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      })
    } else {
      userNotFoundStatus(res)
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not updated successfully.',
      error: {
        code: 404,
        description: error.message,
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User.getUserByUserId(userId)

    if (user) {
      await UserServices.deleteUserFromDB(userId)

      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      })
    } else {
      userNotFoundStatus(res)
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User deleting was not successful.',
      error: {
        code: 404,
        description: error.message,
      },
    })
  }
}

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const validatedData = OrderValidationSchema.parse(req.body)

    const user = await User.getUserByUserId(userId)

    if (user) {
      await UserServices.addProductToOrder(userId, validatedData)
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    } else {
      userNotFoundStatus(res)
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Order not placed successfully.',
      error: {
        code: 404,
        description: error.message,
      },
    })
  }
}

const getAllOrdersByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User.getUserByUserId(userId)

    if (user) {
      const result = await UserServices.getAllOrdersByUser(userId)

      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      })
    } else {
      userNotFoundStatus(res)
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Order fetching was not successful.',
      error: {
        code: 404,
        description: error.message,
      },
    })
  }
}

const getTotalOrderPriceByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User.getUserByUserId(userId)

    if (user) {
      const result = await UserServices.getTotalOrderPriceByUser(userId)

      res.status(200).json({
        success: true,
        message: result
          ? 'Total price calculated successfully!'
          : 'No orders placed yet.',
        data: result,
      })
    } else {
      userNotFoundStatus(res)
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Total price calculation was not successful.',
      error: {
        code: 404,
        description: error.message,
      },
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addProductToOrder,
  getAllOrdersByUser,
  getTotalOrderPriceByUser,
}

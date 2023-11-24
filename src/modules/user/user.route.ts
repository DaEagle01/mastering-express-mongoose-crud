import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/', UserControllers.createUser)

router.get('/', UserControllers.getAllUsers)

router.get('/:userId', UserControllers.getSingleUser)

router.put('/:userId', UserControllers.updateUser)

router.delete('/:userId', UserControllers.deleteUser)

router.put('/:userId/orders', UserControllers.addProductToOrder)

router.get('/:userId/orders', UserControllers.getAllOrdersByUser)

router.get(
  '/:userId/orders/total-price',
  UserControllers.getTotalOrderPriceByUser,
)

export const UserRoutes = router

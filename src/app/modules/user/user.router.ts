import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.put('/users/:userId', UserControllers.updateSingleUser);
router.delete('/users/:userId', UserControllers.deleteSingleUser);
router.put('/users/:userId/orders', UserControllers.addOrder);
router.get('/users/:userId/orders', UserControllers.getOrders);
router.get(
  '/users/:userId/orders/total-price',
  UserControllers.calculateTotalOrders,
);

export const UserRouter = router;

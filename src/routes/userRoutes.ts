import express from 'express';
import { getAllUsers, getUserByEmailAndPassword, createUser, updateUser, deleteUser, patchUser } from '../controllers/userController';

const router = express.Router();

// Rutas CRUD para usuarios
// router.get('/users', getAllUsers);
router.get('/users', getUserByEmailAndPassword);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', patchUser);

export default router;

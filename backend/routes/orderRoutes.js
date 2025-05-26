const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

// All order routes require authentication
router.use(protect);

// User routes
router.post('/', orderController.createOrder);
router.get('/myorders', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/cancel', orderController.cancelOrder);

// Admin routes
router.get('/', admin, orderController.getAllOrders);
router.put('/:id/status', admin, orderController.updateOrderStatus);

module.exports = router;

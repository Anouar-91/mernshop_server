import Order from '../models/orderModel'
import asyncHandler from "express-async-handler"

// @desc Create new order
// @route GET /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items found');
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingAddress,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})
// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }


})

export{
    addOrderItems,
    getOrderById
}
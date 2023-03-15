const models = require('../models/index');

export const OrderSave = async (req, res) => {
    const {customer_id} = req.body;
    try {
        const order = models.orders.create({
            customer_id : customer_id,
            status: true
        }).then(response => {
            if (order) {
                res.status(201).json(response.id);
            }
        });
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}

export const OrderItemSave = async (req, res) => {
    const orderItem = req.body;
    try {
        for (let i = 0; i < orderItem.length; i++) {
            const order_item = models.order_items.create({
                order_id: orderItem[i].order_id,
                product_id: orderItem[i].product_id,
                price: orderItem[i].price, 
            });
        }
            res.status(201).json({
                'status': 'success',
                'messages': "successful order"
            });
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}
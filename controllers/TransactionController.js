const models = require('../models/index');

export const TransactionGetAll = async(req, res) => {
    try {
        const transaction = await models.orders.findAll({
            attributes: ["id","customer_id","status"], 
            include: [
                {
                    model: models.order_items,
                    attributes: ["order_id","product_id","price"],
                    include: [
                        {
                            model: models.products,
                            attributes: ["id","name","price"],
                        }
                    ] 
                },
            ],
        });

        if (transaction) {
            res.status(200).json({
                'status': 'success',
                'data': transaction
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'message': err.message
        })
    }
}

export const TransactionGetId = async(req, res) => {
    const orderId = req.params.id;
    try {
        const transaction = await models.orders.findByPk(orderId,{
            attributes: ["id","customer_id","status"], 
            include: [
                {
                    model: models.order_items,
                    attributes: ["order_id","product_id","price"],
                    include: [
                        {
                            model: models.products,
                            attributes: ["id","name","price"],
                        }
                    ] 
                },
            ],
        });

        if (transaction) {
            res.status(200).json({
                'status': 'success',
                'data': transaction
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'message': err.message
        })
    }
}

export const TransactionDelete = async (req, res) => {
    try{
        const id = req.params.id
        const order = models.orders.destroy({
            where: {
                id: id
            }
        }).then(() => {
            models.order_items.destroy({
                where: {
                    order_id: id
                }
            })
        })

        if (order) {
            res.status(200).json({
                'status': 'success',
                'messages': 'Product succesfuly deleted'
            })
        }

    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}
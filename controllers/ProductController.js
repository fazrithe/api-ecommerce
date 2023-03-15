const models = require('../models/index');

export const ProductSave = async (req, res) => {
    const {name, merchant_id, price, status} = req.body;
    try {
        const product = await models.products.create({
            name: name,
            merchant_id: merchant_id,
            price: price,
            status: status
        });
        if (product) {
            res.status(201).json({
                'status': 'success',
                'messages': 'Successful product has been saved',
                'data': product
            });
        }
    } catch(err){
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}

export const ProductGetAll = async (req, res) => {
    try {
        const products = await models.products.findAll({});

        if (products.length != 0) {
            res.status(200).json({
                'status': 'success',
                'messages': '',
                'data': products
            });
        } else {
            res.status(204).json({
                'status': 'EMPTY',
                'data': {}
            });
        }
    } catch(err){
        res.status(400).json({
            'status': 'ERROR',
            'messages': 'Internal server error'
        });
    }
}

export const ProductUpdate = async (req, res) => {
    const {name, merchant_id, price, status} = req.body;
    try {
        const id = req.params.id
        const product = models.products.update({
            name: name,
            merchant_id: merchant_id,
            price: price,
            status: status
        }, {
            where: {
                id: id
            }
        })

        if (product) {
            res.status(200).json({
                'status': 'success',
                'message': 'Product succesfully modified',
                'data': product
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}

export const ProductDelete = async (res, req) => {
    try {
        const id = req.params.id
        const product = models.products.destroy({
            where: {
                id: id
            }
        })

        if (product) {
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
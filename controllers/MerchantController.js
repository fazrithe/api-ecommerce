const models = require('../models/index');

export const MerchantSave = async (req, res) => {
    const { merchant_name, admin_id } = req.body;
    try {
        const merchant = await models.merchants.create({
            merchant_name: merchant_name,
            admin_id: admin_id,
        });
        if (merchant) {
          res.status(201).json({
            'status': 'success',
            'messages': 'Successful merchant has been saved',
            'data': merchant
          });
        }
    }catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        });
    }
}

export const MerchantGetAll = async (req, res) => {
    try {
        const merchants = await models.merchants.findAll({});
        
        if (merchants.length !== 0) {
            res.status(200).json({
            'status': 'success',
            'messages': '',
            'data': merchants
          });
        } else {
            res.status(204).json({
            'status': 'EMPTY',
            'messages': 'Data is empty',
            'data': {} 
          });
        }
      } catch (err) {
        res.status(500).json({
          'status': 'ERROR',
          'messages': 'Internal Server Error'
        })
      }
}

export const MerchantUpdate = async (req, res) => {
    const {merchant_name, admin_id} = req.body;
    try {
        const id = req.params.id
        const merchant = models.merchants.update({
            merchant_name: merchant_name,
            admin_id: admin_id
        }, {
            where: {
                id: id
            }
        })

        if(merchant) {
            res.status(200).json({
                'status': 'success',
                'message': 'Merchant successfully modified'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}

export const MerchantDelete = async (req, res) => {
    try {
        const id = req.params.id
        const merchant = models.merchants.destroy({
            where: {
                id: id
            }
        })

        if (merchant) {
            res.status(200).json({
                'status': 'success',
                'messages': 'Merchant successfuly deleted'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}
const models = require('../models/index');

export const CustomerGetAll = async (req, res) => {
    try {
        const customers = await models.customers.findAll({});
        
        if (customers.length !== 0) {
          res.status(201).json({
            'status': 'success',
            'messages': '',
            'data': customers
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

export const CustomerProfile = async (req, res) => {
    const customerId = req.params.id
    try {
      const customer = await models.customers.findByPk(customerId,{
        attributes: ["id","fullname","phonenumber","email"] 
      });

      if (customer) {
        res.status(200).json({
          'status': 'success',
          'data': customer
        });
      }
    } catch(err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message
      })
    }
}
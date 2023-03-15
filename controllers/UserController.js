import bcrypt from "bcrypt";
const models = require('../models/index');

export const UserSave = async (req, res) => {
    const { fullname, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const user = await models.users.create({
            fullname: fullname,
            email: email,
            password: hashPassword
        });
        if (user) {
          res.status(201).json({
            'status': 'success',
            'messages': 'successful registration',
            'data': user
          });
        }
    }catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        });
    }
}

export const UserGetAll = async (req, res) => {
    try {
        const users = await models.users.findAll({});
        
        if (users.length !== 0) {
          res.status(201).json({
            'status': 'success',
            'messages': '',
            'data': users
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

export const UserUpdate = async (req, res) => {
    const { fullname, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const id = req.params.id
        const user = models.users.update({
            fullname: fullname,
            email: email,
            password: hashPassword
        }, {
          where: {
            id: id
          }
        })
    
        if (user) {
          res.status(201).json({
            'status': 'success',
            'messages': 'User successfully modified'
          })
        }
      } catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        })
      }
}

export const UserDelete = async (req, res) => {
    try {
        const id = req.params.id
        const user = models.users.destroy({
          where: {
            id: id
          }
        })
    
        if (user) {
          res.status(201).json({
            'status': 'success',
            'messages': 'User successfully deleted'
          })
        }
      } catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        })
      }
}
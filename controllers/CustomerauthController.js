import bcrypt from "bcrypt";
const models = require('../models/index');
import jwt from "jsonwebtoken";

export const CustomerRegister = async(req, res) => {
    const { fullname, phonenumber, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const customer = await models.customers.create({
            fullname: fullname,
            phonenumber: phonenumber,
            email: email,
            password: hashPassword
        });
        if (customer) {
          res.status(201).json({
            'status': 'OK',
            'messages': 'successful registration',
            'data': customer
          });
        }
      } catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        });
      }
}

export const CustomerLogin = async(req, res) => {
    try {
        const customer = await models.customers.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, customer[0].password);
        if(!match) 
        return res.status(404).json({
            'status': 'fail',
            'messages': "Passowrd Wrong"
        });
        const customerId = customer[0].id;
        const fullname = customer[0].fullname;
        const phonenumber = customer[0].phonenumber;
        const email = customer[0].email;
        const accessToken = jwt.sign({customerId, fullname, phonenumber, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({customerId, fullname, phonenumber, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await models.customers.update({token: refreshToken},{
            where:{
                id: customerId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            'status': 'success',
            'token': accessToken
        });
    } catch (error) {
        res.status(404).json({
            'status': 'fail',
            'messages': "Email not found"
        });
    }
}
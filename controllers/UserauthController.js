import bcrypt from "bcrypt";
const models = require('../models/index');
import jwt from "jsonwebtoken";
import logactivity from "../mongo/logactivity";
import requestIp from "request-ip";

export const Register = async(req, res) => {
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
            'status': 'OK',
            'messages': 'successful registration',
            'data': user
          });
        }
      } catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        });
      }
}

export const Login = async(req, res) => {
    try {
        const user = await models.users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) 
        return res.status(404).json({
            'status': 'fail',
            'messages': "Passowrd Wrong"
        });
        const userId = user[0].id;
        const fullname = user[0].fullname;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, fullname, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, fullname, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await models.users.update(
            {
                token: refreshToken
            },{
                where:{
                id: userId
            }
        });

        const clientIp = requestIp.getClientIp(req)
        const data = {
            'user_id' : userId,
            'ip' : clientIp,
            'url': req.url
        };
        const dataLog = new logactivity(data);
        await dataLog.save();
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
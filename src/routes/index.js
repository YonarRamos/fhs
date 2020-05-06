const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const path = require('path');
const app = express();


router.get('/', (req, res)=>{
    //res.writeHead(200, {'content-type': 'text/plain'}); No es necesario ya que estamos usando express
    //res.write('Works!!'); Prueba
    //res.sendFile('index.html',{root: path.join(__dirname, '../views') }); esta opcion tambien sirve
    res.sendFile(path.join(__dirname, '../views/index.html'));
    
    //console.log(path.join(__dirname, '../views/index.html'));
});

router.post('/send-email',async (req,res)=>{
    
    const {name,email,phone,message} = req.body;
    contentHTML =`
        <h1>Informacion del Cliente</h1>
        <ul>
            <li><b>Usuario: </b> ${name}</li>
            <li><b>Email: </b> ${email}</li>
            <li><b>Telefono: </b> ${phone}</li>
        </ul>
        <p><b>Pedido:</b> ${message}</p>
    `;
    //console.log(contentHTML);
    

    const transporter = nodemailer.createTransport({
        host:'smtp.zoho.com',
        port:465,
        secure: true,
        auth:{
                user:'info@thefullhouseservices.com',
                pass:'Yonar@7853'
            },
        tls: {rejectUnauthorized: false}

    });

    const info = await transporter.sendMail({
        from:"'Full House Servises'<info@thefullhouseservices.com>",
        to:"infofullhouseservices@gmail.com",
        subject:"Gracias por contactarnos",
        html:contentHTML
    });

    console.log('Mensaje enviado',info.messageId);
    //alert('Mensaje Enviado');
    res.sendFile(path.join(__dirname, '../views/success.html'));


})
module.exports = router;
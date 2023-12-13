const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/enviar', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'empresadeviaje@gmail.com',
            pass: 'Empresa654321'
        }
    });

    const mailOptions = {
        from: 'empresadeviaje@gmail.com',
        to: 'empresadeviaje@gmail.com',  
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${nombre}\nCorreo Electrónico: ${email}\nMensaje: ${mensaje}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el mensaje.');
        } else {
            console.log('Mensaje enviado: ' + info.response);
            res.send('Mensaje enviado con éxito.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

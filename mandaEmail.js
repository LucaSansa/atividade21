const fsp = require('fs').promises;
const nodemailer = require('nodemailer');

var email = [];
var titulo = [];
var corpo = [];

// fsp.readFile('email.txt', 'utf-8', (err, data) =>{
//     email = data.split(' ');   
// })

// fsp.readFile('titulo.txt', 'utf-8', (err, data) =>{
//     titulo = data.split(' ');    
// })

// fsp.readFile('corpo.txt', 'utf-8', (err, data) =>{
//     corpo = data.split(' ');    
// })

fsp.readFile('email.txt', 'utf-8')
    .then((data) =>{
        email = data.split(' ');
        return fsp.readFile('titulo.txt', 'utf-8');
    })
    .then((data) =>{
        titulo = data.split(' ');
        return fsp.readFile('corpo.txt', 'utf-8');
    })
    .then((data) =>{
        corpo = data.split(' ');
    });



    setTimeout(() => {
        for(var i = 0; i < email.length; i++){
            async function main(){

                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'emerson.dickens@ethereal.email',
                        pass: '17VYwdH425VmQFr5TJ'
                    }
                });
            
                const info = await transporter.sendMail({
                    from: '"Emerson Dickens" <emerson.dickens@ethereal.email>',
                    to: email[i],
                    subject: titulo[i],
                    text: corpo[i]
                });
            
                console.log('Message ID: ', info.messageId);
                console.log('Message URL: ', nodemailer.getTestMessageUrl(info));
            
            }
            main().catch(console.log);
        }

    }, 2000);


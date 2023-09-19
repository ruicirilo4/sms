const express = require('express');
const twilio = require('twilio');
const app = express();
const ejs = require('ejs');

// Configure as suas credenciais da Twilio aqui
const accountSid = 'ACf60c0e474d40d3f80c61b3d455115414';
const authToken = '1f9e918366257d3b3a205105a84a490c';

const client = twilio(accountSid, authToken);

// Configure o mecanismo de visualização EJS
app.set('view engine', 'ejs');

// Middleware para analisar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Rota para renderizar o formulário de envio de SMS
app.get('/', (req, res) => {
  res.render('formulario');
});

// Rota para lidar com o envio de SMS
app.post('/enviar-sms', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const message = req.body.message;

  // Use a biblioteca Twilio para enviar a mensagem SMS
  client.messages
    .create({
      body: message,
      from: '+14788181529',
      to: phoneNumber,
    })
    .then((message) => {
      res.send(`Mensagem enviada com sucesso! SID da mensagem: ${message.sid}`);
    })
    .catch((error) => {
      res.send(`Erro ao enviar a mensagem: ${error.message}`);
    });
});

app.listen(3000, () => {
  console.log('Servidor Express iniciado na porta 3000');
});

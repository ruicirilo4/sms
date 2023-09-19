import express from 'express';
import twilio from 'twilio';
import ejs from 'ejs';

// Configure as suas credenciais da Twilio aqui
const accountSid = 'ACf60c0e474d40d3f80c61b3d455115414';
const authToken = '1f9e918366257d3b3a205105a84a490c';

const client = twilio(accountSid, authToken);

// Configure o mecanismo de visualização EJS
const app = express();
app.set('view engine', 'ejs');

// Middleware para analisar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Rota para renderizar o formulário de envio de SMS
app.get('/', (req, res) => {
  res.render('formulario');
});

// Rota para lidar com o envio de SMS
app.post('/enviar-sms', async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const message = req.body.message;

    // Use a biblioteca Twilio para enviar a mensagem SMS
    const sentMessage = await client.messages.create({
      body: message,
      from: '+14788181529',
      to: phoneNumber,
    });

    res.status(200).json({ message: `Mensagem enviada com sucesso! SID da mensagem: ${sentMessage.sid}` });
  } catch (error) {
    res.status(500).json({ error: `Erro ao enviar a mensagem: ${error.message}` });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado na porta ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import { sendMail } from './configNodemailer';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
	res.json({message: 'Test work'});
});

app.post('/send-email', async (req, res) => {
	console.log('post activated');
	const data  = await req.body;
	console.log(data);
	if (data) {
		try {
			const result = await sendMail(data.message, data.email, data.name)
			.then(res => res)
			res.status(200).json({message: result})
		} catch (error) {
			res.status(400).json({message: 'mail not sended error'})
		}
	} else {
		res.json({message: 'data not obtained'})
	}
	
})

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server run on port: ${PORT}`);
})
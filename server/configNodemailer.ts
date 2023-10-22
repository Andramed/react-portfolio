
import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer';
dotenv.config({
	path: '.env.local'
})
type SendMailOptions = (
	message: string,
	fromEmail: string,
	name: string
) => Promise<string>;

export  const sendMail: SendMailOptions  = async (message, fromEmail, name) => {	
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.USER,
			pass: process.env.PASSWORD
		}
	})

	const mailOptions = {
		from: fromEmail,
		to: 'cervacvlad32@gmail.com',
		subject: `New corespondance from your portfolio about job from: ${name}`,
		text: message
	}
	
	const result =  await new Promise<string>((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				reject(err)
			} else {
				resolve('Mail sended with succes');
			}
		})
	})
	return result
}
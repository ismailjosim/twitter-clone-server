import dotenv from 'dotenv'
dotenv.config()
import app from './app'
// Start the server
const bootstrap = async () => {
	try {
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on PORT:${process.env.PORT} 🚀`)
		})
	} catch (error) {
		console.error('Error starting the server:', error)
	}
}
bootstrap()

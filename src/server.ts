import app from './app'
import { envVars } from './app/config/env'
// Start the server
const bootstrap = async () => {
	try {
		app.listen(envVars.PORT, () => {
			console.log(`Server is running on PORT:${envVars.PORT} 🚀`)
		})
	} catch (error) {
		console.error('Error starting the server:', error)
	}
}
bootstrap()

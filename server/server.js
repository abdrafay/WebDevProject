const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()
app.use(express.json())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'), require('./routes/taskRoutes'))
app.use('/api/positions', require('./routes/disPosRoutes'))
app.use('/api/roles', require('./routes/roleRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
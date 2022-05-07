const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()
connectDB()
app.use(express.json())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'), require('./routes/taskRoutes'))
app.use('/api/positions', require('./routes/disPosRoutes'))
app.use('/api/roles', require('./routes/roleRoutes'))
app.use(notFound)
app.use(errorHandler)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Server is running')
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
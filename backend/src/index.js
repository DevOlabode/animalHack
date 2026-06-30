require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const authRoutes = require('../routes/auth');

const frontendOrigin = process.env.FRONTEND_ORIGIN;
app.use(cors({
    origin: frontendOrigin, 
    credentials:true
}));
app.use(express.json());

app.get('/health', (_req, res) =>{
    res.status(200).json({
        status: 'okay',
        message: 'Server is running!'
    })
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`App is listening on PORT ${PORT}`)
});
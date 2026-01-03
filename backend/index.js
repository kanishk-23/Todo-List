const todoRoutes = require('./routes/todoroutes');
const userRoutes = require('./routes/userroutes');
const DBconnection = require('./databaseconnection');
const express= require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin: `*`}));

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// Using routes
app.use('/api/user', userRoutes);
app.use('/api/todos', todoRoutes);

// root route
app.get('/', (req, res) => {
    res.json({ message: 'API is live' });
});

const port = process.env.PORT;
(async () => {
  await DBconnection();
  app.listen(port, () => console.log(`Server running on port ${port}`));
})();

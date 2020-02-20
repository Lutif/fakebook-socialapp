const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3003;
const router = require('./routes/api/router');

const app = express();
app.use(express.json({ useUrlExtended: false }));
//connect db
connectDB();
app.use('/api', router);
app.get('/', (req, res) => res.send('API working!'));

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

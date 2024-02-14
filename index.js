const express = require('express');
require('./db/connection')
const userRoute =  require('./router/userRoute')

const app = express();
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

app.use(express.json());
app.use('/api/v1/user' , userRoute)

const express=require('express');
const {connectToDatabase } =require('./utils/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT =process.env.PORT || 3000;

app.use(express.json());
connectToDatabase();

//Routes
app.use('/api',productRoutes);

//Error handling middleware
app.use((err,req,res,next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});
module.exports =app;
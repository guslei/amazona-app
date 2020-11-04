import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';

const app = express();

const MONGOURL = 'mongodb://admin:colon5031@localhost:27017/amazona?authSource=admin';

mongoose.connect(process.env.MONGODB_URL || MONGOURL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(x => x._id === req.params.id);
  if(product) {
    res.send(product);
  } else {
    res.status(404).send({message: 'Product not found'});
  }
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(`Server is ready at port: ${port}`);
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

export default userRouter;
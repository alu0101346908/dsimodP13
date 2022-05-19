import {connect} from 'mongoose';

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/dsi-assessment';

connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});



import { PORT } from './config/constants';
import { aquariumRouter } from './routes/Aquarium';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/aquarien', aquariumRouter);

app.get('/', (req, res) => {
  res.send('This is a test web page!');
});
app.listen(PORT, () => {
  console.log(`Server startet on port ${PORT}`);
});
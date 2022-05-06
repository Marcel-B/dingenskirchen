const express = require('express');
import { PORT } from './config/constants';
import { aquariumRouter } from './routes/Aquarium';

const app = express();
app.use(express.json());

app.use('/aquarium', aquariumRouter);
app.get('/', (req, res) => {
  res.send('This is a test web page!');
});
app.listen(PORT, () => {
  console.log(`Server startet on port ${PORT}`);
});
import { PORT } from './config/constants';
import { aquariumRouter } from './routes/Aquarium';
import { duengungRouter } from './routes/Duengung';
import { fischRouter } from './routes/Fisch';
import { messungRouter } from './routes/Messung';
import { notizRouter } from './routes/Notiz';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/aquarien', aquariumRouter);
app.use('/messungen', messungRouter);
app.use('/fische', fischRouter);
app.use('/duengungen', duengungRouter);
app.use('/notiz', notizRouter);

app.get('/', (req, res) => {
  res.send('This is a test web page!');
});

app.listen(PORT, () => {
  console.log(`Server startet on port ${PORT}`);
});
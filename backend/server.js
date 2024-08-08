import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { countNissanFromCK, cars } from './nissanFromCk.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

const carsRouter = express.Router();
apiRouter.use('/cars', carsRouter);

carsRouter.get('/', getCars);
carsRouter.post('/', addCar);
carsRouter.get('/delete', deleteCar);

app.get('/api/nissansFromCK', getNissansFromCK);

function getCars(req, res) {
  res.json(cars);
}

function addCar(req, res) {
  const newCar = req.body;
  cars.push(newCar);
  res.json(newCar);
}

function deleteCar(req, res) {
  const reg_number = req.query.reg_number;
  const index = cars.findIndex((c) => c.reg_number === reg_number);

  if (index !== -1) {
    cars.splice(index, 1);
    res.status(200).json({ message: 'Car deleted' });
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
}

function getNissansFromCK(req, res) {
  const count = countNissanFromCK();
  console.log(count);
  res.json({ count });
}

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  console.log('App starting on port', PORT);
});
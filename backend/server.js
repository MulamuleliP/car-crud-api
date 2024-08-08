import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

let cars = []; // Initialize an empty array for cars

// Fetch car data from an external API (replace 'API_URL' with the actual URL)
const fetchCarData = async () => {
  try {
    const response = await axios.get('API_URL'); // Replace 'API_URL' with the actual URL
    cars = response.data;
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
};

// Fetch car data on server start
fetchCarData();

// CRUD operations
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.post('/api/cars', (req, res) => {
  const newCar = req.body;
  cars.push(newCar);
  res.status(201).json(newCar);
});

app.put('/api/cars/:reg_number', (req, res) => {
  const regNumber = req.params.reg_number;
  const updatedCar = req.body;
  cars = cars.map(car => car.reg_number === regNumber ? updatedCar : car);
  res.json(updatedCar);
});

app.delete('/api/cars/:reg_number', (req, res) => {
  const regNumber = req.params.reg_number;
  cars = cars.filter(car => car.reg_number !== regNumber);
  res.status(204).send();
});

// Count how many Nissans are from Malmesbury
app.get('/api/cars/nissansFromCK', (req, res) => {
  const nissansFromCK = cars.filter(car => car.make === 'Nissan' && car.reg_number.startsWith('CK')).length;
  res.json({ count: nissansFromCK });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

document.addEventListener('alpine:init', () => {
    Alpine.data('carApp', () => ({
      cars: [],
      newCar: { make: '', model: '', color: '', reg_number: '' },
      nissansFromCK: 0,

      init() {
        this.fetchCars();
      },

      async fetchCars() {
        try {
          const response = await axios.get('/cars');
          this.cars = response.data;
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      },

      async addCar() {
        try {
          const response = await axios.post('/cars', this.newCar);
          this.cars.push(response.data);
          this.newCar = { make: '', model: '', color: '', reg_number: '' };
        } catch (error) {
          console.error('Error adding car:', error);
        }
      },

      async fetchNissansFromCK() {
        try {
          const response = await axios.get('/api/cars/nissansFromCK');
          this.nissansFromCK = response.data.count;
        } catch (error) {
          console.error('Error fetching Nissan count:', error);
        }
      },
    }));
  });

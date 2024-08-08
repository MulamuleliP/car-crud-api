document.addEventListener('alpine:init', () => {
  Alpine.data('nissan', () => ({
    nissanCount: null,
    cars: [],
    newCar: { make: '', model: '', color: '', reg_number: '' },
    deleteRegNumber: '',
    nissansFromCK: 0,

    init() {
      this.fetchCars();
    },

    async fetchCars() {
      try {
        const response = await axios.get('http://localhost:3007/api/cars');
        this.cars = response.data;
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },

    async addCar() {
      try {
        const response = await axios.post('http://localhost:3007/api/cars', this.newCar);
        this.cars.push(response.data);
        this.newCar = { make: '', model: '', color: '', reg_number: '' };
      } catch (error) {
        console.error('Error adding car:', error);
      }
    },

    async fetchNissansFromCK() {
      try {
        const response = await axios.get('http://localhost:3007/api/cars/nissansFromCK');
        this.nissansFromCK = response.data.count;
      } catch (error) {
        console.error('Error fetching Nissan count:', error);
      }
    },

    async deleteCar() {
      try {
        const response = await fetch(`http://localhost:3007/api/cars/delete?reg_number=${encodeURIComponent(this.deleteRegNumber)}`, {
          method: 'GET'
        });
        
      } catch (error) {
        console.error('Error deleting car:', error);
        
      }
    }
  }));
});
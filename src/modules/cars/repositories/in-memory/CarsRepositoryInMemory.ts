import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    return this.cars.filter(car => {
      return (
        car.available &&
        ((category_id && car.category_id === category_id) ||
          (brand && car.brand === brand) ||
          (name && car.name === name) ||
          true)
      );
    });
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex(car => car.id === id);
    this.cars[index].available = available;
  }
}

export { CarsRepositoryInMemory };

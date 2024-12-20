import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Fusion } from '../../domain/model/fusion';
import { People } from '../../domain/model/people';
import { Planet } from '../../domain/model/planet';
import { SwapiRepository } from '../../domain/repositories/swapi-repository.interface';

@Injectable()
export class DatabaseSwapiRepository implements SwapiRepository {
  constructor(
  ) {}

  async getAllPeoples(page: string): Promise<People[]> {
    const peoples: People[] = [];
    const { results } = (await axios.get(`https://swapi.py4e.com/api/people/?page=${page}`)).data;

    peoples.push(
      results.map((x: People) => ({ 
        name: x.name, 
        gender: x.gender,
        homeworld: x.homeworld,
        birth_year: x.birth_year 
      }))
    );
    
    return peoples;
  }

  async getAllPlanets(page: string): Promise<Planet[]> {
    const planets: Planet[] = [];
    const { results } = (await axios.get(`https://swapi.py4e.com/api/planets/?page=${page}`)).data;

    planets.push(
      results.map((x: Planet) => ({ 
        name: x.name, 
        climate: x.climate,
        rotation_period: parseInt(x.rotation_period.toString()),
        orbital_period: parseInt(x.orbital_period.toString())
      }))
    );
    
    return planets;
  }

  async getAllFusions(page: string): Promise<Fusion[]> {
    const { results } = (await axios.get(`https://swapi.py4e.com/api/people/?page=${page}`)).data;
  
    const fusion: Fusion[] = await Promise.all(results.map(async (people: People) => {
      const planet = (await axios.get(people.homeworld)).data;
      return {
        name: people.name, 
        gender: people.gender,
        birth_year: people.birth_year,
        homeworld: people.homeworld,
        name_planet: planet.name, 
        climate: planet.climate,
        rotation_period: planet.rotation_period === "unknown" ? null : parseInt(planet.rotation_period.toString()),
        orbital_period: planet.orbital_period === "unknown" ? null : parseInt(planet.orbital_period.toString()),
        gravity: planet.gravity,
        terrain: planet.terrain
      }
    }));

    return fusion;
  }
}
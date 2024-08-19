import {
  Pokemon,
  PokeAPI,
  PokemonDetails,
  TYPE_COLOURS,
  Generation,
  GenerationAPI,
  GenerationInfo,
  type,
} from './../../interfaces';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-homepage',
  templateUrl: './pokemon-homepage.component.html',
  styleUrls: ['./pokemon-homepage.component.css'],
})
export class PokemonHomepageComponent implements OnInit {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  generations: GenerationInfo[];
  selectedGeneration: string
  currentType: string;
  selectedType: string;
  types: type[];
  gen_data = [
    { amount: 151, offset: 0 },
    { amount: 100, offset: 151 },
    { amount: 135, offset: 251 },
    { amount: 107, offset: 386 },
    { amount: 156, offset: 493 },
    { amount: 72, offset: 649 },
    { amount: 88, offset: 721 },
    { amount: 96, offset: 809 },
    { amount: 120, offset: 905 },
  ]
  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.service.getGenerations().subscribe((data) => {
      this.generations = data.results
      this.selectedGeneration = data.results[0].name
    });
    this.getPokemons();
    this.service.getTypes().subscribe((data) => {
      this.types = data.results
    })
    this.selectedType = "None"

  }

  onGenerationSelected(): void {
    this.service.getGenerationByUrl(this.selectedGeneration).subscribe((data) => {
      console.log(data)
      let offset = this.gen_data[data.id - 1].offset
      let limit = this.gen_data[data.id - 1].amount
      this.service.getPokemons(limit, offset).subscribe((data: PokeAPI) => {
        this.pokemons = data.results
        this.filteredPokemons = data.results
        this.pokemons.forEach((pokemon) => {
          this.getPokemonDetails(pokemon)
        })
      })
    })
  }
  onTypeSelected(): void {
    if (!this.selectedType || this.selectedType === "None") {
      this.filteredPokemons = this.pokemons
      return
    }
    this.filteredPokemons = this.pokemons.filter(item => {
      let matchFound = false
      if (item.details && item.details.types) {
        matchFound = JSON.stringify(item.details.types).toLowerCase().includes(this.selectedType)

      }
      return matchFound
    })
  }



  getPokemons(): void {
    this.service.getPokemons(151, 0).subscribe((data: PokeAPI) => {
      this.pokemons = data.results;
      this.filteredPokemons = data.results
      this.pokemons.forEach((pokemon) => {

        this.getPokemonDetails(pokemon);
      });
    });
  }
  getPokemonDetails(pokemon: Pokemon): void {
    this.service
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
      });
  }
  getTypeColours(type: string): string {
    if (type) {
      return '#' + TYPE_COLOURS[type];
    }
  }
}

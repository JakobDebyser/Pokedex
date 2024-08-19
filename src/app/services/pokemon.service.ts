import { Generation, GenerationAPI, PokeAPI, PokemonDetails, type, typeAPI } from './../interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  generationAPI: any;
  pokeSpeciesAPI: any;
  pokeAPI: any;
  typeAPI: any;

  constructor(private http: HttpClient) {
    this.generationAPI = environment.generationURL;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
    this.pokeAPI = environment.pokemonURL;
    this.typeAPI = environment.pokemonTypesUrl;
  }
  /* returns a generation  */

  getGenerations():Observable<GenerationAPI> {
    
    return this.http.get<GenerationAPI>(`${this.generationAPI}`);
  }
  getGenerationByUrl(url:string){
    return this.http.get<Generation>(url)
  }
  getGeneration(value:number):Observable<Generation>{
      return this.http.get<Generation>(`${this.generationAPI}/${value}`)
  }
  getPokemons(limit:number,offset:number):Observable<PokeAPI> {
    return this.http.get<PokeAPI>(this.pokeAPI,{params:{"limit":limit,"offset":offset}} )
  }
  // `${this.pokeAPI}?limit=151`
  getPokemonDetails(name:string):Observable<PokemonDetails>{
    return this.http.get<PokemonDetails>(`${this.pokeAPI}/${name} `)
  }
  getPokemonSpecies(name:string): Observable<any>{
    return this.http.get<any>(`${this.pokeSpeciesAPI}/${name}`)
  }
  getTypes(){
    return this.http.get<typeAPI>(this.typeAPI)
  }
}

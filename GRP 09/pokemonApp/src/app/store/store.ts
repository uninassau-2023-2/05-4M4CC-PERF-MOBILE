export interface pokemon {
  name: string
  id: number
  image: string
  weight: number
  height: number
  abilities: number
  vitorias: number
  derrotas: number
  empates: number
}

interface IStore {
  pokemons: pokemon[];
}

export let store: IStore = {
  pokemons: []
}
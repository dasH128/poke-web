import pokemonApi from '@/api/pokemonApi'

const getPokemons = () => {
    const pokemonArr = Array.from(Array(650))
    // console.log(pokemonArr);
    return pokemonArr.map( (_, index)=> index+1)
}

const getPokemonNames = async (pokemons: Number[] = []) => {
    
    const [a,b,c,d] = pokemons

    const peticiones = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]

    const [ {data: p1}, {data: p2}, {data: p3}, {data: p4} ] = await Promise.all(peticiones)
    
    return [
        {nombre: p1.name, id: p1.id},
        {nombre: p2.name, id: p2.id},
        {nombre: p3.name, id: p3.id},
        {nombre: p4.name, id: p4.id}]
}

const getPokemonOptions = async () => {
    const mixedPokemon = getPokemons().sort( () => Math.random() - 0.5 );

    const pokemons = await getPokemonNames(mixedPokemon.splice(0,4))
    // console.log(pokemons);
    return pokemons
}

export default getPokemonOptions
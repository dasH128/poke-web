<template lang="">
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Quien es este Pokémon?</h1>
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="mostrarPokemon"/>
        <PokemonOption :pokemons="pokemonArr" @selection="checkAnswer($event)"/>
        
        <template v-if="mostrarRespuesta">
            <h2>{{mensaje}}</h2>
            <button @click="newGame">Nuevo Juego</button>
        </template>
        
    </div>
</template>
<script>
import PokemonOption from '@/components/PokemonOption.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helper/getPokemonOptions';



export default {
    components: {
        PokemonOption,PokemonPicture
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            mostrarPokemon: false,
            mostrarRespuesta: false,
            mensaje: '',

        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            const alternativa = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[alternativa]
        },
        checkAnswer(pokemonId){
            console.log('click', pokemonId)
            this.mostrarPokemon = true
            this.mostrarRespuesta = true

            if((pokemonId === this.pokemon.id)){
                // this.mostrarPokemon = true
                // this.mostrarRespuesta = true
                this.mensaje = `Correcto, ${this.pokemon.nombre}`
            }else{
                // this.mostrarPokemon = false
                // this.mostrarRespuesta = true
                this.mensaje = `Oops, era ${this.pokemon.nombre}`
            }
            
        },
        async newGame() {
            this.pokemon = null
            this.mostrarPokemon = false
        this.mostrarRespuesta = false
        this.mensaje = ''
            this.mixPokemonArray()
        }
    },

    mounted(){
        this.mixPokemonArray()
        

    }


}
</script>

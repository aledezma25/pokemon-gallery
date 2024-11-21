<script setup lang="ts">
import { defineProps } from "vue";
import { Pokemon } from "../models/pokemon.model";
import PokemonItem from "./PokemonItem.vue";

interface Props {
  pokemons: Pokemon[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <PokemonItem v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
  </div>
</template>

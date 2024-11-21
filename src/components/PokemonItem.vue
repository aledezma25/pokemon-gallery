<script setup lang="ts">
import { defineProps, ref } from "vue";
import { Pokemon } from "../models/pokemon.model";

// Definir las propiedades
interface Props {
  pokemon: Pokemon;
}

defineProps<Props>();

// Estado para controlar si el modal está visible
const isModalOpen = ref(false);

// Función para abrir el modal
const openModal = () => {
  isModalOpen.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <!-- Card del Pokémon -->
  <div
    class="relative group border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
    @click="openModal"    
  >
    <div class="absolute inset-0 bg-gradient-to-t from-red-500 via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity"></div>
    <img
      class="w-full h-48 object-cover group-hover:opacity-50 transition-opacity"
      :src="pokemon.image"
      :alt="pokemon.name"
    />
    <div
      class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-white bg-opacity-75 group-hover:bg-opacity-100 transition-opacity"
    >
      <h4 class="text-lg font-bold text-gray-700">{{ pokemon.name }}</h4>
      <p class="text-sm text-gray-600">ID: {{ pokemon.id }}</p>
    </div>
  </div>

  <!-- Modal de detalles -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self="closeModal" 
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 class="text-2xl font-bold text-center text-gray-800">{{ pokemon.name }}</h2>
      <img
        class="mx-auto mt-4 w-40 h-40 object-contain"
        :src="pokemon.image"
        :alt="pokemon.name"
      />
      <div class="mt-4">
        <p><strong>Tipo:</strong> {{ pokemon.type }}</p> <!-- Mostrando tipo -->
        <p><strong>Peso:</strong> {{ pokemon.weight }} kg</p> <!-- Mostrando peso -->
        <p><strong>Altura:</strong> {{ pokemon.height }} m</p> <!-- Mostrando altura -->
      </div>
      <div class="mt-4 flex justify-center">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-lg"
          @click="closeModal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  z-index: 9999;
}
</style>

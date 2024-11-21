<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import PageHeader from "./components/PageHeader.vue";
import PokemonList from "./components/PokemonList.vue";
import axiosClient from "./utils/axios";
import { Pokemon } from "./models/pokemon.model";

const pokemons = ref<Pokemon[]>([]);
const search = ref("");
const filteredPokemons = ref<Pokemon[]>([]);
const page = ref(1);
const itemsPerPage = ref(12);
const paginatedPokemons = ref<Pokemon[]>([]);
const totalItems = ref(0);

const selectedType = ref("");  // Para el tipo seleccionado
const types = ref<string[]>([]);  // Para almacenar todos los tipos de Pokémon disponibles

// Función para obtener los pokemones y tipos
const fetchPokemons = async () => {
  try {
    const { data } = await axiosClient.get("?limit=100");

    const typesResponse = await axiosClient.get("https://pokeapi.co/api/v2/type/");
    types.value = typesResponse.data.results.map((type: any) => type.name);

    const pokemonsWithDetails = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const pokemonDetails = await axiosClient.get(pokemon.url);
        return {
          name: pokemon.name,
          id: pokemonDetails.data.id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.data.id}.png`,
          type: pokemonDetails.data.types.map((type: any) => type.type.name).join(", "),
          weight: pokemonDetails.data.weight / 10,
          height: pokemonDetails.data.height / 10,
        };
      })
    );

    pokemons.value = pokemonsWithDetails;
    totalItems.value = pokemons.value.length;

  } catch (error) {
    console.error(error);
  }
};

// Función de filtrado por tipo y búsqueda
const filterPokemons = () => {
  filteredPokemons.value = pokemons.value.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.value.toLowerCase());
    const matchesType = selectedType.value === "" || pokemon.type.toLowerCase().includes(selectedType.value.toLowerCase());
    return matchesSearch && matchesType;
  });
};

// Función para paginar los Pokémon
const slicePokemons = (currentPokemons: Pokemon[]) => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = page.value * itemsPerPage.value;
  paginatedPokemons.value = currentPokemons.slice(start, end);
};

// Cambiar de página
const changePage = (newPage: number) => {
  page.value = newPage;
};

onMounted(() => {
  fetchPokemons();
});

watch([pokemons, page, filteredPokemons], () => {
  slicePokemons(filteredPokemons.value.length === 0 && search.value === "" ? pokemons.value : filteredPokemons.value);
});
</script>

<template>
  <PageHeader />

  <div class="container max-w-screen-lg mx-auto px-6 bg-cover bg-center" style="background-image: url('https://slidechef.net/wp-content/uploads/2024/01/Pikachu-Pokemon-Background-768x432.jpg');">
    <div class="mb-8 flex justify-between space-x-6 bg-white bg-opacity-75 p-4 rounded-lg">
      <!-- Barra de búsqueda -->
      <div class="flex-1">
        <input
          type="text"
          class="border border-gray-300 rounded w-full p-2 px-4"
          placeholder="Search Pokémon"
          v-model="search"
          @input="filterPokemons"
        />
      </div>

      <!-- Filtro por tipo -->
      <div class="flex-1">
        <label for="typeFilter" class="block text-lg font-medium">Filtrar por tipo</label>
        <select
          id="typeFilter"
          v-model="selectedType"
          @change="filterPokemons"
          class="border border-gray-300 rounded w-full p-2 px-4 mt-2"
        >
          <option value="">Todos</option>
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
    </div>

    <!-- Botones de paginación -->
    <div class="mb-8 flex justify-center space-x-6">
      <button
        :disabled="page <= 1"
        :class="{ 'opacity-50': page <= 1 }"
        @click="changePage(page - 1)"
        class="bg-blue-500 text-white rounded px-6 py-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Previous
      </button>
      <button
        :disabled="page >= totalItems / itemsPerPage"
        :class="{ 'opacity-50': page >= totalItems / itemsPerPage }"
        @click="changePage(page + 1)"
        class="bg-green-500 text-white rounded px-6 py-3 shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Next
      </button>
    </div>

    <!-- Lista de Pokémon -->
    <PokemonList :pokemons="paginatedPokemons" />
  </div>

  <footer class="bg-gray-800 text-white py-8 mt-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 class="text-xl font-semibold mb-4">Sobre mí</h3>
          <p class="text-gray-400">Adrian Camilo Ledezma, estudiante de último semestre de Administración de Sistemas Informáticos.</p>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4">Enlaces rápidos</h3>
          <ul>
            <li><a href="#" class="text-gray-400 hover:text-white">Inicio</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4">Sígueme</h3>
          <div class="flex space-x-6">
            <a href="https://github.com/aledezma25" class="text-gray-400 hover:text-white">
              <i class="fab fa-github"></i> GitHub
            </a>
            <a href="https://x.com/ac_ledezma" class="text-gray-400 hover:text-white">
              <i class="fab fa-twitter"></i> Twitter
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center text-gray-400">
        <p>&copy; 2024 Pokémon Gallery. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

# pokemon-gallery

**PRUEBA DE APTITUD CONVOCATORIA: Desarrollo Front y Back**

Este proyecto es una prueba técnica para la convocatoria de desarrollo Frontend y Backend, donde se construyó una galería interactiva de Pokémon. La aplicación permite visualizar información detallada de los Pokémon, buscar por nombre, filtrar por tipo, y paginar los resultados. 

## Descripción

La aplicación **Pokemon Gallery** utiliza la API pública de PokéAPI para obtener la información de los Pokémon. Se desarrolló utilizando **Vue.js** para el frontend y **Axios** para realizar las solicitudes HTTP al backend y a la API de Pokémon. La aplicación permite realizar las siguientes acciones:

- Ver una lista de Pokémon con su nombre, imagen, peso, altura y tipos.
- Filtrar los Pokémon por tipo (por ejemplo, Fuego, Agua, Eléctrico, etc.).
- Buscar un Pokémon por nombre.
- Navegar a través de las páginas con los Pokémon utilizando paginación.

## Características

- **Búsqueda**: Barra de búsqueda interactiva para filtrar Pokémon por nombre.
- **Filtrado por tipo**: Opción para filtrar Pokémon por su tipo (como Fuego, Agua, etc.).
- **Paginación**: Navegar entre páginas de resultados con un máximo de 12 Pokémon por página.
- **Responsive**: Interfaz adaptativa para móviles y escritorio.
- **Detalles de Pokémon**: Al hacer clic en un Pokémon, se muestra más información sobre su tipo, peso, altura, etc.

## Tecnologías

Este proyecto utiliza las siguientes tecnologías:

- **Frontend**: 
  - Vue.js
  - Vue Router (si se requiere navegación)
  - Axios
  - TailwindCSS (para el diseño y estilo)
- **API**: PokéAPI (https://pokeapi.co)
- **Backend (si aplica)**: Si tienes algún backend, puedes detallarlo aquí.

## Instalación

### Requisitos previos

- Node.js (Recomendado versión 16 o superior)
- npm (o yarn, si prefieres)

### Pasos para clonar e instalar

1. Clona este repositorio:

   ```bash
   git clone https://github.com/aledezma25/pokemon-gallery.git
   cd pokemon-gallery
   yarn
   yarn dev
   ```
   

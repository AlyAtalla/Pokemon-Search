document.getElementById('search-button').addEventListener('click', async () => {
  const searchInput = document.getElementById('search-input').value.toLowerCase().trim();
  const pokemonInfo = document.getElementById('pokemon-info');
  const typesElement = document.getElementById('types');
  typesElement.innerHTML = ''; // Clear types content between searches

  if (searchInput === 'red') {
      alert('Pokémon not found');
      return;
  }

  let apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;

  // Handle special cases
  if (searchInput === 'nidoran♀') {
      apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/nidoran-f';
  } else if (searchInput === 'nidoran♂') {
      apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/nidoran-m';
  } else if (searchInput === 'mr. mime') {
      apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/mr-mime';
  }

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          alert('Pokémon not found');
          return;
      }

      const data = await response.json();
      document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
      document.getElementById('pokemon-id').textContent = `#${data.id}`;
      document.getElementById('weight').textContent = `Weight: ${data.weight}`;
      document.getElementById('height').textContent = `Height: ${data.height}`;
      document.getElementById('hp').textContent = data.stats[0].base_stat;
      document.getElementById('attack').textContent = data.stats[1].base_stat;
      document.getElementById('defense').textContent = data.stats[2].base_stat;
      document.getElementById('special-attack').textContent = data.stats[3].base_stat;
      document.getElementById('special-defense').textContent = data.stats[4].base_stat;
      document.getElementById('speed').textContent = data.stats[5].base_stat;

      // Add sprite image
      let sprite = document.getElementById('sprite');
      if (sprite) {
          sprite.src = data.sprites.front_default;
      } else {
          sprite = document.createElement('img');
          sprite.id = 'sprite';
          sprite.src = data.sprites.front_default;
          pokemonInfo.appendChild(sprite);
      }

      // Add types
      data.types.forEach(typeInfo => {
          const typeElement = document.createElement('p');
          typeElement.textContent = typeInfo.type.name.toUpperCase();
          typesElement.appendChild(typeElement);
      });
  } catch (error) {
      alert('Error fetching Pokémon data');
  }
});
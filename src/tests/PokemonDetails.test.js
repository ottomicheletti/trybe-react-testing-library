import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const pokemonDetailsLink = screen.getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);
    const h2 = screen.getAllByRole('heading', { level: 2 });
    expect(h2[0].textContent).toContain('Pikachu');
    expect(pokemonDetailsLink).not.toBeInTheDocument();
    expect(h2[1].textContent).toContain('Summary');
    const paragraph = screen.getByText(/this intelligent pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });
  test(`Existe na página uma seção com os mapas contendo as
localizações do pokémon`, () => {
    const pokemonDetailsLink = screen.getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);
    const h2 = screen.getAllByRole('heading', { level: 2 });
    expect(h2[2].textContent).toContain('Locations');
    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps.length).toBe(2);
    const mapsName = screen.getAllByText(/kanto/i);
    expect(mapsName.length).toBe(2);
    const URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(maps[0].src).toBe(URL1);
    expect(maps[1].src).toBe(URL2);
  });
  test('O usuário pode favoritar um pokémon através da página de detalhes', async () => {
    const pokemonDetailsLink = screen.getAllByText(/more details/i);
    userEvent.click(pokemonDetailsLink[0]);
    const favoritePokemonFalse = screen.getByRole('checkbox');
    expect(favoritePokemonFalse).toBeInTheDocument();
    const favoritePokemonLabel = screen.getByText(/favoritado/i);
    expect(favoritePokemonLabel.textContent).toBe('Pokémon favoritado?');
    userEvent.click(favoritePokemonFalse);
    const favorites = screen.getByText(/favorite/i);
    userEvent.click(favorites);
    const favoritePokemonName = screen.getByTestId('pokemon-name');
    expect(favoritePokemonName).toBeInTheDocument();
    userEvent.click(pokemonDetailsLink[0]);
    await (() => {
      const favoritePokemonTrue = screen.getByRole('checkbox');
      userEvent.click(favoritePokemonTrue);
      userEvent.click(favorites);
      const message = screen.getByText(/no favorite/i);
      expect(message).toBeInTheDocument();
    });
  });
});

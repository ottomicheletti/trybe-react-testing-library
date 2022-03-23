import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test('É renderizado um card com as informações de determinado pokémon', () => {
    const currentPokemonName = screen.getByTestId('pokemon-name');
    const currentPokemonType = screen.getByTestId('pokemon-type');
    const currentPokemonWeight = screen.getByTestId('pokemon-weight');
    const currentPokemonImage = screen.getByAltText(/sprite/);
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const regex = /Average weight.\s[0-9]*.[0-9]\s[a-z]*/g;
    expect(currentPokemonName.textContent).toBe('Pikachu');
    expect(currentPokemonType.textContent).toBe('Electric');
    expect(currentPokemonImage).toHaveProperty('src', URL);
    expect(regex.test(currentPokemonWeight.textContent)).toBe(true);
  });
  test(`O card do Pokémon indicado na Pokédex contém um link de
navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
onde <id> é o id do Pokémon exibido`, () => {
    const pokemonDetailsLink = screen.getByText(/more details/i);
    expect(pokemonDetailsLink.href).toContain('/pokemons/25');
  });
  test(`Ao clicar no link de navegação do Pokémon,
é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`,
  async () => {
    const pokemonDetailsLink = screen.getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);
    await (() => { expect(window.location.pathname).toBe('/pokemons/25'); });
  });
  test(`A URL exibida no navegador muda para /pokemon/<id>,
onde <id> é o id do Pokémon cujos detalhes se deseja ver`, async () => {
    const pokemonDetailsLink = screen.getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);
    await (() => {
      const URL = window.location.pathname.split('/');
      const VINTE_CINCO = 25;
      expect(URL[1]).toBe(VINTE_CINCO);
    });
  });
  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const favoritePokemon = screen.getByRole('checkbox', { checked: false });
    userEvent.click(favoritePokemon);
    const favorites = screen.getByText(/favorite/i);
    userEvent.click(favorites);
    const favoriteStarSymbol = screen.getByAltText(/marked/);
    expect(favoriteStarSymbol).toBeInTheDocument();
    expect(favoriteStarSymbol.src).toContain('/star-icon.svg');
    const regex = /pikachu/i;
    expect(regex.test(favoriteStarSymbol.alt)).toBe(true);
  });
});

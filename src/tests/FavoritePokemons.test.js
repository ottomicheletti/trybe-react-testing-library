import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  afterEach(() => {
    cleanup();
  });

  test(`É exibido na tela a mensagem No favorite pokemon found,
se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/no favorite/i);
    expect(message).toBeInTheDocument();
  });
  test('É exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetailsLink = screen.getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);
    const favoritePokemon = screen.getByRole('checkbox', { checked: false });
    userEvent.click(favoritePokemon);
    const favorites = screen.getByText(/favorite/i);
    userEvent.click(favorites);
    const cards = screen.getAllByTestId('pokemon-name');
    const UM = 1;
    expect(cards.length).toBe(UM);
  });
});

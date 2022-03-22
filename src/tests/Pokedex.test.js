import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { React } from 'react';
import App from '../App';
// import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test('A página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Encountered pokémons');
  });
  test(`É exibido o próximo Pokémon da lista
quando o botão Próximo pokémon é clicado`, () => {
    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon.textContent).toBe('Próximo pokémon');
    userEvent.click(nextPokemon);
    const currentPokemon = screen.getByText(/charmander/i);
    expect(currentPokemon).toBeInTheDocument();
  });
  test('É mostrado apenas um Pokémon por vez', () => {
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });
  test('A Pokédex tem os botões de filtro', () => {
    const typeFilterButtons = screen.getAllByTestId('pokemon-type-button');
    const SETE = 7;
    expect(typeFilterButtons.length).toBe(SETE);
    userEvent.click(typeFilterButtons[1]);
    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);
    const currentPokemonName = screen.getByTestId('pokemon-name');
    expect(currentPokemonName.textContent).toBe('Rapidash');
    const currentPokemonType = screen.getByTestId('pokemon-type');
    expect(currentPokemonType.textContent).toEqual(typeFilterButtons[1].textContent);
    const allButton = screen.getByText('All');
    expect(allButton.textContent).toBe('All');
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(currentPokemonName.textContent).toBe('Pikachu');
    userEvent.click(nextPokemon);
    expect(currentPokemonName.textContent).toBe('Charmander');
  });
});

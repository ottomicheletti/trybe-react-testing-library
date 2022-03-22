import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <App.js />.', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
  });
  test('O segundo link deve possuir o texto About', () => {
    const links = screen.getAllByRole('link');
    expect(links[1]).toHaveTextContent('About');
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const links = screen.getAllByRole('link');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
  test(`A aplicação é redirecionada a página inicial,
na URL / ao clicar no link Home da barra de navegação`, () => {
    const home = screen.getByText('Home');
    userEvent.click(home);
    expect(window.location.pathname).toBe('/');
  });
  test(`A aplicação é redirecionada a página About,
na URL /about ao clicar no link Home da barra de navegação`, async () => {
    const about = screen.getByText('About');
    userEvent.click(about);
    await (() => { expect(window.location.pathname).toBe('/about'); });
  });
  test(`A aplicação é redirecionada para a página de Pokémons Favoritados,
na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`,
  async () => {
    const favPokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(favPokemons);
    await (() => { expect(window.location.pathname).toBe('/favorites'); });
  });
  test(`A aplicação é redirecionada para a página Not Found
ao entrar em uma URL desconhecida.`, async () => {
    const { getByText } = renderWithRouter(<App path="/xablau" />);
    await (() => { expect(getByText(/page requested not found/i)).toBeInTheDocument(); });
  });
});

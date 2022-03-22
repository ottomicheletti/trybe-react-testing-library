import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <About.js />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  afterEach(() => {
    cleanup();
  });

  test('A página contém as informações sobre a Pokédex', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(h2.textContent).toEqual('About Pokédex');
    expect(h2).toBeInTheDocument();
    expect(paragraphs.length).toBe(2);
  });
  test('A página contém um heading h2 com o texto About Pokédex', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent).toEqual('About Pokédex');
    expect(h2).toBeInTheDocument();
  });
  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs.length).toBe(2);
  });
  test('A a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByAltText('Pokédex');
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', URL);
  });
});

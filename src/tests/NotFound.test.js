import { render, screen } from '@testing-library/react';
import { React } from 'react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o testo Page requested not found', () => {
    render(<NotFound />);
    const text = screen.getByRole('heading', { level: 2 });
    const image = screen.getByAltText(/pikachu crying/i);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(text.textContent).toBe('Page requested not found 😭');
    expect(image).toHaveProperty('src', URL);
  });
});

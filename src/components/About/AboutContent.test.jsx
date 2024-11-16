import React from 'react';
import { render, screen } from 'vitest';
import AboutContent from './AboutContent';

test('renders AboutContent component', () => {
  render(<AboutContent />);
  const aboutContentElement = screen.getByTestId('about-content');
  expect(aboutContentElement).toBeInTheDocument();
});

test('displays correct title', () => {
  render(<AboutContent />);
  const titleElement = screen.getByText('About Us');
  expect(titleElement).toBeInTheDocument();
});

test('displays correct description', () => {
  render(<AboutContent />);
  const descriptionElement = screen.getByText('Welcome to our website!');
  expect(descriptionElement).toBeInTheDocument();
});

test('displays correct image', () => {
  render(<AboutContent />);
  const imageElement = screen.getByAltText('About Us');
  expect(imageElement).toBeInTheDocument();
});
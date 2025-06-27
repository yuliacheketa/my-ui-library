import type { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  background: '#fff0f6',
  card: '#ffd6e7',
  text: '#5b2c37',
  inputBg: '#ffe6f0',
  border: '#f9c0d8',
  primary: '#f783ac',
  title: '#5b2c37', // чи інший колір для заголовку
};


export const darkTheme: DefaultTheme = {
  background: '#1a1a1a',
  card: '#2a2a2a',
  text: '#e0e0e0',
  inputBg: '#3a3a3a',
  border: '#555555',
  primary: '#bb86fc',
  title: '#fff', // додано для заголовків
};


import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    card: string;
    text: string;
    inputBg: string;
    border: string;
    primary: string;
    title: string; // додано для заголовків
  }
}

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    card: string;
    text: string;
    inputBg: string;
    border: string;
    primary: string;
  }
}
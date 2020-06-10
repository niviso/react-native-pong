import React from 'react';
import {AppProvider} from './context/appContext';
import Game from './views/game/game';
export default function App() {
  return (
    <AppProvider>
    <Game/>
    </AppProvider>
  );
}

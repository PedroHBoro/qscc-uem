import { Game } from './components/Game.js';

window.onload = () => {
  console.log('Initializing game...');
  const game = new Game('pixi-container');
  game.init();
};

import MainMenu from './components/MainMenu.js';
import { Game } from './components/Game.js';

window.onload = () => {
  const appContainer = document.getElementById('app');

  function startGame() {
    const menu = document.getElementById('main-menu');
    if (menu) {
      menu.remove();
    }
    console.log('Initializing game...');
    const game = new Game('pixi-container');
    game.init();
  }

  const mainMenu = MainMenu({ onStartGame: startGame });
  appContainer.appendChild(mainMenu);
};

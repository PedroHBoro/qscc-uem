import MainMenu from './components/MainMenu.js';
import { Game } from './components/Game.js';
import PlayerForm from './components/PlayerForm.js';
import { savePlayerData } from './utils/api.js';

window.onload = () => {
  const appContainer = document.getElementById('app');

  function startGame() {
    const form = document.getElementById('player-form');
    if (form) {
      form.remove();
    }
    console.log('Initializing game...');
    const game = new Game('pixi-container');
    game.init();
  }

  async function handleFormSubmit(playerData) {
    await savePlayerData(playerData);
    startGame();
  }

  function showPlayerForm() {
    const menu = document.getElementById('main-menu');
    if (menu) {
      menu.remove();
    }
    const playerForm = PlayerForm({ onFormSubmit: handleFormSubmit });
    appContainer.appendChild(playerForm);
  }

  const mainMenu = MainMenu({ onStartGame: showPlayerForm });
  appContainer.appendChild(mainMenu);
};

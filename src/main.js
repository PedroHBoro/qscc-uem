import MainMenu from './components/MainMenu.js';
import { Game } from './components/Game.js';
import PlayerForm from './components/PlayerForm.js';
import { savePlayerData } from './utils/api.js';
import { ProfileManager } from './utils/ProfileManager.js';

window.onload = () => {
  const appContainer = document.getElementById('app');
  const profileManager = new ProfileManager();

  function startGame() {
    const form = document.getElementById('player-form');
    if (form) {
      form.remove();
    }
    const game = new Game('pixi-container');
    game.init();
  }

  async function handleFormSubmit(playerData) {
    profileManager.saveProfile(playerData);
    await savePlayerData(playerData, 'Respostas');
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

  function showMainMenu() {
    const mainMenu = MainMenu({ onStartGame: showPlayerForm });
    appContainer.appendChild(mainMenu);
  }

  function showStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.id = 'start-screen';
    startScreen.addEventListener('click', () => {
      startScreen.remove();
      showMainMenu();
    }, { once: true }); // Ensure the event listener is removed after it's fired
    appContainer.appendChild(startScreen);
  }

  showStartScreen();
};

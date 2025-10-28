export default function MainMenu({ onStartGame }) {
  const menu = document.createElement('div');
  menu.id = 'main-menu';
  menu.innerHTML = `
    <style>
      #main-menu {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-family: sans-serif;
      }
      #main-menu h1 {
        font-size: 3rem;
        color: #333;
      }
      #start-game {
        padding: 1rem 2rem;
        font-size: 1.5rem;
        cursor: pointer;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
      }
    </style>
    <h1>Bem-vindo ao Jogo!</h1>
    <button id="start-game">Iniciar Jogo</button>
  `;

  menu.querySelector('#start-game').addEventListener('click', onStartGame);

  return menu;
}

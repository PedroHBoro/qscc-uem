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
    <h3>Ei, antes de começar! 🎮  </h3>
    <p>Este jogo foi criado com um objetivo principal: divertir e informar você!</p>
    <p>Vamos explorar algumas nuances e características dos cursos, mas lembre-se:</p>
    <p><strong>Isto NÃO é um teste comportamental ou psicológico.</strong></p>
    <p>O conteúdo é puramente para entretenimento e não deve ser levado como uma avaliação séria da sua personalidade ou aptidão, ok?</p>
    <p>Agora sim, divirta-se!</p>
    <button id="start-game">Entendi!</button>
    <p>O conteúdo a seguir foi feito para a disciplina de Informática e Sociedade</p>
  `;

  menu.querySelector('#start-game').addEventListener('click', onStartGame);

  return menu;
}

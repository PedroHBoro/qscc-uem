export default function PlayerForm({ onFormSubmit }) {
  const form = document.createElement('form');
  form.id = 'player-form';
  form.innerHTML = `
    <style>
      #player-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-family: sans-serif;
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        color: black;
      }
      #player-form h2 {
        margin-bottom: 1rem;
      }
      #player-form div {
        margin-bottom: 1rem;
        text-align: left;
      }
      #player-form label {
        display: block;
        margin-bottom: 0.5rem;
      }
      #player-form input,
      #player-form select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      #player-form button {
        padding: 1rem 2rem;
        font-size: 1.5rem;
        cursor: pointer;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
      }
    </style>
    <h2>Preencha seus dados</h2>
    <div>
      <label for="player-name">Nome:</label>
      <input type="text" id="player-name" required>
    </div>
    <div>
      <label for="player-gender">Gênero:</label>
      <select id="player-gender" required>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
      </select>
    </div>
    <div>
      <label for="player-school">Escola:</label>
      <input type="text" id="player-school" required>
    </div>
    <div>
      <label for="player-age">Idade:</label>
      <input type="number" id="player-age" required>
    </div>
    <button type="submit">Continuar</button>
  `;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('#player-name').value;
    const gender = form.querySelector('#player-gender').value;
    const school = form.querySelector('#player-school').value;
    const age = form.querySelector('#player-age').value;
    onFormSubmit({ name, gender, school, age });
  });

  return form;
}
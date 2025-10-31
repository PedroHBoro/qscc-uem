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
      #player-form button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      .consent-container {
        display: flex;
        align-items: center;
        text-align: left;
        margin-bottom: 1rem;
      }
      .consent-container input {
        width: auto;
        margin-right: 0.5rem;
      }
      .consent-container label {
        font-size: 0.9rem;
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
    <div class="consent-container">
      <input type="checkbox" id="consent-checkbox" required>
      <label for="consent-checkbox">Li e concedo meu consentimento de forma livre e esclarecida ao uso dos meus dados pessoais de acordo com o <a href="terms.html" target="_blank">termo de uso de dados</a></label>
    </div>
    <button type="submit" id="submit-button" disabled>Continuar</button>
  `;

  const submitButton = form.querySelector('#submit-button');
  const nameInput = form.querySelector('#player-name');
  const schoolInput = form.querySelector('#player-school');
  const ageInput = form.querySelector('#player-age');
  const consentCheckbox = form.querySelector('#consent-checkbox');

  const inputs = [nameInput, schoolInput, ageInput, consentCheckbox];

  const validateForm = () => {
    const isNameValid = nameInput.value.trim() !== '';
    const isSchoolValid = schoolInput.value.trim() !== '';
    const isAgeValid = ageInput.value.trim() !== '';
    const isConsentChecked = consentCheckbox.checked;

    submitButton.disabled = !(isNameValid && isSchoolValid && isAgeValid && isConsentChecked);
  };

  inputs.forEach(input => {
    input.addEventListener('input', validateForm);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const gender = form.querySelector('#player-gender').value;
    const school = schoolInput.value;
    const age = ageInput.value;
    onFormSubmit({ name, gender, school, age });
  });

  return form;
}
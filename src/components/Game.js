
import { Application } from 'pixi.js';
import { Protagonist } from './Protagonist.js';
import { QuestionUI } from './QuestionUI.js';
import { AnswerZone } from './AnswerZone.js';
import { QuestionManager } from '../utils/QuestionManager.js';
import { ProfileManager } from '../utils/ProfileManager.js';

export class Game {
  constructor(containerId) {
    this.app = new Application();
    this.container = document.getElementById(containerId);
    this.protagonist = null;
    this.questionUI = null;
    this.topZone = null;
    this.bottomZone = null;
    this.questionManager = new QuestionManager();
    this.profileManager = new ProfileManager();
    this.questionAnswered = false;
    this.interactionTimeout = null;
  }

  async init() {
    console.log('Game.init() called');
    await this.app.init({ background: '#1099bb', resizeTo: window });
    this.container.appendChild(this.app.canvas);
    this.setup();
  }

  async setup() {
    console.log('Game.setup() called');
    this.protagonist = new Protagonist(this.app);
    await this.protagonist.load();

    this.questionUI = new QuestionUI(this.app);

    const zoneWidth = this.app.screen.width;
    const zoneHeight = this.app.screen.height / 2;
    this.topZone = new AnswerZone(this.app, 0, 0, zoneWidth, zoneHeight, '');
    this.bottomZone = new AnswerZone(this.app, 0, zoneHeight, zoneWidth, zoneHeight, '');

    this.displayCurrentQuestion();

    this.app.stage.interactive = true;
    this.app.stage.on('pointerdown', (event) => {
      console.log('pointerdown event:', event);
      this.protagonist.moveTo(event.global.x, event.global.y);

      if (this.interactionTimeout) {
        clearTimeout(this.interactionTimeout);
      }

      this.interactionTimeout = setTimeout(() => {
        if (this.questionAnswered) return;

        if (this.topZone.contains(this.protagonist.sprite.position)) {
          this.handleAnswer(0);
        } else if (this.bottomZone.contains(this.protagonist.sprite.position)) {
          this.handleAnswer(1);
        }
      }, 5000); // 5 seconds
    });

    this.app.ticker.add((time) => {
      this.protagonist.update(time);
    });
  }

  displayCurrentQuestion() {
    const question = this.questionManager.getCurrentQuestion();
    this.questionUI.displayQuestion(question.text);
    this.topZone.text.text = question.choices[0];
    this.bottomZone.text.text = question.choices[1];

    const startX = this.app.screen.width / 2;
    const startY = this.app.screen.height / 2;
    this.protagonist.setPosition(startX, startY);
    this.questionAnswered = false;
  }

  handleAnswer(choiceIndex) {
    this.questionAnswered = true;
    const question = this.questionManager.getCurrentQuestion();
    const score = question.scores[choiceIndex];
    this.profileManager.addPoints(score, 1);

    if (this.questionManager.nextQuestion()) {
      setTimeout(() => this.displayCurrentQuestion(), 500); // Wait half a second
    } else {
      const recommendation = this.profileManager.getRecommendation();
      this.questionUI.displayQuestion(`Curso recomendado: ${recommendation}`);
      this.app.stage.removeChild(this.topZone.rect);
      this.app.stage.removeChild(this.topZone.text);
      this.app.stage.removeChild(this.bottomZone.rect);
      this.app.stage.removeChild(this.bottomZone.text);
    }
  }
}

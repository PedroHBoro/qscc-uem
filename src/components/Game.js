
import { Application, TilingSprite, Assets } from 'pixi.js';
import { Protagonist } from './Protagonist.js';
import { QuestionUI } from './QuestionUI.js';
import { AnswerZone } from './AnswerZone.js';
import { QuestionManager } from '../utils/QuestionManager.js';
import { ProfileManager } from '../utils/ProfileManager.js';
import { CountdownUI } from './CountdownUI.js';

export class Game {
  constructor(containerId) {
    this.app = new Application();
    this.container = document.getElementById(containerId);
    this.protagonist = null;
    this.questionUI = null;
    this.leftZone = null;
    this.rightZone = null;
    this.questionManager = new QuestionManager();
    this.profileManager = new ProfileManager();
    this.questionAnswered = false;
    this.interactionTimeout = null;
    this.countdownUI = null;
  }

  async init() {
    console.log('Game.init() called');
    await this.app.init({ resizeTo: window });
    this.container.appendChild(this.app.canvas);
    this.setup();
  }

  async setup() {
    console.log('Game.setup() called');

    const backgroundTexture = await Assets.load('/assets/bunny.png');
    const background = new TilingSprite(
      backgroundTexture,
      this.app.screen.width,
      this.app.screen.height,
    );

    this.app.stage.addChildAt(background, 0);

    window.addEventListener('resize', () => {
      background.width = this.app.screen.width;
      background.height = this.app.screen.height;
    });

    this.protagonist = new Protagonist(this.app);
    await this.protagonist.load();

    this.questionUI = new QuestionUI(this.app);
    this.countdownUI = new CountdownUI(this.app);

    const zoneWidth = this.app.screen.width / 2;
    const zoneHeight = this.app.screen.height / 3;
    const zoneTopOffset = this.app.screen.height / 3
    
    this.leftZone = new AnswerZone(this.app, 0, zoneTopOffset, zoneWidth, zoneHeight, '');
    this.rightZone = new AnswerZone(this.app, zoneWidth, zoneTopOffset, zoneWidth, zoneHeight, '');

    this.displayCurrentQuestion();

    this.app.stage.interactive = true;
    this.app.stage.on('pointerdown', (event) => {
      this.protagonist.moveTo(event.global.x, event.global.y);

      const clickPoint = event.global;

      if (this.leftZone.contains(clickPoint) || this.rightZone.contains(clickPoint)) {
        this.countdownUI.start(5, () => {
          if (this.questionAnswered) return;

          if (this.leftZone.contains(this.protagonist.sprite.position)) {
            this.handleAnswer(0);
          } else if (this.rightZone.contains(this.protagonist.sprite.position)) {
            this.handleAnswer(1);
          }
        });
      } else {
        this.countdownUI.stop();
      }
    });

    this.app.ticker.add((time) => {
      this.protagonist.update(time);
    });
  }

  displayCurrentQuestion() {
    const question = this.questionManager.getCurrentQuestion();
    this.questionUI.displayQuestion(question.text);
    this.leftZone.text.text = question.choices[0];
    this.rightZone.text.text = question.choices[1];

    const startX = this.app.screen.width / 2;
    const startY = this.app.screen.height - (this.app.screen.height / 6);
    this.protagonist.setPosition(startX, startY);
    this.questionAnswered = false;
  }

  handleAnswer(choiceIndex) {
    this.countdownUI.stop();
    this.questionAnswered = true;
    const question = this.questionManager.getCurrentQuestion();
    const score = question.scores[choiceIndex];
    this.profileManager.addPoints(score, 1);

    if (this.questionManager.nextQuestion()) {
      setTimeout(() => this.displayCurrentQuestion(), 500); // Wait half a second
    } else {
      const recommendation = this.profileManager.getRecommendation();
      this.questionUI.displayQuestion(`Curso recomendado: ${recommendation}`);
      this.app.stage.removeChild(this.leftZone.rect);
      this.app.stage.removeChild(this.leftZone.text);
      this.app.stage.removeChild(this.rightZone.rect);
      this.app.stage.removeChild(this.rightZone.text);
    }
  }
}

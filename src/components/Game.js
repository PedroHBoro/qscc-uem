import { Application, TilingSprite, Assets, Texture, Sprite } from 'pixi.js';
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
    this.topZone = null;
    this.bottomZone = null;
    this.questionManager = new QuestionManager();
    this.profileManager = new ProfileManager();
    this.questionAnswered = false;
    this.interactionTimeout = null;
    this.countdownUI = null;
  }

  async init() {
    await this.app.init({ resizeTo: window });
    this.container.appendChild(this.app.canvas);
    this.setup();

    this.protagonistStartX = this.app.screen.width / 2;
    this.protagonistStartY = this.app.screen.height - (this.app.screen.height / 6);
  }

  async setup() {

    await Assets.load(['/assets/Spritesheet.json', '/assets/mago.png']);
    const backgroundTexture = Texture.from('ground1.png');
    const background = new TilingSprite(
      backgroundTexture,
      this.app.screen.width,
      this.app.screen.height,
    );

    this.app.stage.addChildAt(background, 0);

    const wizard = Sprite.from('/assets/mago.png');
    wizard.scale.set(0.3);
    wizard.position.set(15, 30);
    this.app.stage.addChild(wizard);

    window.addEventListener('resize', () => {
      background.width = this.app.screen.width;
      background.height = this.app.screen.height;
    });

    const profile = this.profileManager.getProfile();
    const gender = profile ? profile.gender : 'outro';

    this.protagonist = new Protagonist(this.app, gender);
    await this.protagonist.load();
    this.protagonist.setPosition(this.protagonistStartX, this.protagonistStartY)

    this.questionUI = new QuestionUI(this.app);
    this.countdownUI = new CountdownUI(this.app);

    const zoneWidth = this.app.screen.width;
    const zoneHeight = this.app.screen.height / 4;
    const zoneTopOffset = this.app.screen.height / 4
    const answareSpacing = 20
    
    this.topZone = new AnswerZone(this.app, 0, zoneTopOffset, zoneWidth, zoneHeight, '');
    this.bottomZone = new AnswerZone(this.app, 0, zoneTopOffset + zoneHeight + answareSpacing, zoneWidth, zoneHeight, '');

    this.displayCurrentQuestion();

    this.app.stage.interactive = true;
    this.app.stage.on('pointerdown', (event) => {
      this.protagonist.moveTo(event.global.x, event.global.y);

      const clickPoint = event.global;

      if (this.topZone?.contains(clickPoint) || this.bottomZone?.contains(clickPoint)) {
        this.countdownUI.start(5, () => {
          if (this.questionAnswered) return;

          if (this.topZone?.contains(this.protagonist.staticSprite.position)) {
            this.handleAnswer(0);
          } else if (this.bottomZone?.contains(this.protagonist.staticSprite.position)) {
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
    this.topZone.text.text = question.choices[0];
    this.bottomZone.text.text = question.choices[1];

    this.protagonist.moveTo(this.protagonistStartX, this.protagonistStartY);
    this.questionAnswered = false;
  }

  handleAnswer(choiceIndex) {
    this.countdownUI.stop();
    this.questionAnswered = true;
    const question = this.questionManager.getCurrentQuestion();
    const score = question.scores[choiceIndex];
    this.profileManager.addPoints(score, 1);

    if (this.questionManager.nextQuestion()) {
      setTimeout(() => this.displayCurrentQuestion(), 500);
    } else {
      const recommendation = this.profileManager.getRecommendation();
      this.questionUI.displayQuestion(
        `Baseado nas suas preferências, eu lhe recomendaria o curso ${recommendation}! \nVocê será redirecionado a uma página que conta um pouco mais sobre esta recomendação em:`
      );
      
      this.app.stage.removeChild(this.topZone.rect);
      this.app.stage.removeChild(this.topZone.text);
      this.topZone = null
      
      this.app.stage.removeChild(this.bottomZone.rect);
      this.app.stage.removeChild(this.bottomZone.text);
      this.bottomZone = null

      if (recommendation === 'Ciência da Computação' || recommendation === 'Engenharia de Software') {

        this.countdownUI.start(5, () => {
          if (recommendation === 'Ciência da Computação') {
            window.location.href = '/cc.html';
          } else if (recommendation === 'Engenharia de Software') {
            window.location.href = '/es.html';
          }
        });
      }
    }
  }
}

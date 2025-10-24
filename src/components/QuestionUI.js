import { Text } from 'pixi.js';

export class QuestionUI {
  constructor(app) {
    this.app = app;
    this.text = null;
  }

  displayQuestion(questionText) {
    if (this.text) {
      this.app.stage.removeChild(this.text);
    }

    this.text = new Text({text: questionText, style: {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: this.app.screen.width - 40,
    }});

    this.text.anchor.set(0.5);
    this.text.position.set(this.app.screen.width / 2, this.app.screen.height / 6);
    this.app.stage.addChild(this.text);
  }
}

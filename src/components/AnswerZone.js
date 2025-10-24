import { Graphics, Text } from 'pixi.js';

export class AnswerZone {
  constructor(app, x, y, width, height, label) {
    this.app = app;
    this.rect = new Graphics();
    this.rect.rect(x, y, width, height);
    this.rect.fill({ color: 0x000000, alpha: 0.2 });
    this.app.stage.addChild(this.rect);

    this.text = new Text({text: label, style: {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: this.app.screen.width / 4
    }});
    this.text.anchor.set(0.5);
    this.text.position.set(x + width / 2, y + height / 2);
    this.app.stage.addChild(this.text);
  }

  contains(point) {
    return this.rect.containsPoint(point);
  }
}

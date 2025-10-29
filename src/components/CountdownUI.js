
import { Text } from 'pixi.js';

export class CountdownUI {
  constructor(app) {
    this.app = app;
    this.text = new Text({
        text: '',
        style: {
            fontFamily: 'Arial',
            fontSize: 72,
            fill: 'white',
            stroke: { color: '#000000', width: 5 },
            align: 'center',
        }
    });
    this.text.anchor.set(0.5);
    this.text.position.set(app.screen.width / 2, app.screen.height / 2);
    this.text.visible = false;
    this.app.stage.addChild(this.text);

    this.interval = null;
  }

  start(seconds, onComplete) {
    this.stop(); // Garante que qualquer contagem anterior seja interrompida

    let remaining = seconds;
    this.text.text = remaining;
    this.text.visible = true;

    this.interval = setInterval(() => {
      remaining--;
      this.text.text = remaining;
      if (remaining <= 0) {
        this.stop();
        onComplete();
      }
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.text.visible = false;
  }
}

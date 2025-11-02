import { Assets, Sprite } from 'pixi.js';

export class Protagonist {
  constructor(app, gender) {
    this.app = app;
    this.gender = gender;
    this.sprite = null;
    this.targetX = 0;
    this.targetY = 0;
  }

  async load() {
    let texturePath;
    if (this.gender === 'feminino') {
      texturePath = '/assets/female.png';
    } else if (this.gender === 'masculino') {
      texturePath = '/assets/male.png';
    } else {
      texturePath = Math.random() < 0.5 ? '/assets/female.png' : '/assets/male.png';
    }

    const texture = await Assets.load(texturePath);
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.3);
    this.app.stage.addChild(this.sprite);
    this.targetX = this.sprite.position.x;
    this.targetY = this.sprite.position.y;
  }

  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  setPosition(x, y) {
    this.sprite.position.set(x, y);
    this.targetX = x;
    this.targetY = y;
  }

  update(time) {
    const speed = 0.1;
    const dx = this.targetX - this.sprite.position.x;
    const dy = this.targetY - this.sprite.position.y;
    this.sprite.position.x += dx * speed * time.deltaTime;
    this.sprite.position.y += dy * speed * time.deltaTime;
  }
}


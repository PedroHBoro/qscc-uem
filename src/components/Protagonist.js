import { Assets, Sprite, AnimatedSprite } from 'pixi.js';

export class Protagonist {
  constructor(app, gender) {
    this.app = app;
    this.gender = gender;
    this.staticSprite = null;
    this.animatedSprite = null;
    this.isMoving = false;
    this.targetX = 0;
    this.targetY = 0;
  }

  async load() {
    let staticAsset, animatedAsset, animationName;

    if (this.gender === 'feminino') {
      staticAsset = '/assets/female.png';
      animatedAsset = '/assets/female_moving_frames.json';
      animationName = 'female_walk';
    } else if (this.gender === 'masculino') {
      staticAsset = '/assets/male.png';
      animatedAsset = '/assets/male_moving_frames.json';
      animationName = 'male_walk';
    } else {
      const isFemale = Math.random() < 0.5;
      staticAsset = isFemale ? '/assets/female.png' : '/assets/male.png';
      animatedAsset = isFemale ? '/assets/female_moving_frames.json' : '/assets/male_moving_frames.json';
      animationName = isFemale ? 'female_walk' : 'male_walk';
    }

    const loadedAssets = await Assets.load([staticAsset, animatedAsset]);
    const staticTexture = loadedAssets[staticAsset];
    const sheet = loadedAssets[animatedAsset];

    this.staticSprite = new Sprite(staticTexture);
    this.staticSprite.anchor.set(0.5);
    this.staticSprite.scale.set(0.3);
    this.app.stage.addChild(this.staticSprite);

    this.animatedSprite = new AnimatedSprite(sheet.animations[animationName]);
    this.animatedSprite.anchor.set(0.5);
    this.animatedSprite.scale.set(0.3);
    this.animatedSprite.animationSpeed = 0.15;
    this.animatedSprite.visible = false;
    this.animatedSprite.play();
    this.app.stage.addChild(this.animatedSprite);

    this.targetX = this.staticSprite.position.x;
    this.targetY = this.staticSprite.position.y;
  }

  moveTo(x, y) {
    this.isMoving = true;
    this.targetX = x;
    this.targetY = y;
  }

  setPosition(x, y) {
    this.staticSprite.position.set(x, y);
    this.animatedSprite.position.set(x, y);
    this.targetX = x;
    this.targetY = y;
  }

  update(time) {
    const speed = 5;
    const dx = this.targetX - this.staticSprite.position.x;
    const dy = this.targetY - this.staticSprite.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < speed * time.deltaTime) {
      this.staticSprite.position.set(this.targetX, this.targetY);
      this.animatedSprite.position.set(this.targetX, this.targetY);
      this.isMoving = false;
    } else {
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * speed * time.deltaTime;
      const moveY = Math.sin(angle) * speed * time.deltaTime;
      
      this.staticSprite.position.x += moveX;
      this.staticSprite.position.y += moveY;
      this.animatedSprite.position.x = this.staticSprite.position.x;
      this.animatedSprite.position.y = this.staticSprite.position.y;
      this.isMoving = true;
    }

    this.animatedSprite.visible = this.isMoving;
    this.staticSprite.visible = !this.isMoving;
  }
}

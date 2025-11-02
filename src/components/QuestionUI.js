import { Graphics, Text, Container } from 'pixi.js';

export class QuestionUI {
  constructor(app) {
    this.app = app;
    this.container = new Container();
    this.container.visible = false;
    this.app.stage.addChild(this.container);
  }

  displayQuestion(questionText) {
    // Clear previous contents
    this.container.removeChildren();

    const bubblePadding = 20;
    const bubbleWidth = this.app.screen.width * 0.6;
    const bubbleX = 100;
    const bubbleY = 30;

    // Create the text
    const question = new Text({
        text: questionText,
        style: {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0x000000, // Black text
            align: 'left',
            wordWrap: true,
            wordWrapWidth: bubbleWidth - (bubblePadding * 2),
            lineHeight: 25
        }
    });
    question.position.set(bubblePadding, bubblePadding);

    const bubbleHeight = question.height + (bubblePadding * 2);

    // Create the speech bubble graphics
    const bubble = new Graphics();
    bubble.beginFill(0xFFFFFF); // White bubble
    bubble.drawRoundedRect(0, 0, bubbleWidth, bubbleHeight, 15);
    bubble.endFill();

    // Create the tail of the bubble
    const tail = new Graphics();
    tail.beginFill(0xFFFFFF);
    tail.moveTo(0, 25);
    tail.lineTo(-20, 40);
    tail.lineTo(0, 55);
    tail.closePath();
    tail.endFill();

    // Add bubble, text, and tail to the container
    this.container.addChild(bubble, question, tail);
    this.container.position.set(bubbleX, bubbleY);
    this.container.visible = true;
  }

  hide() {
    this.container.visible = false;
  }
}
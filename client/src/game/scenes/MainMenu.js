import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class MainMenu extends Scene {
  logoTween

  constructor() {
    super("MainMenu");
  }

  create() {
    let { width, height } = this.sys.game.canvas;
    this.add.image(600, 600, "background");

    this.logo = this.add.image(width/2,height/2, "logo").setDepth(100);
    this.logo.setScale(0.15);

    this.add
      .text(width/2, height/2+100, "Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setDepth(100)
      .setOrigin(0.5);

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start("StartScene");
  }

  moveLogo(vueCallback) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
        y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          vueCallback({
            x: Math.floor(this.logo.x),
            y: Math.floor(this.logo.y),
          });
        },
      });
    }
  }
}

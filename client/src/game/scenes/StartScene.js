import { EventBus } from "../EventBus";
import { Scene } from "phaser";
//import Phaser from 'phaser'
import Matter from "matter-js";
import { Player } from "../models/Player";
//import { TextBox } from '../models/TextBox'
export class StartScene extends Scene {
  constructor() {
    super("StartScene");
    this.viewportWidth = 1024;
    this.viewportHeight = 768;
  }

  create() {
    let { width, height } = this.sys.game.canvas; // Создаем фон, добавляем переменные высоты и ширины кадра.
    this.cameras.main.setBackgroundColor(0x30f0f0);
    this.add.image(width / 2, height / 2, "room");
    this.player = new Player(this, width - 500, height / 2); // Создаем gameObject

    this.door = this.add.sprite(width/2, height); // Создаем объект двери
    this.doorHitbox = this.matter.add.rectangle(
      this.door.x,
      this.door.y,
      this.door.width,
      this.door.height,
      { isSensor: true,},
    );
    this.leftRoom = this.matter.add.trapezoid(
      width/2-1005,
      height/2+100,
      1000,
      500,
      -0.31,
      { isSensor: false, isStatic: true,  },
    );
    this.upRoom = this.matter.add.rectangle(
      width/2,
      height/2-420,
      1000,
      500,
      { isSensor: false, isStatic: true },
    );
    this.rightRoom = this.matter.add.trapezoid(
      width/2+980,
      height/2+100,
      1000,
      500,
      -0.31,
      { isSensor: false, isStatic: true },
    );
    this.downRoomL = this.matter.add.rectangle(
      width/4-50,
      height,
      500,
      50,
      { isSensor: false, isStatic: true },
    );
    this.downRoomR = this.matter.add.rectangle(
      width/2+width/4+40,
      height,
      500,
      50,
      { isSensor: false, isStatic: true },
    );
    this.bed = this.matter.add.rectangle(
      width/2-width/4,
      height/2+40,
      300,
      10,
      { isSensor: false, isStatic: true },
    );
    this.clocks = this.matter.add.rectangle(
      width/2-width/4-50,
      height/2,
      50,
      50,
      { isSensor: false, isStatic: true },
    );
    this.chair = this.matter.add.rectangle(
      width/2+width/4-50,
      height/2-100,
      200, 
      50,
      { isSensor: false, isStatic: true, },
    );
    this.matter.add.gameObject(this.door, this.doorHitbox);
    this.matter.world.add(this.doorHitbox);
    this.matter.world.add(this.player.body);
    this.matter.collision.create(this.player, this.doorHitbox);

    var fullText = "Квартира. Время: 8:00";
    var text = "";

    // Позиционирование текста
    var textObject = this.add.text(
      width / 2 - fullText.length - 150,
      height / 25,
      "Button",
      { fontSize: "30px", fontFamily: "Undertale" },
    );

    var typingTimer = this.time.addEvent({
      delay: 100,
      loop: true,
      callback: function () {
        text += fullText.substring(0, 1);
        fullText = fullText.substring(1);
        textObject.setText(text);

        if (fullText.length === 0) {
          typingTimer.destroy();
        }
      },
      callbackScope: this,
    });
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    if(this.game.config.isOpen){
      this.input.keyboard.manager.enabled = false;
    }
    else
    {
      this.input.keyboard.manager.enabled = true;
    }
    this.player.update();
    const collision = Matter.Collision.collides(
      this.player.body,
      this.doorHitbox,
    );
    if (collision != null && collision.depth >= 30) {
      this.changeScene();
    }
  }

  changeScene() {
    this.scene.start("Scene2");
  }
}

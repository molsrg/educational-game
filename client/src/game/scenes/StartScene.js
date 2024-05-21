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


    const music = this.sound.add('music');
    music.play();
    
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
      { isSensor: false, isStatic: true},
    );
    this.trash = this.matter.add.rectangle(
      width/2+width/4+40,
      height/2+height/4-50,
      30, 
      10,
      { isSensor: false, isStatic: true},
    );
    this.task1 = this.matter.add.rectangle(
      width/2+width/4,
      height/2-50,
      25, 
      25,
      { isSensor: true},
    );
    this.task2 = this.matter.add.rectangle(
      width/2-width/4,
      height/2,
      25, 
      25,
      { isSensor: true},
    );
    this.task3 = this.matter.add.rectangle(
      width/2+width/4+50,
      height/2+height/4,
      25, 
      25,
      { isSensor: true },
    );
    this.matter.add.gameObject(this.door, this.doorHitbox);
    this.matter.world.add(this.doorHitbox);
    this.matter.world.add(this.player.body);
    this.matter.collision.create(this.player, this.doorHitbox);

    var fullText = "В этой комнате находится 3 задания. Найди их!";
    var text = "";

    // Позиционирование текста
    var textObject = this.add.text(
      width / 2 - fullText.length - 260,
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
      this.player.sleep();
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
    let coll_task1 = Matter.Collision.collides(this.player.body,this.task1);
    let coll_task2 = Matter.Collision.collides(this.player.body,this.task2);
    let coll_task3 = Matter.Collision.collides(this.player.body,this.task3);
    let key = 0;
    if (coll_task1){
      key = 1;
    }
    else if (coll_task2){
      key = 2;
    }
    else if(coll_task3){
      key = 3;
    }
    else{
      key = 0;
    }
    switch (key) {
      case 1:
        if (coll_task1.depth >= 30 && !this.collisionOccurred) {
          EventBus.emit('calling-modal', this, 1);
          this.collisionOccurred = true;
          console.log("emited calling modal 1");  
        }
        else if (coll_task1.depth <= 30 && !this.collisionOccurred && !this.game.config.isOpen){
          this.collisionOccurred = false;
        }
        break;
      case 2:
        if ( coll_task2.depth >= 30 && !this.collisionOccurred) {
          EventBus.emit('calling-modal', this, 2);
          this.collisionOccurred = true;
          console.log("emited calling modal 2");  
        }
        else if (coll_task2.depth <= 30 && !this.collisionOccurred && !this.game.config.isOpen){
          this.collisionOccurred = false;
        }
        break;
      case 3:
        if (coll_task3.depth >= 30 && !this.collisionOccurred) {
          EventBus.emit('calling-modal', this, 3);
          this.collisionOccurred = true;
          console.log("emited calling modal 3");  
        }
        else if (coll_task3.depth <= 30 && !this.collisionOccurred && !this.game.config.isOpen){
          this.collisionOccurred = false;
        }
        break;
      case 0:
        this.collisionOccurred = false;
        break;
      default:
        break;
    }
    //console.log(coll_task1,coll_task1,coll_task3,this.collisionOccurred,this.game.config.isOpen,key)
  }

  changeScene() {
    this.scene.start("Scene2");
  }
}

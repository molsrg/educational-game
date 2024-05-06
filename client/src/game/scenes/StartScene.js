import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
//import Phaser from 'phaser'
import Matter from 'matter-js'
import { Player } from '../models/Player'
//import { TextBox } from '../models/TextBox'
export class StartScene extends Scene {
  constructor() {
    super('StartScene')
    this.viewportWidth = 1024;
    this.viewportHeight = 768;
  }

  create() {
    let { width, height } = this.sys.game.canvas; // Создаем фон, добавляем переменные высоты и ширины кадра.
    this.cameras.main.setBackgroundColor(0x30f0f0);
    this.matter.world.setBounds(0,0,width,height,2,1,1,1,1); // Создаем мир Matter
    this.player = new Player(this,width-500,height/2); // Создаем gameObject

    this.door = this.add.sprite(width-50, height/2, 'door'); // Создаем объект двери
    this.doorHitbox = this.matter.add.rectangle(this.door.x, this.door.y, this.door.width, this.door.height, { isSensor: true });
    this.matter.add.gameObject(this.door, this.doorHitbox);
    this.matter.world.add(this.doorHitbox);
    this.matter.world.add(this.player.body);
    this.matter.collision.create(this.player,this.doorHitbox);
    EventBus.emit('current-scene-ready', this)
  }

  update() {
    this.player.update();
    const collision = Matter.Collision.collides(this.player.body,this.doorHitbox);
    if (collision!=null &&
      collision.depth>=30) {
      this.changeScene();
    }
  }

  changeScene() {
    this.scene.start('Scene2')
  }
}

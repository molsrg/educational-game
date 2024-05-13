import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
//import Phaser from 'phaser'
import Matter from 'matter-js'
import { Player } from '../models/Player'
export class Scene2 extends Scene {
  constructor() {
    super('Scene2')
    this.viewportWidth = 1024;
    this.viewportHeight = 768;
  }
  create(){
    let { width, height } = this.sys.game.canvas;
    this.matter.world.setBounds(0,0,width,height,2,1,1,1,1);
    this.player = new Player(this,(this.viewportWidth)/16,(this.viewportHeight)/2);

    this.door = this.add.sprite(500, height/2, 'door'); // Создаем объект двери
    this.doorHitbox = this.matter.add.rectangle(this.door.x, this.door.y, this.door.width, this.door.height, { isSensor: true });
    this.matter.add.gameObject(this.door, this.doorHitbox);
    this.matter.world.add(this.doorHitbox);
    this.matter.world.add(this.player.body);
    this.matter.collision.create(this.player,this.doorHitbox);
    EventBus.emit('current-scene-ready', this);
    this.collisionOccurred = false;
}

  update(){
    if(this.game.config.isOpen){
      this.input.keyboard.manager.enabled = false;
      this.player.sleep();
    }
    else
    {
      this.input.keyboard.manager.enabled = true;
    }
    this.player.update();
    let collision = Matter.Collision.collides(this.player.body, this.doorHitbox);
    if (collision != null && collision.depth >= 30 && !this.collisionOccurred) {
      EventBus.emit('calling-modal', this, 1);
      this.collisionOccurred = true;
      console.log("emited");  
    }
    else if (collision != null && collision.depth <= 30 && !this.collisionOccurred && !this.game.config.isOpen){
      this.collisionOccurred = false;
    }
    else if (collision==null){
      this.collisionOccurred = false;
    }
    
    console.log(collision!=null,collision!=null?collision.depth:"0",this.collisionOccurred)
  }
  changeScene() {
    this.scene.start('GameOver')
  }
}

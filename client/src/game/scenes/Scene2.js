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
    this.add.image(width / 2, height / 2, "room2");
    this.matter.world.setBounds(0,0,width,height,2,1,1,1,1);
    this.player = new Player(this,(width)/4+50,(height)/3+50);

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
    this.table = this.matter.add.rectangle(
      width/2,
      height-height/4-50,
      140,
      10,
      { isSensor: false, isStatic: true },
    );
    this.tv = this.matter.add.trapezoid(
      width/6-width/12,
      height-height/4-100,
      150,
      100,
      -0.31,
      { isSensor: false, isStatic: true },
    );
    this.sofa = this.matter.add.trapezoid(
      width/2+580,
      height/2+200,
      400,
      200,
      -0.31,
      { isSensor: false, isStatic: true },
    );
    this.comp = this.matter.add.rectangle(
      width/2+width/12,
      height/2-height/7,
      350,
      20,
      { isSensor: false, isStatic: true },
    );
    this.chair = this.matter.add.rectangle(
      width/2+width/6,
      height/2-height/16,
      50,
      10,
      { isSensor: false, isStatic: true },
    );
    this.doorHitbox = this.matter.add.rectangle(
      width/2,
      height,
      35,
      35,
      { isSensor: true, isStatic: true },
    );
    this.task4 = this.matter.add.rectangle(
      width/2,
      height/2-height/10,
      25,
      25,
      { isSensor: true},
    );
    this.task5 = this.matter.add.rectangle(
      width/2,
      height/2+height/4,
      25,
      25,
      { isSensor: true},
    );
    this.matter.world.add(this.player.body);
    this.matter.collision.create(this.player,this.doorHitbox);
    this.collisionOccurred = false;
    EventBus.emit('current-scene-ready', this);
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
    const coll = Matter.Collision.collides(
      this.player.body,
      this.doorHitbox,
    );
    if (coll != null && coll.depth >= 15) {
      this.changeScene(); //isAllDone
    }
    let coll_task4 = Matter.Collision.collides(this.player.body,this.task4);
    let coll_task5 = Matter.Collision.collides(this.player.body,this.task5);
    let key = 0;
    if (coll_task4){
      key = 4;
    }
    else if (coll_task5){
      key = 5;
    }
    else{
      key = 0;
    }
    switch (key) {
      case 4:
        if (coll_task4.depth >= 30 && !this.collisionOccurred) {
          EventBus.emit('calling-modal', this, 4);
          this.collisionOccurred = true;
          console.log("emited calling modal 4");  
        }
        else if (coll_task4.depth <= 30 && !this.collisionOccurred && !this.game.config.isOpen){
          this.collisionOccurred = false;
        }
        break;
      case 5:
        if ( coll_task5.depth >= 30 && !this.collisionOccurred) {
          EventBus.emit('calling-modal', this, 5);
          this.collisionOccurred = true;
          console.log("emited calling modal 5");  
        }
        else if (coll_task5.depth <= 30 && !this.collisionOccurred && !this.game.config.isOpen){
          this.collisionOccurred = false;
        }
        break;
      case 0:
        this.collisionOccurred = false;
        break;
      default:
        break;
    }
    //console.log(collision!=null,collision!=null?collision.depth:"0",this.collisionOccurred)
  }
  changeScene() {
    this.scene.start('GameOver')
  }
}

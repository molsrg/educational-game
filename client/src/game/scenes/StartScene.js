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
    this.add.image(width/2, height/2, "room");

    this.door = this.add.sprite(width-50, height/2, 'door'); // Создаем объект двери
    this.doorHitbox = this.matter.add.rectangle(this.door.x, this.door.y, this.door.width, this.door.height, { isSensor: true });
    this.matter.add.gameObject(this.door, this.doorHitbox);
    this.matter.world.add(this.doorHitbox);
    this.matter.world.add(this.player.body);
    this.matter.collision.create(this.player,this.doorHitbox);

    this.matter.collision.create(this.player,this.doorHitbox);
    var fullText = 'Ночь. Крыши частных секторов.';
    var text = '';
    var textObject = this.add.text(width/2-fullText.length-150,height/6, "Button",{fontSize: "30px",fontFamily:"Undertale"})
    var typingTimer = this.time.addEvent({
      delay: 100,
      loop: true,
      callback: function() {
          text += fullText.substring(0, 1);
          fullText = fullText.substring(1);
          textObject.setText(text);

          if (fullText.length === 0) {
              typingTimer.destroy();
          }
      },
      callbackScope: this
  });
    //let t= new TextBox(this,100,width/2-fullText.length,height/6,"РААА",true)
    //t.typing();

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

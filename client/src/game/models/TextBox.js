//import Phaser from "phaser";
//import Matter from "matter-js";

export class TextBox {
    constructor(scene,delay,x,y,text,repeat){
        this.scene = scene;
        this.delay=delay;
        this.x=x;
        this.y=y;
        this.text=text;
        this.repeat=repeat;  
    }
    typing(){
        let textObject = this.scene.add.text(this.x,this.y, "",{fontSize: "30px",fontFamily:"Undertale"})
        let text='';
        let fullText=this.text;
        let typingTimer= this.scene.time.addEvent({
            delay: this.delay,
            loop: false,
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

    }
}
export default class gameOver extends Phaser.Scene {
    constructor() {
      super({ key: "gameOver" });
    }
    //on charge les images
    preload() {
      this.load.image("menu_fond", "assets/img_gameover.png");
      this.load.image("bouton_restart", "assets/bouton_restart.png");
      this.load.image("GameOver (2)","assets/GameOver (2).png");
  
      this.load.audio("perdu", "assets/mixkit-sad-game-over-trombone-471.wav");
      this.load.audio("perdu2","assets/Juhani Junkala [Retro Game Music Pack] Ending.wav");
    }
    create() {
      var musique_perdu2;
      var musique_perdu;
      musique_perdu = this.sound.add("perdu");
      musique_perdu2 = this.sound.add("perdu2");
      musique_perdu.play();
      musique_perdu2.play();
      musique_perdu2.loop = true ;
     // on place les éléments de fond
      this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "menu_fond").setOrigin(0.5);
      this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 100, "GameOver (2)", ).setOrigin(0.5);
  
      //on ajoute un bouton de clic, nommé bouton_restart
      var bouton_restart = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, "bouton_restart").setInteractive().setOrigin(0.5);
  
      //on rend le bouton interratif
      bouton_restart.setInteractive();
  
      //Cas ou la souris passe sur le bouton play
      bouton_restart.on("pointerover", () => {
        bouton_restart.setScale(1.1);
      });
      //Cas ou la souris ne passe plus sur le bouton play
      bouton_restart.on("pointerout", () => {
        bouton_restart.setScale(1);
      });
      //Cas ou la sourris clique sur le bouton play :
      // on lance le niveau 1
      bouton_restart.on("pointerup", () => {
        this.scene.start("Start");//Changer le nom de la scene avec celle d'Oscar
        this.scene.stop("gameOver");
        musique_perdu2.stop();
      });
    }
  } 

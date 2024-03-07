var bouton_play;
var bouton_son
var bruit ;
var musique_de_fond;
var bouton_option ;
var bouton_micro ;
export default class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }
  //on charge les images


  preload() {
    this.load.image("menu_fond", "assets/Forest.png");
    this.load.image("imageBoutonPlay", "assets/Start.png");
    this.load.image("imageBoutonSon", "assets/volume rouge.png");
    this.load.image("imageBoutonOption", "assets/cydia.png");
    this.load.image("imageBoutonNoSon" , "assets/micro rouge.png");
    this.load.audio("Click" , "assets/Menu-Selection-Click.mp3");
    this.load.audio("Son" , "assets/Juhani-Junkala-_Retro-Game-Music-Pack_-Title-Screen.mp3");
    this.load.video("Fond" , "assets/Fond.mp4");
    this.load.image("SOFT" , "assets/SOFT.png");
    
  }

  create() {
    
    

// ajout des sons au gestionnaire sound
// recupération de variables pour manipuler le son
  bruit = this.sound.add("Click");
  musique_de_fond = this.sound.add("Son");
    bruit.volume = 1;
    musique_de_fond.loop = true ;
   // on place les éléments de fond

   // lancement du son background
    musique_de_fond.play(); 

    this.add
      .image(0, 0, "menu_fond")
      .setOrigin(0)
      .setDepth(0);

    this.add.image(500, 200, "SOFT")


    //on ajoute un bouton de clic, nommé bouton_play
    var bouton_play = this.add.image(500, 400, "imageBoutonPlay").setDepth(1);
    var bouton_son = this.add.image(42, 42, "imageBoutonSon").setDepth(1);
    var bouton_option = this.add.image(42, 524, "imageBoutonOption").setDepth(1);
    var bouton_micro = this.add.image(42, 42, "imageBoutonNoSon").setDepth(2);

   
    //=========================================================
    //on rend le bouton interratif
    bouton_play.setInteractive();
    bouton_son.setInteractive();
    bouton_option.setInteractive();
    bouton_micro.setInteractive();

    //Cas ou la souris passe sur le bouton play
    bouton_play.on("pointerover", () => {
      bouton_play.setTint(0xff0000);
      
    });
    
    //Cas ou la souris ne passe plus sur le bouton play
    bouton_play.on("pointerout", () => {
      bouton_play.setTint();
      
    });
     //Cas ou la sourris clique sur le bouton play :
    // on lance le niveau 1

    bouton_play.on("pointerup", () => {
      bruit.play(); 
      this.game.scene.start("Ancient_Forest");
    });
  
      //Cas ou la sourris clique sur le bouton play :
    // on lance le niveau 1
    bouton_son.on("pointerup", () => {
      musique_de_fond.play();
      bouton_micro.setDepth(2);
      bouton_son.setDepth(1)
    });

    bouton_micro.on("pointerup", () => {
      musique_de_fond.stop();
      bouton_micro.setDepth(1);
      bouton_son.setDepth(2)
    });

    bouton_option.on("pointerup", () => {
      bruit.play();
      window.open('assets/Regles.pdf', '_blank'); 
    });
    
   }


  
} 
/*  update () {

    //Cas ou la sourris clique sur le bouton play :
    // on lance le niveau 1

    bouton_play.on("pointerup", () => {
      bruit.play(); 
    });
  
      //Cas ou la sourris clique sur le bouton play :
    // on lance le niveau 1
    bouton_son.on("pointerup", () => {
      musique_de_fond.stop();
      bouton_son.setTint(null);
      bouton_micro.setTint();
    });

    bouton_micro.on("pointerup", () => {
      musique_de_fond.play();
      bouton_micro.setTint(null);
      bouton_son.setTint();
    });

  }
*/




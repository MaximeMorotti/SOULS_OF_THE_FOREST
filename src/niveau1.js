

export default class niveau1 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload() {}
  
    create() {
      
      this.add.image(400, 300, "img_ciel");
      this.porte_retour = this.physics.add.staticSprite(600, 375, "img_porte"); 
      this.groupe_plateformes = this.physics.add.staticGroup();
      this.groupe_plateformes.create(125, 584, "img_plateforme");
      this.groupe_plateformes.create(375, 584, "img_plateforme");
      this.groupe_plateformes.create(625, 584, "img_plateforme");
      this.groupe_plateformes.create(800, 584, "img_plateforme");
      this.groupe_plateformes.create(125, 300, "img_plateforme");
      this.groupe_plateformes.create(675, 450, "img_plateforme");
      this.groupe_plateformes.create(500, 450, "img_plateforme");
      this.groupe_plateformes.create(675, 270, "img_plateforme");
      // ajout d'un texte distintcif  du niveau
      this.add.text(400, 100, "Vous êtes dans le niveau 1", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "22pt"
      });
  
      this.player = this.physics.add.sprite(100, 450, "img_perso");
      this.player.refreshBody();
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.clavier = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.player, this.groupe_plateformes);
      
    }
  
    update() {
      if (this.clavier.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('anim_tourne_gauche', true); 
      } 
      else if (this.clavier.left.isDown) {
        this.player.setVelocityX(-160);
        /*** A COMPLETER : appliquer une vélocité de -160 ***/
        this.player.anims.play('anim_tourne_droite', true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('anime_stand_by', true);
      }
      if (this.clavier.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
      if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
        if (this.physics.overlap(this.player, this.porte_retour)) {
          this.scene.start("selection");
          }
      } 
    }
  }
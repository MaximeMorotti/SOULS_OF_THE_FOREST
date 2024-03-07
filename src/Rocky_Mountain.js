var carteDuNiveau, tilesetDecorativeProps, tilesetMainlevBuild;
var groupe_creeper;
var groupe_ombre;
var groupe_fantome;
var groupe_Ogre;

export default class Rocky_Mountain extends Phaser.Scene { 
    // constructeur de la classe
    constructor() {
      super({
        key: "Rocky_Mountain" //  ici on précise le nom de la classe en tant qu'identifiant 
      });
    }
    preload() {
      // Charger les images des jeux de tuiles
      this.load.image("Decorative_props", "assets/Mountain/Decorative_props.png");
      this.load.image("Mainlev_build", "assets/Mountain/Mainlev_build.png");
      this.load.tilemapTiledJSON("carte", "assets/Mountain/moutain_map.json"); 
    

      this.load.spritesheet("creeper", "assets/Mountain/mobs/creeper.png", {
        frameWidth: 64,
        frameHeight: 64, 
      });
      this.load.spritesheet("ombre", "assets/Mountain/mobs/devil.png", {
        frameWidth: 48,
        frameHeight: 48, 
      });
      this.load.spritesheet("Ogre", "assets/Mountain/mobs/ogre-black_2.png", {
        frameWidth: 128,
        frameHeight: 128, 
      });
      this.load.spritesheet("fantome", "assets/Mountain/mobs/cc-ghost-future-hiddenone_orig.png", {
        frameWidth: 48,
        frameHeight: 48, 
      });
      this.load.image("soccer1", "assets/Mountain/mobs/image.png");
    }
  
    create() {
      
      this.clavier = this.input.keyboard.createCursorKeys();
      this.boutonFeu_0 = this.input.keyboard.addKey('A');  
      this.boutonFeu_1 = this.input.keyboard.addKey('E'); 
      this.boutonFeu_2 = this.input.keyboard.addKey('R'); 

      // Initialisation de la carte
      carteDuNiveau = this.make.tilemap({ key: "carte" });

      // Initialisation des jeux de tuiles
      tilesetDecorativeProps = carteDuNiveau.addTilesetImage("Decorative_props");
      tilesetMainlevBuild = carteDuNiveau.addTilesetImage("Mainlev_build");

      // Chargement des calques avec le bon tileset
      const Background = carteDuNiveau.createLayer("Background", [tilesetDecorativeProps, tilesetMainlevBuild]);
      const chemins = carteDuNiveau.createLayer("chemins", [tilesetDecorativeProps, tilesetMainlevBuild]);
      const Montagnes2 = carteDuNiveau.createLayer("Montagnes2", [tilesetDecorativeProps, tilesetMainlevBuild]);
      const Montagnes = carteDuNiveau.createLayer("Groupe 1/Montagnes", [tilesetDecorativeProps, tilesetMainlevBuild]);

      // Appliquer les collisions pour tous les calques
      Background.setCollisionByProperty({ estSolide: true });
      chemins.setCollisionByProperty({ estSolide: true });
      Montagnes2.setCollisionByProperty({ estSolide: true });
      Montagnes.setCollisionByProperty({ estSolide: true });

      this.player = this.physics.add.sprite(100, 450, "img_perso");
      this.player.refreshBody();
      this.player.setSize(12,30);
      this.player.setOffset(18,7);
      this.player.setCollideWorldBounds(true);
      this.physics.add.overlap(groupeBullets, this.player, hit, null,this);
      
      // Ajouter le joueur à la collision avec chaque calque
      this.physics.add.collider(this.player, Background);
      this.physics.add.collider(this.player, chemins);
      this.physics.add.collider(this.player, Montagnes2);
      this.physics.add.collider(this.player, Montagnes);



      // Configuration de la caméra
      this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
      this.cameras.main.startFollow(this.player);

      this.physics.world.bounds.width = carteDuNiveau.widthInPixels;
      this.physics.world.bounds.height = carteDuNiveau.heightInPixels;

      // Création des animations pour le Creeper
      this.anims.create({
        key: "creeper_left",
        frames: this.anims.generateFrameNumbers("creeper", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "creeper_right",
        frames: this.anims.generateFrameNumbers("creeper", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      // Création des animations pour le fantome
      this.anims.create({
        key: "fantome_left",
        frames: this.anims.generateFrameNumbers("fantome", { start: 2, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "fantome_right",
        frames: this.anims.generateFrameNumbers("fantome", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

      // extraction des points depuis le calque calque_ennemis, stockage dans tab_points
      
      groupe_creeper = this.physics.add.group();
      groupe_ombre = this.physics.add.group();
      groupe_fantome = this.physics.add.group();
      groupe_Ogre = this.physics.add.group();

      this.physics.add.collider(groupe_creeper, Background); 
      this.physics.add.collider(groupe_creeper, chemins); 
      this.physics.add.collider(groupe_creeper, Montagnes2); 
      this.physics.add.collider(groupe_creeper, Montagnes);
    
      this.physics.add.collider(groupe_ombre, Background); 
      this.physics.add.collider(groupe_ombre, chemins); 
      this.physics.add.collider(groupe_ombre, Montagnes2); 
      this.physics.add.collider(groupe_ombre, Montagnes);  

      this.physics.add.collider(groupe_Ogre, Background); 
      this.physics.add.collider(groupe_Ogre, chemins); 
      this.physics.add.collider(groupe_Ogre, Montagnes2); 
      this.physics.add.collider(groupe_Ogre, Montagnes); 
      const tab_points = carteDuNiveau.getObjectLayer("ennemis"); 
//Boucle creeper 
    tab_points.objects.forEach(point => {
      if (point.name == "creeper") {
        var nouveau_creeper = this.physics.add.sprite(point.x, point.y, "creeper").setCollideWorldBounds(true);
        groupe_creeper.add(nouveau_creeper); 
        nouveau_creeper.PV = 10;
      }

//Boucle ombre
      if (point.name == "ombre") {
          var nouvel_ombre = this.physics.add.sprite(point.x, point.y, "ombre").setCollideWorldBounds(true);
          groupe_ombre.add(nouvel_ombre);
          nouvel_ombre.PV = 16;

      }

//Boucle fantome

      if (point.name == "fantome") {
          var nouvel_fantome = this.physics.add.sprite(point.x, point.y, "cc-ghost-future-hiddenone_orig").setCollideWorldBounds(true); 
          groupe_fantome.add(nouvel_fantome);
          nouvel_fantome.PV = 18;
      }

//Boucle Ogre

      if (point.name == "Ogre") {
          var nouvel_Ogre = this.physics.add.sprite(point.x, point.y, "Ogre").setCollideWorldBounds(true); 
          groupe_Ogre.add(nouvel_Ogre);
          nouvel_Ogre.PV = 100;
      }
      });

      groupeBullets = this.physics.add.group();
      
      var monTimer2 = this.time.addEvent({
        delay: 7000, // ms
        callback: function () {
            groupe_ombre.children.iterate(function iterateur(un_ombre) {
                    tirer_ombre(un_ombre);
                });
        },
        args: [],
        callbackScope: this,
        repeat: -1
      }); 

      this.anims.create({
        key: "anim_tourne_L", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 15, end: 17 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_R", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 9, end: 11 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_up", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 3, end: 5 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_up_R", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 6, end: 8 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_up_L", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 2 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_dw", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 21, end: 23 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_dw_R", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 24, end: 26 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      });
      this.anims.create({
        key: "anim_tourne_dw_L", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 18, end: 20 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      });
      this.anims.create({
        key: "anime_stand_by", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 22, end: 22 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anime_flame", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("bullet", { start: 0, end: 41 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 20, // vitesse de défilement des frames
        repeat: 0 // nombre de répétitions de l'animation. -1 = infini
      });
      this.anims.create({
        key: "anime_purple", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("bullet_1", { start: 16, end: 48 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 20, // vitesse de défilement des frames
        repeat: 0 // nombre de répétitions de l'animation. -1 = infini
      });
      this.anims.create({
        key: "anime_bleu", // key est le nom de l'animation : doit etre unique pour la scene.
        frames: this.anims.generateFrameNumbers("bullet_2", { start: 0, end: 15 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 20, // vitesse de défilement des frames
        repeat: 0 // nombre de répétitions de l'animation. -1 = infini
      });

      this.anims.create({
        key: "anim_Ogre",
        frames: this.anims.generateFrameNumbers("The_Ogre", { start: 21, end: 23 }),
        frameRate: 10,
        repeat: 0
      });
      this.anims.create({
        key: "anim_Ogre_stby",
        frames: this.anims.generateFrameNumbers("The_Ogre", { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
      });
      this.anims.create({
        key: "anim_Ogre_P",
        frames: this.anims.generateFrameNumbers("The_Ogre", { start: 24, end: 26 }),
        frameRate: 10,
        repeat: 0
      });

        
    }
  
    update() {
      if ( Phaser.Input.Keyboard.JustDown(this.boutonFeu_0)) {
        tirer(this.player);
        //son_feu.play();
      }  
      if ( Phaser.Input.Keyboard.JustDown(this.boutonFeu_1)) {
        tirer_1(this.player);
        //son_feu.play();
      }  
      if ( Phaser.Input.Keyboard.JustDown(this.boutonFeu_2)) {
        tirer_2(this.player);
        //son_feu.play();
      }  
      if (this.clavier.right.isDown){
        this.player.setVelocityX(160);
        this.player.direction_H = '';
        this.player.direction_L = 'right';
        if (this.clavier.up.isDown) {
          this.player.setVelocityY(-160);
          this.player.direction_H = 'up';
          this.player.anims.play('anim_tourne_up_R', true);
        }
        else if (this.clavier.down.isDown) {
          this.player.setVelocityY(160);
          this.player.direction_H = 'down';
          this.player.anims.play('anim_tourne_dw_R', true);
        }
        else{
          this.player.direction_H = '';
          this.player.setVelocityY(0);
          this.player.anims.play('anim_tourne_L', true); 
        } 
      }
  
      else if (this.clavier.left.isDown) {
        this.player.direction_H = '';
        this.player.setVelocityX(-160);
        this.player.direction_L = 'left';
        if (this.clavier.up.isDown) {
          this.player.setVelocityY(-160);
          this.player.direction_H = 'up';
          this.player.anims.play('anim_tourne_up_L', true);
        }
        else if (this.clavier.down.isDown) {
          this.player.setVelocityY(160);
          this.player.direction_H = 'down';
          this.player.anims.play('anim_tourne_dw_L', true);
        }
        else{
          this.player.direction_H = '';
          this.player.setVelocityY(0);
          this.player.anims.play('anim_tourne_R', true);
        }
      } 
  
      else if (this.clavier.up.isDown) {
        this.player.setVelocityY(-160);
        this.player.direction_L = '';
        this.player.direction_H = 'up';
        if(this.clavier.right.isDown){
          this.player.setVelocityX(160);
          this.player.anims.play('anim_tourne_up_R', true);
          this.player.direction_L = 'right';
        }
        else if(this.clavier.left.isDown){
          this.player.setVelocityX(-160);
          this.player.anims.play('anim_tourne_up_L', true);
          this.player.direction_L = 'left';
        }
        else{
          this.player.direction_L = '';
          this.player.setVelocityX(0);
          this.player.anims.play('anim_tourne_up', true);
        }
      } 
  
      else if (this.clavier.down.isDown) {
        this.player.setVelocityY(160);
        this.player.direction_L = '';
        this.player.direction_H = 'down';
        if(this.clavier.right.isDown){
          this.player.setVelocityX(160);
          this.player.anims.play('anim_tourne_dw_R', true);
          this.player.direction_L = 'right';
        }
        else if(this.clavier.left.isDown){
          this.player.setVelocityX(-160);
          this.player.anims.play('anim_tourne_dw_L', true);
          this.player.direction_L = 'left';
        }
        else{
          this.player.direction_L = '';
          this.player.setVelocityX(0);
          this.player.anims.play('anim_tourne_dw', true);
        }
      }
  
      else{
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('anime_stand_by', true);
      }
      var ballesADetruire = []; // Tableau temporaire pour stocker les balles à détruire
  
      groupeBullets.children.iterate(function (bullet) {
        // Vérifie si la balle a dépassé la limite par rapport à sa position initiale et à son type
        if (bullet.texture.key === "bullet" && (bullet.x >= bullet.positionInitialeX + 350 || bullet.x <= bullet.positionInitialeX - 350 || bullet.y >= bullet.positionInitialeY + 350 || bullet.y <= bullet.positionInitialeY - 350)) {
          ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
        } else if (bullet.texture.key === "bullet_1" && (bullet.x >= bullet.positionInitialeX + 200 || bullet.x <= bullet.positionInitialeX - 200)) {
          ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
        } else if (bullet.texture.key === "bullet_2" && (bullet.x >= bullet.positionInitialeX + 100 || bullet.x <= bullet.positionInitialeX - 100)) {
          ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
        }
      });
  
      // Détruit les balles après avoir terminé l'itération
      ballesADetruire.forEach(function (balle) {
        balle.destroy();
      });
      groupe_creeper.children.iterate(function (un_creeper) {

        // Logique pour déterminer la direction horizontale
        if (this.player.x < un_creeper.x) {
            un_creeper.setVelocityX(-60); 
            un_creeper.anims.play("creeper_left", true);
        } else if (this.player.x > un_creeper.x) {
            un_creeper.setVelocityX(60); 
            un_creeper.anims.play("creeper_right", true);
        } else {
            un_creeper.setVelocityX(0); 
        }
  
        // Logique pour déterminer la direction verticale
        if (this.player.y < un_creeper.y) {
            un_creeper.setVelocityY(-70); 
        } else if (this.player.y > un_creeper.y) {
            un_creeper.setVelocityY(70);
        } else {
            un_creeper.setVelocityY(0); 
        }
        if (this.physics.world.overlap(this.player, un_creeper)) {
  
        }
    }, this);
  
      // Déplacement des fantomes vers le joueur
      groupe_fantome.children.iterate(function (un_fantome) {
  
        // Logique pour déterminer la direction horizontale
        if (this.player.x < un_fantome.x) {
            un_fantome.setVelocityX(-20); 
            un_fantome.anims.play("fantome_left", true);
        } else if (this.player.x > un_fantome.x) {
            un_fantome.setVelocityX(20); 
            un_fantome.anims.play("fantome_right", true);
        } else {
            un_fantome.setVelocityX(0); 
        }
  
        // Logique pour déterminer la direction verticale
        if (this.player.y < un_fantome.y) {
            un_fantome.setVelocityY(-20); 
        } else if (this.player.y > un_fantome.y) {
            un_fantome.setVelocityY(20); 
        } else {
            un_fantome.setVelocityY(0); 
        }
        if (this.physics.world.overlap(this.player, un_fantome)) {
  
        }
    }, this);
    }

  }

  function tirer_ombre(ombre){
    // mesasge d'alerte affichant les attributs de player
        var coefDirX;
        var coefDirY;
        
    coefDirX=1
    coefDirY=-1
    
        // on crée la balle a coté du joueur
        var bullet1 = groupeBullets.create(ombre.x, ombre.y, 'soccer1');
        var bullet2 = groupeBullets.create(ombre.x, ombre.y, 'soccer1');
        var bullet3 = groupeBullets.create(ombre.x, ombre.y, 'soccer1');
        var bullet4 = groupeBullets.create(ombre.x, ombre.y, 'soccer1');
        // parametres physiques de la balle.
        bullet1.setCollideWorldBounds(true);
        bullet1.body.allowGravity =false;
        bullet1.setVelocity(60* coefDirX, 0); // vitesse en x et en y
        bullet1.body.onWorldBounds = true; 
        bullet2.setCollideWorldBounds(true);
        bullet2.body.allowGravity =false;
        bullet2.setVelocity(60* coefDirY, 0); // vitesse en x et en y
        bullet2.body.onWorldBounds = true; 
        bullet3.setCollideWorldBounds(true);
        bullet3.body.allowGravity =false;
        bullet3.setVelocity(0, 60* coefDirY); // vitesse en x et en y
        bullet3.body.onWorldBounds = true;
        bullet4.setCollideWorldBounds(true);
        bullet4.body.allowGravity =false;
        bullet4.setVelocity(0, 60* coefDirX); // vitesse en x et en y
        bullet4.body.onWorldBounds = true;
      }
       
  
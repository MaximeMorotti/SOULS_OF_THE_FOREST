
/* variables globales accessibles dans toutes les fonctions */

var player;
var clavier;
var carteDuNiveau, tilesetDecorativeProps, tilesetMainlevBuild;
var groupe_Orc ;
var groupe_Loup ;
var groupe_Plante ;
var groupe_Chimere;
// Définir une distance de déplacement pour les Loups
var distanceDeplacement = 80;
var vitesseDeplacement = 1.5;
// Ajustez la vitesse selon vos besoins
var timer = true;
var groupeBullets;
var groupeBullets_P;
var bullet1;
var bullet2;
var bullet3;
var bullet4;
var bullet5;
var bullet6;
var bullet7;
var bullet8;
// mise en place d'une variable boutonFeu
var boutonFeu_0; 
var boutonFeu_1; 
var boutonFeu_2; 
var porte_ouvert = false;
// mise en place d'une variable groupeBullets


// définition de la classe "selection"
export default class Ancient_Forest extends Phaser.Scene {
 
  constructor() {
     super({key : "Ancient_Forest"}); // mettre le meme nom que le nom de la classe
  }

/***********************************************************************/
/** PRELOAD
/***********************************************************************/
 
  preload() {
    //this.load.image("img_porte", 'src/assets/porte.png');
    this.load.spritesheet("img_perso", "assets/perso.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    // Charger les images des jeux de tuiles
    this.load.image("Decorative", "assets/Forest/Decorative.png");
    this.load.image("Ancient_Forest", "assets/Forest/MainLev.png");
    this.load.tilemapTiledJSON("carte_F", "assets/Forest/ANCIENT_FOREST.json");
    //Charger les mob
    this.load.spritesheet("img_Chimere", "assets/Forest/mobs/chimera-default_3.png", {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("piafs", "assets/Forest/mobs/piafs.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("piaf_attaque", "assets/Forest/mobs/piaf_attaque.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("img_Orc", "assets/Forest/mobs/orcs.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("img_Plante", "assets/Forest/mobs/plant-default_2.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    // chargement des images de balles.png
    this.load.spritesheet("bullet", "assets/weapon/explosion_flame_(1).png",{
      frameWidth: 18,
      frameHeight: 17,
    });  
    this.load.spritesheet("bullet_1", "assets/weapon/purple_energie.png",{
      frameWidth: 40,
      frameHeight: 40,
    }); 
    this.load.spritesheet("bullet_2", "assets/weapon/bleu_energie_ball.png",{
      frameWidth: 57.5,
      frameHeight: 60,
    });
    this.load.spritesheet("Tornades", "assets/weapon/Tornades.png", {
      frameWidth: 66.625,
      frameHeight: 70
    });
    this.load.spritesheet("nuage_poison_vert", "assets/weapon/nuage_poison_vert.png", {
      frameWidth: 67.68,
      frameHeight: 68.5
    });
    this.load.spritesheet("boule_gaz_plante", "assets/weapon/boule_gaz_plante.png", {
      frameWidth: 20,
      frameHeight: 19
    }); 

    this.load.image("img_porte", 'assets/puerta (002).png');
  }
  
    
/***********************************************************************/
/** CREAT
/***********************************************************************/

  create() {
    groupeBullets = this.physics.add.group();
    groupeBullets_P = this.physics.add.group();

    // Initialisation de la carte
    carteDuNiveau = this.make.tilemap({ key: "carte_F" });
  
    // Initialisation des jeux de tuiles
    tilesetDecorativeProps = carteDuNiveau.addTilesetImage("Decorative");
    tilesetMainlevBuild = carteDuNiveau.addTilesetImage("Ancient_Forest");
  
    // Chargement des calques avec le bon tileset
    const Herbe = carteDuNiveau.createLayer("Herbe", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Eau = carteDuNiveau.createLayer("Eau", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Bords = carteDuNiveau.createLayer("Bords", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Terre = carteDuNiveau.createLayer("Terre", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Ponts = carteDuNiveau.createLayer("Ponts", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Volumes2 = carteDuNiveau.createLayer("Volumes2", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Volumes = carteDuNiveau.createLayer("Volumes", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Arbres1 = carteDuNiveau.createLayer("Arbres1", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Arbres2 = carteDuNiveau.createLayer("Arbres2", [tilesetDecorativeProps, tilesetMainlevBuild]);
    const Arbres3 = carteDuNiveau.createLayer("Arbres3", [tilesetDecorativeProps, tilesetMainlevBuild]);
  
    // Appliquer les collisions pour tous les calques
    Bords.setCollisionByProperty({ estSolide: true });
    Ponts.setCollisionByProperty({ estSolide: true });
    Volumes2.setCollisionByProperty({ estSolide: true });
    Volumes.setCollisionByProperty({ estSolide: true });
    Eau.setCollisionByProperty({ estSolide: true });

    
    player = this.physics.add.sprite(100, 450, "img_perso");
    player.setCollideWorldBounds(true);
    player.setSize(12,30);
    player.setOffset(18,7);
    player.PV =1;
    this.physics.add.overlap(groupeBullets, player, hit, null,this);
    // Ajouter le joueur à la collision avec chaque calque
    this.physics.add.collider(player, Bords);
    this.physics.add.collider(player, Volumes2);
    this.physics.add.collider(player, Volumes);
    this.physics.add.collider(player, Ponts);
    this.physics.add.collider(player, Eau);

    clavier = this.input.keyboard.createCursorKeys();
    boutonFeu_0 = this.input.keyboard.addKey('A');  
    boutonFeu_1 = this.input.keyboard.addKey('E'); 
    boutonFeu_2 = this.input.keyboard.addKey('R'); 

    

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
      key: "Loup_tourne_bas",
      frames: this.anims.generateFrameNumbers("piafs", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: "Loup_tourne_gauche",
      frames: this.anims.generateFrameNumbers("piafs", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Loup_tourne_droite",
      frames: this.anims.generateFrameNumbers("piafs", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Loup_tourne_haut",
      frames: this.anims.generateFrameNumbers("piafs", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Chimere_tourne_gauche",
      frames: this.anims.generateFrameNumbers("img_Chimere", { start: 15, end: 17 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Orc_tourne_gauche",
      frames: this.anims.generateFrameNumbers("img_Orc", { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Orc_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_Orc", { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Orc_tourne_haut",
      frames: this.anims.generateFrameNumbers("img_Orc", { start: 36, end: 38 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Orc_tourne_bas",
      frames: this.anims.generateFrameNumbers("img_Orc", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Orc_stand",
      frames: this.anims.generateFrameNumbers("img_Orc", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Plante_stand",
      frames: this.anims.generateFrameNumbers("img_Plante", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Tornades",
      frames: this.anims.generateFrameNumbers("Tornades", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Chimere_pattern1",
      frames: this.anims.generateFrameNumbers("img_Chimere", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "Chimere_pattern2",
      frames: this.anims.generateFrameNumbers("img_Chimere", { start: 9, end: 14 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "nuage_poison_vert",
      frames: this.anims.generateFrameNumbers("nuage_poison_vert", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "Plante_attaque",
      frames: this.anims.generateFrameNumbers("img_Plante", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "Chimere_stand",
      frames: this.anims.generateFrameNumbers("img_Chimere", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "bullet_plante",
      frames: this.anims.generateFrameNumbers("boule_gaz_plante", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    // création d'un groupe d'éléments vide
    
    this.physics.world.on("worldbounds", function(body) {
      // on récupère l'objet surveillé
      var objet = body.gameObject;
      // s'il s'agit d'une balle
      if (groupeBullets.contains(objet) || groupeBullets_P.contains(objet)) {
          // on le détruit
          objet.destroy();
      }
    });
    // Configuration de la caméra
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.startFollow(player);

    this.physics.world.bounds.width = carteDuNiveau.widthInPixels;
    this.physics.world.bounds.height = carteDuNiveau.heightInPixels;
    player.setCollideWorldBounds(true);
    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
  const tab_points = carteDuNiveau.getObjectLayer("Ennemis");

  // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
  groupe_Loup = this.physics.add.group();
  groupe_Orc = this.physics.add.group();
  groupe_Plante = this.physics.add.group();
  groupe_Chimere = this.physics.add.group();

  this.physics.add.collider(groupe_Loup, player);
  this.physics.add.collider(groupe_Orc, player);

  tab_points.objects.forEach(point => {
    if (point.name == "Loup") {
      var nouveauLoup = this.physics.add.sprite(point.x, point.y, "piafs").setCollideWorldBounds(true);
      nouveauLoup.setCollideWorldBounds(true);
      groupe_Loup.add(nouveauLoup);
      nouveauLoup.PV = 7;
      nouveauLoup.patiente = false;
    } else if (point.name == "Orc") {
      var nouvelOrc = this.physics.add.sprite(point.x, point.y, "img_Orc").setCollideWorldBounds(true);
      nouvelOrc.setCollideWorldBounds(true);
      groupe_Orc.add(nouvelOrc);
      nouvelOrc.PV = 13;
      nouvelOrc.patiente = false ;
    } else if (point.name == "Plante") {
      var nouvellePlante = this.physics.add.sprite(point.x, point.y, "img_Plante").setCollideWorldBounds(true);
      nouvellePlante.setCollideWorldBounds(true);
      groupe_Plante.add(nouvellePlante);
      nouvellePlante.PV = 19;
    } else {
      var nouvelleChimere = this.physics.add.sprite(point.x, point.y, "img_Chimere").setCollideWorldBounds(true);
      nouvelleChimere.setCollideWorldBounds(true);
      groupe_Chimere.add(nouvelleChimere);
      nouvelleChimere.PV = 75;
      nouvelleChimere.patiente = false ;
    }
  });
  
  this.porte = this.physics.add.staticSprite(150, 200, "img_porte");
  this.porte.setSize(50,90);
  this.porte.setOffset(75,50);
  
  //this.physics.add.collider(player, groupe_Loup);
  //this.physics.add.collider(player, groupe_Orc);
  //this.physics.add.collider(player, groupe_Plante);
  //this.physics.add.collider(player, groupe_Chimere);
  this.physics.add.collider(groupe_Orc, groupe_Loup);
  this.physics.add.collider(groupe_Orc, groupe_Orc);
  this.physics.add.collider(groupe_Loup, groupe_Loup);
  this.physics.add.collider(groupe_Orc, Bords);
  this.physics.add.collider(groupe_Orc, Volumes2);
  this.physics.add.collider(groupe_Orc, Volumes);
  this.physics.add.collider(groupe_Orc, Ponts);
  this.physics.add.collider(groupe_Orc, Eau);
  this.physics.add.collider(groupe_Loup, Bords);
  this.physics.add.collider(groupe_Loup, Volumes2);
  this.physics.add.collider(groupe_Loup, Volumes);
  this.physics.add.collider(groupe_Loup, Ponts);
  this.physics.add.collider(groupe_Loup, Eau);
  this.physics.add.collider(groupe_Plante, Bords);
  this.physics.add.collider(groupe_Plante, Volumes2);
  this.physics.add.collider(groupe_Plante, Volumes);
  this.physics.add.collider(groupe_Plante, Ponts);
  this.physics.add.collider(groupe_Plante, Eau);
  this.physics.add.collider(groupe_Chimere, Bords);
  this.physics.add.collider(groupe_Chimere, Volumes2);
  this.physics.add.collider(groupe_Chimere, Volumes);
  this.physics.add.collider(groupe_Chimere, Ponts);
  this.physics.add.collider(groupe_Chimere, Eau);

  this.physics.add.overlap(groupeBullets_P, groupe_Orc, hit, null,this);
  this.physics.add.overlap(groupeBullets_P, groupe_Loup, hit, null,this);
  this.physics.add.overlap(groupeBullets_P, groupe_Plante, hit, null,this);
  this.physics.add.overlap(groupeBullets_P, groupe_Chimere, hit, null,this);

  this.physics.add.overlap(groupe_Loup, player, hit_L, null,this);
  this.physics.add.overlap(groupe_Orc, player, hit_O, null,this);

  var coefDirX;
  var coefDirY;

  var monTimer = this.time.addEvent({
    delay: 2300, // ms
    callback: function () {
      timer = false;
      
      groupe_Chimere.children.iterate(function (une_Chimere) {
      if ( Math.abs(player.x - une_Chimere.x) < 600 && Math.abs(player.y - une_Chimere.y) < 600) {
      une_Chimere.anims.play('Chimere_stand', false);
      une_Chimere.anims.play('Chimere_pattern1', true);
      tirer_Chimere(player, une_Chimere)
    }})
      var st1 = this.time.addEvent({
        delay: 400, // ms
        callback: function () {
          timer = true;
        },
        args: [],
        callbackScope: this,
        repeat: 0
      });
      var massue = this.time.addEvent({
        delay: 400, // ms
        callback: function () {
          timer = false;
          groupe_Chimere.children.iterate(function (une_Chimere) {
          if ( Math.abs(player.x - une_Chimere.x) < 400 && Math.abs(player.y - une_Chimere.y) < 400) {
          une_Chimere.anims.play('Chimere_stand', false);
          une_Chimere.anims.play('Chimere_pattern2', true);
          tirer_P(une_Chimere)   
          }})
          var st2 = this.time.addEvent({
            delay: 900, // ms
            callback: function () {
              timer = true;
            },
            args: [],
            callbackScope: this,
            repeat: 0
          });
        },
        args: [],
        callbackScope: this,
        repeat: 0
      });
    },
    args: [],
    callbackScope: this,
    repeat: -1
   
})


      
var monTimer = this.time.addEvent({
  delay: 1000, // ms
  callback: function () {
    groupe_Plante.children.iterate(function iterateur(une_Plante) {
      if ( Math.abs(player.x - une_Plante.x) < 300 && Math.abs(player.y - une_Plante.y) < 300) {
        une_Plante.anims.play("Plante_stand", false);
        setTimeout(function () {
          une_Plante.anims.play("Plante_attaque", true);
        },100)
        coefDirX=player.x-une_Plante.x
        coefDirY=player.y-une_Plante.y
        // on crée la balle a coté du joueur
        var bullet = groupeBullets.create(une_Plante.x+1, une_Plante.y+1, 'boule_gaz_plante');
        bullet.anims.play('bullet_plante',true)
        // parametres physiques de la balle.
        bullet.positionInitialeX = bullet.x;
        bullet.positionInitialeY = bullet.y;
        bullet.setCollideWorldBounds(true);
        bullet.body.allowGravity =false;
        bullet.setVelocity(1* coefDirX, 1* coefDirY); // vitesse en x et en y
        bullet.body.onWorldBounds = true; 
        if(Math.abs(bullet.x - une_Plante.x) < 0.01 && Math.abs(bullet.y - une_Plante.y) <0.01){
          bullet.destroy();
        };
      } else {
        une_Plante.anims.play("Plante_attaque", false);
        une_Plante.anims.play("Plante_stand", true);
      }
    });
  },
  args: [],
  callbackScope: this,
  repeat: -1
});};


/***********************************************************************/
/**  update 
/***********************************************************************/
 
  update()  { 

    groupe_Chimere.children.iterate(function (une_chimere) {
      // Vérifie si les points de vie de la chimère sont inférieurs ou égaux à zéro
      if (une_chimere.PV <= 0) {
          porte_ouvert = true;
          console.log("porte ouvert");
      }
    });



    if ( Phaser.Input.Keyboard.JustDown(boutonFeu_0)) {
      tirer(player);
      //son_feu.play();
    }  
    if ( Phaser.Input.Keyboard.JustDown(boutonFeu_1)) {
      tirer_1(player);
      //son_feu.play();
    }  
    if ( Phaser.Input.Keyboard.JustDown(boutonFeu_2)) {
      tirer_2(player);
      //son_feu.play();
    }  
    if (clavier.right.isDown){
      player.setVelocityX(160);
      player.direction_H = '';
      player.direction_L = 'right';
      if (clavier.up.isDown) {
        player.setVelocityY(-160);
        player.direction_H = 'up';
        player.anims.play('anim_tourne_up_R', true);
      }
      else if (clavier.down.isDown) {
        player.setVelocityY(160);
        player.direction_H = 'down';
        player.anims.play('anim_tourne_dw_R', true);
      }
      else{
        player.direction_H = '';
        player.setVelocityY(0);
        player.anims.play('anim_tourne_L', true); 
      } 
    }

    else if (clavier.left.isDown) {
      player.direction_H = '';
      player.setVelocityX(-160);
      player.direction_L = 'left';
      if (clavier.up.isDown) {
        player.setVelocityY(-160);
        player.direction_H = 'up';
        player.anims.play('anim_tourne_up_L', true);
      }
      else if (clavier.down.isDown) {
        player.setVelocityY(160);
        player.direction_H = 'down';
        player.anims.play('anim_tourne_dw_L', true);
      }
      else{
        player.direction_H = '';
        player.setVelocityY(0);
        player.anims.play('anim_tourne_R', true);
      }
    } 

    else if (clavier.up.isDown) {
      player.setVelocityY(-160);
      player.direction_L = '';
      player.direction_H = 'up';
      if(clavier.right.isDown){
        player.setVelocityX(160);
        player.anims.play('anim_tourne_up_R', true);
        player.direction_L = 'right';
      }
      else if(clavier.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('anim_tourne_up_L', true);
        player.direction_L = 'left';
      }
      else{
        player.direction_L = '';
        player.setVelocityX(0);
        player.anims.play('anim_tourne_up', true);
      }
    } 

    else if (clavier.down.isDown) {
      player.setVelocityY(160);
      player.direction_L = '';
      player.direction_H = 'down';
      if(clavier.right.isDown){
        player.setVelocityX(160);
        player.anims.play('anim_tourne_dw_R', true);
        player.direction_L = 'right';
      }
      else if(clavier.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('anim_tourne_dw_L', true);
        player.direction_L = 'left';
      }
      else{
        player.direction_L = '';
        player.setVelocityX(0);
      player.anims.play('anim_tourne_dw', true);
      }
    }

    else{
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.anims.play('anime_stand_by', true);
    }
    var ballesADetruire = []; // Tableau temporaire pour stocker les balles à détruire

    groupeBullets_P.children.iterate(function (bullet) {
      // Vérifie si la balle a dépassé la limite par rapport à sa position initiale et à son type
      if (bullet.texture.key === "bullet" && (bullet.x >= bullet.positionInitialeX + 350 || bullet.x <= bullet.positionInitialeX - 350 || bullet.y >= bullet.positionInitialeY + 350 || bullet.y <= bullet.positionInitialeY - 350)) {
        ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
      } else if (bullet.texture.key === "bullet_1" && (bullet.x >= bullet.positionInitialeX + 200 || bullet.x <= bullet.positionInitialeX - 200)) {
        ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
      } else if (bullet.texture.key === "bullet_2" && (bullet.x >= bullet.positionInitialeX + 100 || bullet.x <= bullet.positionInitialeX - 100)) {
        ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
      }
    });

    groupeBullets.children.iterate(function (bullet) {
      // Vérifie si la balle a dépassé la limite par rapport à sa position initiale et à son type
      if (bullet.texture.key === "Tornades" && (bullet.x >= bullet.positionInitialeX + 500 || bullet.x <= bullet.positionInitialeX - 500 || bullet.y >= bullet.positionInitialeY + 500 || bullet.y <= bullet.positionInitialeY - 500)) {
        ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
      } else if ((bullet.texture.key === "boule_gaz_plante") && (bullet.x >= bullet.positionInitialeX + 250 || bullet.x <= bullet.positionInitialeX - 250 || bullet.y >= bullet.positionInitialeY + 250 || bullet.y <= bullet.positionInitialeY - 250)) {
        ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire});
      } else if ((bullet.texture.key === "nuage_poison_vert") && (bullet.x >= bullet.positionInitialeX + 250 || bullet.x <= bullet.positionInitialeX - 250 || bullet.y >= bullet.positionInitialeY + 250 || bullet.y <= bullet.positionInitialeY - 250)) {
        ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire});
      }});

    // Détruit les balles après avoir terminé l'itération
    ballesADetruire.forEach(function (balle) {
      balle.destroy();
    });

    groupe_Chimere.children.iterate(function iterateur(une_Chimere) {
      if (timer == true){
        une_Chimere.anims.play('Chimere_stand', true);
      }}, this);

    groupe_Loup.children.iterate(function iterateur(un_Loup) {
      if (Math.abs(Math.sqrt((player.x - un_Loup.x) * (player.x - un_Loup.x)) + Math.sqrt((player.y - un_Loup.y) * (player.y - un_Loup.y)) < 200)) {
  
        // Déplacement des Creepers vers le joueur
  
        // Logique pour déterminer la direction horizontale
        if (player.x < un_Loup.x) {
          un_Loup.setVelocityX(-70); // Déplacement vers la gauche
          un_Loup.anims.play("Loup_tourne_gauche", true);
        } else if (player.x > un_Loup.x) {
          un_Loup.setVelocityX(70); // Déplacement vers la droite
          un_Loup.anims.play("Loup_tourne_droite", true);
        } else {
          un_Loup.anims.play("Loup_tourne_droite", false);
          un_Loup.anims.play("Loup_tourne_gauche", false);
          deplacerEtPatienterLoup.call(this, un_Loup);
        }
  
        // Logique pour déterminer la direction verticale
        if (player.y < un_Loup.y) {
          un_Loup.setVelocityY(-70); // Déplacement vers le haut
          un_Loup.anims.play("Loup_tourne_haut", true);
        } else if (player.y > un_Loup.y) {
          un_Loup.setVelocityY(70); // Déplacement vers le bas
          un_Loup.anims.play("Loup_tourne_bas", true);
        } else {
          deplacerEtPatienterLoup.call(this, un_Loup);
          un_Loup.anims.play("Loup_tourne_bas", false);
          un_Loup.anims.play("Loup_tourne_haut", false);
          
        }
      
      } 
      else {
        if (un_Loup.patiente == false) {
          un_Loup.patiente=true;
          console.log(" il patiente");
          deplacerEtPatienterLoup.call(this, un_Loup);
        }
      }}, this);
  
  groupe_Orc.children.iterate(function iterateur(un_Orc) {
    if (Math.abs(Math.sqrt((player.x - un_Orc.x) * (player.x - un_Orc.x)) + Math.sqrt((player.y - un_Orc.y) * (player.y - un_Orc.y)) < 120)) {
  
      // Déplacement des Creepers vers le joueur
  
      // Logique pour déterminer la direction horizontale
      if (player.x < un_Orc.x) {
        un_Orc.setVelocityX(-50); // Déplacement vers la gauche
        un_Orc.anims.play("Orc_tourne_gauche", true);
      } else if (player.x > un_Orc.x) {
        un_Orc.setVelocityX(50); // Déplacement vers la droite
        un_Orc.anims.play("Orc_tourne_droite", true);
      } else {
        un_Orc.anims.play("Orc_tourne_droite", false);
        un_Orc.anims.play("Orc_tourne_gauche", false);
        deplacerEtPatienterOrc.call(this, un_Orc);
      }
  
      // Logique pour déterminer la direction verticale
      if (player.y < un_Orc.y) {
        un_Orc.setVelocityY(-50); // Déplacement vers le haut
        un_Orc.anims.play("Orc_tourne_haut", true);
      } else if (player.y > un_Orc.y) {
        un_Orc.setVelocityY(50); // Déplacement vers le bas
        un_Orc.anims.play("Orc_tourne_bas", true);
      } else {
        deplacerEtPatienterOrc.call(this, un_Orc);
        un_Orc.anims.play("Orc_tourne_bas", false);
        un_Orc.anims.play("Orc_tourne_haut", false);
        
      }
    
    } 
    else {
      if (un_Orc.patiente == false) {
        un_Orc.patiente=true;
        console.log(" il patiente");
        deplacerEtPatienterOrc.call(this, un_Orc);
      }
    }}, this);

    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true ) {
      if (this.physics.overlap(player, this.porte)) {
        this.scene.start("Swamp");
        this.scene.stop("Ancient_Forest");
      }
    } 
  }
}

/***********************************************************************/
/** FONCTION TIRER 
/***********************************************************************/

//fonction tirer( ), prenant comme paramètre l'auteur du tir
function tirer(player) {
  var coefDir_L;
  var coefDir_H;
  if (player.direction_L == 'left') { 
      coefDir_L = -1; 
      // on crée la balle a coté du joueur
      var bullet = groupeBullets_P.create(player.x + (25 * coefDir_L), player.y - 4, 'bullet');
      bullet.setSize(10,10);
      bullet.setOffset(3,5);
      // parametres physiques de la balle.
      bullet.positionInitialeX = bullet.x;
      bullet.positionInitialeY = bullet.y;
      // on acive la détection de l'evenement "collision au bornes"
      bullet.body.onWorldBounds = true;  
      bullet.body.allowGravity =false;
      bullet.setVelocity(200 * coefDir_L, 0); // vitesse en x et en y
      bullet.anims.play('anime_flame',true);
  } else if (player.direction_L == 'right') { 
      coefDir_L = 1 
      // on crée la balle a coté du joueur
      var bullet = groupeBullets_P.create(player.x + (25 * coefDir_L), player.y - 4, 'bullet');
      bullet.setSize(10,10);
      bullet.setOffset(3,5);
      // parametres physiques de la balle.
      bullet.positionInitialeX = bullet.x;
      bullet.positionInitialeY = bullet.y;
      // on acive la détection de l'evenement "collision au bornes"
      bullet.body.onWorldBounds = true;  
      bullet.body.allowGravity =false;
      bullet.setVelocity(200 * coefDir_L, 0); // vitesse en x et en y
      bullet.anims.play('anime_flame',true);
  }else if (player.direction_H == 'up') { 
      coefDir_H = -1;
      // on crée la balle a coté du joueur
      var bullet = groupeBullets_P.create(player.x + 4, player.y + (25 * coefDir_H), 'bullet');
      bullet.setSize(10,10);
      bullet.setOffset(3,5);
      // parametres physiques de la balle.
      bullet.positionInitialeX = bullet.x;
      bullet.positionInitialeY = bullet.y;
      // on acive la détection de l'evenement "collision au bornes"
      bullet.body.onWorldBounds = true;  
      bullet.body.allowGravity =false;
      bullet.setVelocity(0, 200 * coefDir_H); // vitesse en x et en y 
      bullet.anims.play('anime_flame',true);
  } else if(player.direction_H == 'down') { 
      coefDir_H = 1;
      // on crée la balle a coté du joueur
      var bullet = groupeBullets_P.create(player.x - 4 , player.y + (25 * coefDir_H), 'bullet');
      bullet.setSize(10,10);
      bullet.setOffset(3,5);
      // parametres physiques de la balle.
      bullet.positionInitialeX = bullet.x;
      bullet.positionInitialeY = bullet.y;
      // on acive la détection de l'evenement "collision au bornes"
      bullet.body.onWorldBounds = true;  
      bullet.body.allowGravity =false;
      bullet.setVelocity(0, 200 * coefDir_H); // vitesse en x et en y 
      bullet.anims.play('anime_flame',true); 
  }
  
    
}
  
function tirer_1(player) {
  var coefDir_L;
  var coefDir_H;
  if (player.direction_L == 'left') { 
    coefDir_L = -1; 
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x + (25 * coefDir_L), player.y - 4, 'bullet');
    bullet.setSize(27.5,27.5);
    bullet.setOffset(5,3.5);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(200 * coefDir_L, 0); // vitesse en x et en y
    bullet.anims.play('anime_purple',true);
} else if (player.direction_L == 'right') { 
    coefDir_L = 1 
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x + (25 * coefDir_L), player.y - 4, 'bullet');
    bullet.setSize(27.5,27.5);
    bullet.setOffset(5,3.5);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(200 * coefDir_L, 0); // vitesse en x et en y
    bullet.anims.play('anime_purple',true);
}else if (player.direction_H == 'up') { 
    coefDir_H = -1;
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x + 4, player.y + (25 * coefDir_H), 'bullet');
    bullet.setSize(27.5,27.5);
    bullet.setOffset(5,3.5);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(0, 200 * coefDir_H); // vitesse en x et en y 
    bullet.anims.play('anime_purple',true);
} else if(player.direction_H == 'down') { 
    coefDir_H = 1;
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x - 4 , player.y + (25 * coefDir_H), 'bullet');
    bullet.setSize(27.5,27.5);
    bullet.setOffset(5,3.5);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(0, 200 * coefDir_H); // vitesse en x et en y 
    bullet.anims.play('anime_purple',true);
}
}

function tirer_2(player) {
  var coefDir_L;
  var coefDir_H;
  if (player.direction_L == 'left') { 
    coefDir_L = -1; 
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x + (25 * coefDir_L), player.y - 4, 'bullet');
    bullet.setSize(42,42);
    bullet.setOffset(7.5,15);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(200 * coefDir_L, 0); // vitesse en x et en y
    bullet.anims.play('anime_bleu',true);
} else if (player.direction_L == 'right') { 
    coefDir_L = 1 
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x + (25 * coefDir_L), player.y - 4, 'bullet');
    bullet.setSize(42,42);
    bullet.setOffset(7.5,15);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(200 * coefDir_L, 0); // vitesse en x et en y
    bullet.anims.play('anime_bleu',true);
}else if (player.direction_H == 'up') { 
    coefDir_H = -1;
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x + 4, player.y + (25 * coefDir_H), 'bullet');
    bullet.setSize(42,42);
    bullet.setOffset(7.5,15);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(0, 200 * coefDir_H); // vitesse en x et en y 
    bullet.anims.play('anime_bleu',true);
} else if(player.direction_H == 'down') { 
    coefDir_H = 1;
    // on crée la balle a coté du joueur
    var bullet = groupeBullets_P.create(player.x - 4 , player.y + (25 * coefDir_H), 'bullet');
    bullet.setSize(42,42);
    bullet.setOffset(7.5,15);
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(0, 200 * coefDir_H); // vitesse en x et en y 
    bullet.anims.play('anime_bleu',true);
}
}   

function tirer_Plante(player,une_Plante) {
  
  
      
}  
  
function tirer_Chimere(player, une_Chimere) {
  var coefDirX;
  var coefDirY;
if (player.x < une_Chimere.x) { coefDirX = -1; } else { coefDirX = 1 }
if (player.y < une_Chimere.y) { coefDirY = -1; } else { coefDirY = 1 }
  // on crée la balle a coté du joueur
  var bullet = groupeBullets.create(une_Chimere.x + (25 * coefDirX), une_Chimere.y + (25 * coefDirX), 'Tornades');
  bullet.setSize(35,35);
  bullet.setOffset(20,20);
  // parametres physiques de la balle.
  bullet.positionInitialeX = bullet.x;
  bullet.positionInitialeY = bullet.y;
  // on acive la détection de l'evenement "collision au bornes"
  bullet.body.onWorldBounds = true;  
  bullet.body.allowGravity =false;
  bullet.setVelocity(player.x-une_Chimere.x , player.y-une_Chimere.y); // vitesse en x et en y
  bullet.anims.play('Tornades',true)

} 

function tirer_P(une_Chimere) {
  // Création des balles autour de l'ennemi
  var bullet8 = groupeBullets.create(une_Chimere.x + 20, une_Chimere.y + 20, "nuage_poison_vert");
  var bullet1 = groupeBullets.create(une_Chimere.x - 20, une_Chimere.y + 20, "nuage_poison_vert");
  var bullet2 = groupeBullets.create(une_Chimere.x + 20, une_Chimere.y - 20, "nuage_poison_vert");
  var bullet3 = groupeBullets.create(une_Chimere.x - 20, une_Chimere.y - 20, "nuage_poison_vert");
  var bullet4 = groupeBullets.create(une_Chimere.x + 25, une_Chimere.y, "nuage_poison_vert");
  var bullet5 = groupeBullets.create(une_Chimere.x - 25, une_Chimere.y, "nuage_poison_vert");
  var bullet6 = groupeBullets.create(une_Chimere.x, une_Chimere.y + 25, "nuage_poison_vert");
  var bullet7 = groupeBullets.create(une_Chimere.x, une_Chimere.y - 25, "nuage_poison_vert");
  // definition de la position des bullets
  bullet1.positionInitialeX = bullet1.x;
  bullet1.positionInitialeY = bullet1.y;
  bullet2.positionInitialeX = bullet2.x;
  bullet2.positionInitialeY = bullet2.y;
  bullet3.positionInitialeX = bullet3.x;
  bullet3.positionInitialeY = bullet3.y;
  bullet4.positionInitialeX = bullet4.x;
  bullet4.positionInitialeY = bullet4.y;
  bullet5.positionInitialeX = bullet5.x;
  bullet5.positionInitialeY = bullet5.y;
  bullet6.positionInitialeX = bullet6.x;
  bullet6.positionInitialeY = bullet6.y;
  bullet7.positionInitialeX = bullet7.x;
  bullet7.positionInitialeY = bullet7.y;
  bullet8.positionInitialeX = bullet8.x;
  bullet8.positionInitialeY = bullet8.y;
  // Réglage des tailles et des offsets des balles
  groupeBullets.getChildren().forEach((bullet) => {
    bullet.setSize(35, 35);
    bullet.setOffset(20, 20);
  });
  // Application des propriétés physiques pour chaque balle
  groupeBullets.getChildren().forEach((bullet) => {
    bullet.body.onWorldBounds = true;
    bullet.body.allowGravity = false;
  });

  // Réglage des vélocités des balles
  bullet8.setVelocity(20, 20);
  bullet1.setVelocity(-20, 20);
  bullet2.setVelocity(20, -20);
  bullet3.setVelocity(-20, -20);
  bullet4.setVelocity(25, 0);
  bullet5.setVelocity(-25, 0);
  bullet6.setVelocity(0, 25);
  bullet7.setVelocity(0, -25);
  bullet1.anims.play('nuage_poison_vert',true)
  bullet2.anims.play('nuage_poison_vert',true)
  bullet3.anims.play('nuage_poison_vert',true)
  bullet4.anims.play('nuage_poison_vert',true)
  bullet5.anims.play('nuage_poison_vert',true)
  bullet6.anims.play('nuage_poison_vert',true)
  bullet7.anims.play('nuage_poison_vert',true)
  bullet8.anims.play('nuage_poison_vert',true)
}

/***********************************************************************/
/** FONCTION DEPLACEMENT MOBS 
/***********************************************************************/

function deplacerEtPatienterLoup(un_Loup) {

  // Sauvegarder la position initiale
  var positionInitialex = un_Loup.x;
  var positionInitialey = un_Loup.y;
  setTimeout(function () {
  // Déplacer le Loup progressivement vers la gauche
  var deplacementInterval = setInterval(function () {
    un_Loup.x -= vitesseDeplacement;
    un_Loup.anims.play("Loup_tourne_gauche", true);


    // Vérifier si la distance de déplacement a été atteinte
    if (un_Loup.x <= positionInitialex - distanceDeplacement) {
      // Arrêter le déplacement
      clearInterval(deplacementInterval);
      un_Loup.anims.play("Loup_tourne_gauche", false);
      un_Loup.anims.play("Loup_tourne_bas", true);

      // Patienter pendant 2 secondes (2000 millisecondes)
      setTimeout(function () {
        // Déplacer le Loup progressivement vers le bas
        var deplacementInterval = setInterval(function () {
          un_Loup.y -= vitesseDeplacement;
          un_Loup.anims.play("Loup_tourne_bas", false);
          un_Loup.anims.play("Loup_tourne_haut", true);


          // Vérifier si la distance de déplacement a été atteinte
          if (un_Loup.y <= positionInitialey - distanceDeplacement) {
            // Arrêter le déplacement
            clearInterval(deplacementInterval);
            un_Loup.anims.play("Loup_tourne_haut", false);
            un_Loup.anims.play("Loup_tourne_bas", true);

            // Patienter pendant 2 secondes (2000 millisecondes)
            setTimeout(function () {

              // Inverser le déplacement pour revenir à la position a droite

              var retourInterval = setInterval(function () {
                un_Loup.x += vitesseDeplacement;
                un_Loup.anims.play("Loup_tourne_bas", false);
                un_Loup.anims.play("Loup_tourne_droite", true);

                // Vérifier si le Loup est revenu à sa position initiale
                if (un_Loup.x >= positionInitialex) {
                  // Arrêter le déplacement de retour
                  clearInterval(retourInterval);
                  un_Loup.anims.play("Loup_tourne_droite", false);
                  un_Loup.anims.play("Loup_tourne_bas", true);

                  // Patienter pendant 2 secondes (2000 millisecondes)
                  setTimeout(function () {

                    // Inverser le déplacement pour revenir à la position en haut

                    var retourInterval = setInterval(function () {
                      un_Loup.y += vitesseDeplacement;


                      // Vérifier si le Loup est revenu à sa position initiale
                      if (un_Loup.y >= positionInitialey) {
                        // Arrêter le déplacement de retour
                        clearInterval(retourInterval);


                        // Ajouter ici d'autres actions après le retour
                        console.log("Le Loup est revenu à sa position initiale.");
                        un_Loup.patiente=false;
                      }
                    }, 16); // Utiliser un intervalle de 16ms pour une animation fluide
                  }, 2000);
                }
              }, 16); // Utiliser un intervalle de 16ms pour une animation fluide
            }, 2000);
          }; // Utiliser un intervalle de 16ms pour une animation fluide
        }, 16);
      }, 2000);
    }
  }, 16); // Utiliser un intervalle de 16ms pour une animation fluide
}, 2000)}

function deplacerEtPatienterOrc(un_Orc) {

  // Sauvegarder la position initiale
  var positionInitialex = un_Orc.x;
  var positionInitialey = un_Orc.y;

  setTimeout(function () {
  // Déplacer le Loup progressivement vers la gauche
  var deplacementInterval = setInterval(function () {
    un_Orc.x -= vitesseDeplacement;
    un_Orc.anims.play("Orc_tourne_gauche", true);


    // Vérifier si la distance de déplacement a été atteinte
    if (un_Orc.x <= positionInitialex - distanceDeplacement) {
      // Arrêter le déplacement
      clearInterval(deplacementInterval);
      un_Orc.anims.play("Orc_tourne_gauche", false);
      un_Orc.anims.play("Orc_tourne_bas", false);
      un_Orc.anims.play("Orc_stand", true);


      // Patienter pendant 2 secondes (2000 millisecondes)
      setTimeout(function () {
        // Déplacer le Loup progressivement vers le bas
        var deplacementInterval = setInterval(function () {
          un_Orc.y -= vitesseDeplacement;
          un_Orc.anims.play("Orc_tourne_bas", true);
          un_Orc.anims.play("Orc_tourne_haut", false);


          // Vérifier si la distance de déplacement a été atteinte
          if (un_Orc.y <= positionInitialey - distanceDeplacement) {
            // Arrêter le déplacement
            clearInterval(deplacementInterval);
            un_Orc.anims.play("Orc_tourne_haut", false);
            un_Orc.anims.play("Orc_tourne_bas", false);
            un_Orc.anims.play("Orc_stand", true);

            // Patienter pendant 2 secondes (2000 millisecondes)
            setTimeout(function () {

              // Inverser le déplacement pour revenir à la position a droite

              var retourInterval = setInterval(function () {
                un_Orc.x += vitesseDeplacement;
                un_Orc.anims.play("Orc_tourne_bas", false);
                un_Orc.anims.play("Orc_tourne_droite", false);

                // Vérifier si le Loup est revenu à sa position initiale
                if (un_Orc.x >= positionInitialex) {
                  // Arrêter le déplacement de retour
                  clearInterval(retourInterval);
                  un_Orc.anims.play("Orc_tourne_droite", false);
                  un_Orc.anims.play("Orc_tourne_bas", false);
                  un_Orc.anims.play("Orc_stand", true);

                  // Patienter pendant 2 secondes (2000 millisecondes)
                  setTimeout(function () {

                    // Inverser le déplacement pour revenir à la position en haut

                    var retourInterval = setInterval(function () {
                      un_Orc.y += vitesseDeplacement;


                      // Vérifier si le Loup est revenu à sa position initiale
                      if (un_Orc.y >= positionInitialey) {
                        // Arrêter le déplacement de retour
                        clearInterval(retourInterval);
                        un_Orc.anims.play("Orc_stand", true);


                        // Ajouter ici d'autres actions après le retour
                        console.log("L'Orc est revenu à sa position initiale.");
                        un_Orc.patiente=false;
                      }
                    }, 16); // Utiliser un intervalle de 16ms pour une animation fluide
                  }, 2000);
                }
              }, 16); // Utiliser un intervalle de 16ms pour une animation fluide
            }, 2000);
          }; // Utiliser un intervalle de 16ms pour une animation fluide
        }, 16);
      }, 2000);
    }
  }, 16); // Utiliser un intervalle de 16ms pour une animation fluide
},2000)}

/***********************************************************************/
/** FONCTION HIT 
/***********************************************************************/

// fonction déclenchée lorsque uneBalle et uneCible se superposent
function hit (bullet, cible) {
  if (groupeBullets_P.contains(bullet)){
    if(bullet.texture.key == "bullet"){
      cible.PV--;
    }
    if(bullet.texture.key == "bullet_1"){
      cible.PV = cible.PV -3;
    }
    if(bullet.texture.key == "bullet_2"){
      cible.PV = cible.PV -5;
    }
    if (cible.PV<=0) {
      cible.destroy();
    } 
    bullet.destroy();
  }  
  if (groupeBullets.contains(bullet)){
    console.log(" manger");
    game.scene.start("gameOver");
    bullet.destroy();
  }  
  if (groupeBullets.contains(bullet1)){
    game.scene.start("gameOver");
    bullet1.destroy();
  }  
  if (groupeBullets.contains(bullet2)){
    player.destroy();
    bullet2.destroy();
  }  
  if (groupeBullets.contains(bullet3)){
    player.destroy();
    bullet3.destroy();
  }  
  if (groupeBullets.contains(bullet4)){
    player.destroy();
    bullet4.destroy();
  }  
  if (groupeBullets.contains(bullet5)){
    player.destroy();
    bullet5.destroy();
  }  
  if (groupeBullets.contains(bullet6)){
    player.destroy();
    bullet6.destroy();
  }  
  if (groupeBullets.contains(bullet7)){
    player.destroy();
    bullet7.destroy();
  }  
  if (groupeBullets.contains(bullet8)){
    player.destroy();
    bullet8q.destroy();
  }  

}

function hit_L (player,nouveauLoup) {
  if (groupe_Loup.contains(nouveauLoup)){
    this.scene.start("gameOver");
    this.scene.stop("Ancient_Forest");
    nouveauLoup.destroy();
  }  
}
function hit_O (player,nouvelOrc) {
  if (groupe_Orc.contains(nouvelOrc)){
    this.scene.start("gameOver");
    this.scene.stop("Ancient_Forest");
    nouvelOrc.destroy();
  }  
}
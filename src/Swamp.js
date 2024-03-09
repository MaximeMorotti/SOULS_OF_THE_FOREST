var grp_glazer;
var grp_behemoth;
var grp_parasite;
var grp_meduse;
var grp_gnome;
var carteDuNiveau, tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01A, tilesetTree01B, tilesetTree02A, tilesetTree02B, tilesetTree01C;
var groupe_ennemis;
var vitesseDeplacement;
var distanceDeplacement;
var groupeBullets;  
var groupeBullets_P; 

export default class Swamp extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "Swamp" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload() {
      // Charger les images des jeux de tuiles
      this.load.tilemapTiledJSON("carte_S", "assets/Swamp/map_swamp.JSON");
      this.load.image("Decorative_S", "assets/Swamp/Decorative.png");
      this.load.image("MainLev_autotiling", "assets/Swamp/MainLev_autotiling.png");
      this.load.image("MainLev2.0", "assets/Swamp/MainLev2.0.png");
      this.load.image("Tree01A", "assets/Swamp/Tree01A.png");
      this.load.image("Tree01B", "assets/Swamp/Tree01B.png");
      this.load.image("Tree01C", "assets/Swamp/Tree01C.png");
      this.load.image("Tree02A", "assets/Swamp/Tree02A.png");
      this.load.image("img_bullet", "assets/weapon/explosion-transparent-pixel-5 (2) (1).png",);

      this.load.spritesheet("img_parasite", "assets/Swamp/mobs/parasite-default_2.png", {
        frameWidth: 64,
        frameHeight: 64
      });
      this.load.spritesheet("img_behemoth", "assets/Swamp/mobs/behemoth_green_.png", {
        frameWidth: 192,
        frameHeight: 192
      });
      this.load.spritesheet("img_gnome", "assets/Swamp/mobs/gnome2_orig.png", {
        frameWidth: 48,
        frameHeight: 48
      });
      this.load.spritesheet("img_glazer", "assets/Swamp/mobs/gazer-default_2.png", {
        frameWidth: 64,
        frameHeight: 64
      });
      this.load.spritesheet("img_meduse", "assets/Swamp/mobs/mz-medusa-standing_orig.png", {
        frameWidth: 48,
        frameHeight: 48
      });
    }
  
    create() {
      groupeBullets = this.physics.add.group(); 
      groupeBullets_P = this.physics.add.group(); 

      this.clavier = this.input.keyboard.createCursorKeys();
      this.boutonFeu_0 = this.input.keyboard.addKey('A');  
      this.boutonFeu_1 = this.input.keyboard.addKey('E'); 
      this.boutonFeu_2 = this.input.keyboard.addKey('R');

      // Initialisation de la ca
      carteDuNiveau = this.add.tilemap("carte_S");

      // Initialisation des jeux de tuiles
      tilesetDecorative = carteDuNiveau.addTilesetImage("Decorative_S");
      tilesetMainlev1 = carteDuNiveau.addTilesetImage("MainLev_autotiling");
      tilesetMainlev2 = carteDuNiveau.addTilesetImage("MainLev2.0");
      tilesetTree01A = carteDuNiveau.addTilesetImage("Tree01A");
      tilesetTree01B = carteDuNiveau.addTilesetImage("Tree01B");
      tilesetTree01C = carteDuNiveau.addTilesetImage("Tree01C");
      tilesetTree02A = carteDuNiveau.addTilesetImage("Tree02A");
      
      // Chargement des calques avec le bon tileset
      const Background = carteDuNiveau.createLayer("background", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const deco2 = carteDuNiveau.createLayer("deco2", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const path = carteDuNiveau.createLayer("path", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const path2 = carteDuNiveau.createLayer("path2", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const deco = carteDuNiveau.createLayer("deco", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const relief = carteDuNiveau.createLayer("relief", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const BORD_DE_LO = carteDuNiveau.createLayer("BORD_DE_LO", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const arbres = carteDuNiveau.createLayer("arbres", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      const PONT = carteDuNiveau.createLayer("PONT", [tilesetDecorative, tilesetMainlev1, tilesetMainlev2, tilesetTree01B, tilesetTree01A, tilesetTree02A, tilesetTree01C]);
      
      // Appliquer les collisions pour tous les calques
      Background.setCollisionByProperty({ estSolide: true });
      deco2.setCollisionByProperty({ estSolide: true });
      path.setCollisionByProperty({ estSolide: true });
      path2.setCollisionByProperty({ estSolide: true });
      deco.setCollisionByProperty({ estSolide: true });
      relief.setCollisionByProperty({ estSolide: true });
      BORD_DE_LO.setCollisionByProperty({ estSolide: true });
      arbres.setCollisionByProperty({ estSolide: true });
      PONT.setCollisionByProperty({ estSolide: true });
      
      this.player = this.physics.add.sprite(100, 450, "img_perso");
      this.player.refreshBody();
      this.player.setSize(12,30);
      this.player.setOffset(18,7);
      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(groupeBullets, this.player);
      this.physics.add.overlap(groupeBullets, this.player, death, null,this);

      this.physics.add.collider(this.player, Background);
      this.physics.add.collider(this.player, deco2);
      this.physics.add.collider(this.player, path);
      this.physics.add.collider(this.player, path2);
      this.physics.add.collider(this.player, deco);
      this.physics.add.collider(this.player, relief);
      this.physics.add.collider(this.player, BORD_DE_LO);
      this.physics.add.collider(this.player, arbres);
      this.physics.add.collider(this.player, PONT);
      
  
      this.anims.create({
        key: "boss_attack",
        frames: this.anims.generateFrameNumbers("img_behemoth", { start: 9, end: 17 }),
        frameRate: 7,
        repeat: -1
      });
      this.anims.create({
        key: "boss_attack2",
        frames: this.anims.generateFrameNumbers("img_behemoth", { start: 0, end: 8 }),
        frameRate: 7,
        repeat: -1
      });
      this.anims.create({
        key: "para_tourne_droite",
        frames: this.anims.generateFrameNumbers("img_parasite", { start: 6, end: 8 }),
        frameRate: 0.1,
        repeat: -1
      });
      this.anims.create({
        key: "para_tourne_haut",
        frames: this.anims.generateFrameNumbers("img_parasite", { start: 32, end: 39 }),
        frameRate: 0.1,
        repeat: -1
      });
      this.anims.create({
        key: "para_tourne_bas",
        frames: this.anims.generateFrameNumbers("img_parasite", { start: 24, end: 30 }),
        frameRate: 0.1,
        repeat: -1
      });
      this.anims.create({
        key: "para_tourne_gauche",
        frames: this.anims.generateFrameNumbers("img_parasite", { start: 0, end: 3 }),
        frameRate: 0.1,
        repeat: -1
      });
      this.anims.create({
        key: "para_mort",
        frames: this.anims.generateFrameNumbers("img_parasite", { start: 47, end: 52 }),
        frameRate: 1,
        repeat: -1
      });
      this.anims.create({
        key: "glazer_mort",
        frames: this.anims.generateFrameNumbers("img_glazer", [15, 16, 17, 24, 25, 26, 42, 43, 44, 53, 52, 51]),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: "glazer_attack",
        frames: this.anims.generateFrameNumbers("img_glazer", [5, 6, 14, 15, 22, 23]),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "gnome_tourne_gauche",
        frames: this.anims.generateFrameNumbers("img_gnome", { start: 3, end: 5 }),
        frameRate: 5,
        repeat: -1
      });
this.anims.create({
    key: "gnome_tourne_droite",
    frames: this.anims.generateFrameNumbers("img_gnome", { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: "gnome_tourne_bas",
    frames: this.anims.generateFrameNumbers("img_gnome", { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: "gnome_tourne_haut",
    frames: this.anims.generateFrameNumbers("img_gnome", { start: 9, end: 11 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: "meduse_tourne_gauche",
    frames: this.anims.generateFrameNumbers("img_meduse", { start: 3, end: 5 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: "meduse_tourne_droite",
    frames: this.anims.generateFrameNumbers("img_meduse", { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
});

this.anims.create({
    key: "meduse_tourne_bas",
    frames: this.anims.generateFrameNumbers("img_meduse", { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: "meduse_tourne_haut",
    frames: this.anims.generateFrameNumbers("img_meduse", { start: 9, end: 11 }),
    frameRate: 5,
    repeat: -1
});

// Initialisation de la mobilité des ennemis
grp_gnome = this.physics.add.group();
grp_behemoth = this.physics.add.group();
grp_meduse = this.physics.add.group();
grp_glazer = this.physics.add.group();
grp_parasite = this.physics.add.group();
  this.physics.add.overlap(groupeBullets_P, grp_gnome, hit, null,this);
  this.physics.add.overlap(groupeBullets_P, grp_behemoth, hit, null,this);
  this.physics.add.overlap(groupeBullets_P, grp_meduse, hit, null,this);
  this.physics.add.overlap(groupeBullets_P, grp_glazer, hit, null,this);
  this.physics.add.overlap(groupeBullets_P, grp_parasite, hit, null,this);

  
  this.physics.add.overlap(grp_parasite, this.player, hit_P, null,this);
  this.physics.add.overlap(grp_gnome, this.player, hit_G, null,this);

this.physics.add.collider(grp_glazer, Background);
this.physics.add.collider(grp_glazer, deco2);
this.physics.add.collider(grp_glazer, path);
this.physics.add.collider(grp_glazer, path2);
this.physics.add.collider(grp_glazer, deco);
this.physics.add.collider(grp_glazer, relief);
this.physics.add.collider(grp_glazer, BORD_DE_LO);
this.physics.add.collider(grp_glazer, arbres);
this.physics.add.collider(grp_glazer, PONT);


this.physics.add.collider(grp_parasite, Background);
this.physics.add.collider(grp_parasite, deco2);
this.physics.add.collider(grp_parasite, path);
this.physics.add.collider(grp_parasite, path2);
this.physics.add.collider(grp_parasite, deco);
this.physics.add.collider(grp_parasite, relief);
this.physics.add.collider(grp_parasite, BORD_DE_LO);
this.physics.add.collider(grp_parasite, arbres);
this.physics.add.collider(grp_parasite, PONT);

this.physics.add.collider(grp_gnome, Background);
this.physics.add.collider(grp_gnome, deco2);
this.physics.add.collider(grp_gnome, path);
this.physics.add.collider(grp_gnome, path2);
this.physics.add.collider(grp_gnome, deco);
this.physics.add.collider(grp_gnome, relief);
this.physics.add.collider(grp_gnome, BORD_DE_LO);
this.physics.add.collider(grp_gnome, arbres);
this.physics.add.collider(grp_gnome, PONT);

this.physics.add.collider(grp_meduse, Background);
this.physics.add.collider(grp_meduse, deco2);
this.physics.add.collider(grp_meduse, path);
this.physics.add.collider(grp_meduse, path2);
this.physics.add.collider(grp_meduse, deco);
this.physics.add.collider(grp_meduse, relief);
this.physics.add.collider(grp_meduse, BORD_DE_LO);
this.physics.add.collider(grp_meduse, arbres);
this.physics.add.collider(grp_meduse, PONT);

this.physics.add.collider(grp_behemoth, Background);
this.physics.add.collider(grp_behemoth, deco2);
this.physics.add.collider(grp_behemoth, path);
this.physics.add.collider(grp_behemoth, path2);
this.physics.add.collider(grp_behemoth, deco);
this.physics.add.collider(grp_behemoth, relief);
this.physics.add.collider(grp_behemoth, BORD_DE_LO);
this.physics.add.collider(grp_behemoth, arbres);
this.physics.add.collider(grp_behemoth, PONT);

this.physics.add.collider(grp_behemoth, grp_glazer);
this.physics.add.collider(grp_behemoth, grp_gnome);
this.physics.add.collider(grp_behemoth, grp_meduse);
this.physics.add.collider(grp_behemoth, grp_parasite);
this.physics.add.collider(grp_behemoth, groupe_ennemis);

this.physics.add.collider(grp_glazer, grp_glazer);
this.physics.add.collider(grp_glazer, grp_gnome);
this.physics.add.collider(grp_glazer, grp_meduse);
this.physics.add.collider(grp_glazer, grp_parasite);
this.physics.add.collider(grp_glazer, this.player);
this.physics.add.collider(grp_glazer, groupe_ennemis);

this.physics.add.collider(grp_meduse, grp_glazer);
this.physics.add.collider(grp_meduse, grp_gnome);
this.physics.add.collider(grp_meduse, grp_meduse);
this.physics.add.collider(grp_meduse, grp_parasite);
this.physics.add.collider(grp_meduse, this.player);
this.physics.add.collider(grp_meduse, groupe_ennemis);

this.physics.add.collider(grp_gnome, grp_glazer);
this.physics.add.collider(grp_gnome, grp_gnome);
this.physics.add.collider(grp_gnome, grp_meduse);
this.physics.add.collider(grp_gnome, grp_parasite);
this.physics.add.collider(grp_gnome, this.player);
this.physics.add.collider(grp_gnome, groupe_ennemis);

this.physics.add.collider(grp_parasite, grp_glazer);
this.physics.add.collider(grp_parasite, grp_gnome);
this.physics.add.collider(grp_parasite, grp_meduse);
this.physics.add.collider(grp_parasite, grp_parasite);
this.physics.add.collider(grp_parasite, this.player);
this.physics.add.collider(grp_parasite, groupe_ennemis);

this.physics.add.collider(this.player, grp_glazer);
this.physics.add.collider(this.player, grp_gnome);
this.physics.add.collider(this.player, grp_meduse);
this.physics.add.collider(this.player, grp_parasite);
this.physics.add.collider(this.player, groupe_ennemis);
// Configuration de la caméra
this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
this.cameras.main.startFollow(this.player);

this.physics.world.bounds.width = carteDuNiveau.widthInPixels;
this.physics.world.bounds.height = carteDuNiveau.heightInPixels;
const tab_points = carteDuNiveau.getObjectLayer("ennemis");

// on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
tab_points.objects.forEach(point => {
    if (point.name == "parasite") {
        var nouvel_parasite = this.physics.add.sprite(point.x, point.y, "img_parasite").setCollideWorldBounds(true);
        grp_parasite.add(nouvel_parasite);
        nouvel_parasite.PV =6;
    }
    if (point.name == "behemoth") {
        var nouvel_behemoth = this.physics.add.sprite(point.x, point.y, "img_behemoth").setCollideWorldBounds(true);
        grp_behemoth.add(nouvel_behemoth);
        nouvel_behemoth.PV = 300;
    }
    if (point.name == "glazer") {
        var nouvel_glazer = this.physics.add.sprite(point.x, point.y, "img_glazer").setCollideWorldBounds(true);
        grp_glazer.add(nouvel_glazer);
        nouvel_glazer.PV = 11;
    }
    if (point.name == "gnome") {
        var nouvel_gnome = this.physics.add.sprite(point.x, point.y, "img_gnome").setCollideWorldBounds(true);
        grp_gnome.add(nouvel_gnome);
        nouvel_gnome.PV = 7;
    }
    if (point.name == "meduse") {
        var nouvel_meduse = this.physics.add.sprite(point.x, point.y, "img_meduse").setCollideWorldBounds(true);
        grp_meduse.add(nouvel_meduse);
        nouvel_meduse.PV = 5

    }
    
    var porte=this.add.image(210, 2775, "img_porte");
    porte.setDepth(50);
});

 

this.physics.world.on("worldbounds", function(body) {
    // on récupère l'objet surveillé
    var objet = body.gameObject;
    // s'il s'agit d'une balle
    if (groupeBullets.contains(objet)) {
        // on le détruit
        objet.destroy();
    }
});
var monTimer = this.time.addEvent({
    delay: 1000, // ms
    callback: function () {
        grp_glazer.children.iterate(function iterateur(un_glazer) {
            if ( Math.abs(this.player.x - un_glazer.x) < 300 && Math.abs(this.player.y - un_glazer.y) < 300) {
                tirer_glazer(this.player,un_glazer);
             } 
            },this);
    },
    args: [],
    callbackScope: this,
    repeat: -1
  }); 
  var monTimer2 = this.time.addEvent({
    delay:4000, // ms
    callback: function () {
        grp_meduse.children.iterate(function iterateur(un_meduse) {


     
                tirer_meduse(this.player,un_meduse);
             
            
              },this);
    },
    args: [],
    callbackScope: this,
    repeat: -1
  }); 
  var monTimer2 = this.time.addEvent({
    delay: 7000, // ms
    callback: function () {
        grp_behemoth.children.iterate(function iterateur(un_behemoth) {


            if ( Math.abs(this.player.x - un_behemoth.x) < 400 && Math.abs(this.player.y - un_behemoth.y) < 400) {
                atk2_boss(this.player,un_behemoth);
             
            }
          },this);
    },
    args: [],
    callbackScope: this,
    repeat: -1
  }); 
  var monTimer2 = this.time.addEvent({
    delay: 2500, // ms
    callback: function () {
        grp_behemoth.children.iterate(function iterateur(un_behemoth) {


            if ( Math.abs(this.player.x - un_behemoth.x) < 400 && Math.abs(this.player.y - un_behemoth.y) < 400) {
                atk_boss(this.player,un_behemoth);
             
            }
          },this);
    },
    args: [],
    callbackScope: this,
    repeat: -1
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

    // Détruit les balles après avoir terminé l'itération
    ballesADetruire.forEach(function (balle) {
      balle.destroy();
    });
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
      ballesADetruire.forEach(function (player,balle) {
        balle.destroy();
      });
      grp_parasite.children.iterate(function iterateur(un_parasite) {
        if (this.player.x < un_parasite.x) {
            un_parasite.setVelocityX(-40); // Déplacement vers la gauche
            un_parasite.anims.play("para_tourne_gauche", true);
        } else if (this.player.x > un_parasite.x) {
            un_parasite.setVelocityX(40); // Déplacement vers la droite
            un_parasite.anims.play("para_tourne_droite", true);
        } else {
            un_parasite.setVelocityX(0); // Arrêt du déplacement horizontal
        }

        // Logique pour déterminer la direction verticale
        if (this.player.y < un_parasite.y) {
            un_parasite.setVelocityY(-40); // Déplacement vers le haut
            un_parasite.anims.play("para_tourne_haut", true);
        } else if (this.player.y > un_parasite.y) {
            un_parasite.setVelocityY(40); // Déplacement vers le bas
            un_parasite.anims.play("para_tourne_bas", true);
        } else {
            un_parasite.setVelocityY(0); // Arrêt du déplacement vertical
        }
        if (this.player.y == un_parasite.y && this.player.x == un_parasite.x) {
            hit(un_parasite, this.player)
        }
      },this);
  

    grp_gnome.children.iterate(function iterateur(un_gnome) {
    
        if (Math.abs(this.player.x - un_gnome.x) < 200 && Math.abs(this.player.y - un_gnome.y) < 200) {
    
   
            if (this.player.x < un_gnome.x) {
                un_gnome.setVelocityX(-40); // Déplacement vers la gauche
                un_gnome.anims.play("gnome_tourne_gauche", true);
            }
            else if (this.player.x > un_gnome.x) {
                un_gnome.setVelocityX(40); // Déplacement vers la droite
                un_gnome.anims.play("gnome_tourne_droite", true);
            }
            else {
                un_gnome.setVelocityX(0); // Arrêt du déplacement horizontal
            }

            // Logique pour déterminer la direction verticale
            if (this.player.y < un_gnome.y) {
                un_gnome.setVelocityY(-40); // Déplacement vers le haut
                un_gnome.anims.play("gnome_tourne_haut", true);
            }
            else if (this.player.y > un_gnome.y) {
                un_gnome.setVelocityY(40); // Déplacement vers le bas
                un_gnome.anims.play("gnome_tourne_bas", true);
            }
            else {
                un_gnome.setVelocityY(0); // Arrêt du déplacement vertical
            }
        }

      },this);
  
    grp_meduse.children.iterate(function iterateur(un_meduse) {
        deplacerEtPatienterLoup(un_meduse)
    });
    }
  }
  function deplacerEtPatienterLoup(un_Loup) {

    // Sauvegarder la position initiale
    var positionInitialex = un_Loup.x;
    var positionInitialey = un_Loup.y;
    
    un_Loup.anims.play("meduse_tourne_gauche", true);
    vitesseDeplacement=0.25;
    distanceDeplacement=0.25;
    un_Loup.x -= vitesseDeplacement;

    setTimeout(function () {
       // Déplacer le Loup progressivement vers la gauche
        
        var deplacementInterval = setInterval(function () {
            un_Loup.x -= vitesseDeplacement;
            un_Loup.anims.play("meduse_tourne_gauche", true);


            // Vérifier si la distance de déplacement a été atteinte
            
             if (un_Loup.x <= positionInitialex - distanceDeplacement) {
                // Arrêter le déplacement
                clearInterval(deplacementInterval);
                // un_Loup.anims.play("Loup_tourne_gauche", false);
                un_Loup.anims.play("meduse_tourne_bas", true);

                // Patienter pendant 2 secondes (2000 millisecondes)
                setTimeout(function () {
                    // Déplacer le Loup progressivement vers le bas
                    var deplacementInterval = setInterval(function () {
                        un_Loup.y -= vitesseDeplacement;
                        un_Loup.anims.play("meduse_tourne_bas", false);
                        un_Loup.anims.play("meduse_tourne_haut", true);


                        // Vérifier si la distance de déplacement a été atteinte
                        if (un_Loup.y <= positionInitialey - distanceDeplacement) {
                            // Arrêter le déplacement
                            clearInterval(deplacementInterval);
                            un_Loup.anims.play("meduse_tourne_haut", false);
                            un_Loup.anims.play("meduse_tourne_bas", true);

                            // Patienter pendant 2 secondes (2000 millisecondes)
                            setTimeout(function () {

                                // Inverser le déplacement pour revenir à la position a droite

                                var retourInterval = setInterval(function () {
                                    un_Loup.x += vitesseDeplacement;
                                    un_Loup.anims.play("meduse_tourne_bas", false);
                                    un_Loup.anims.play("meduse_tourne_droite", true);

                                    // Vérifier si le Loup est revenu à sa position initiale
                                    if (un_Loup.x >= positionInitialex) {
                                        // Arrêter le déplacement de retour
                                        clearInterval(retourInterval);
                                        un_Loup.anims.play("meduse_tourne_droite", false);
                                        un_Loup.anims.play("meduse_tourne_bas", true);

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
                                          
                                                    un_Loup.patiente = false;
                                                }
                                            }, 106); // Utiliser un intervalle de 16ms pour une animation fluide
                                        }, 2000);
                                    }
                                }, 106); // Utiliser un intervalle de 16ms pour une animation fluide
                            }, 2000);
                        }; // Utiliser un intervalle de 16ms pour une animation fluide
                    }, 106);
                }, 2000);
            } 
        }, 106); // Utiliser un intervalle de 16ms pour une animation fluide
    }) 
}

function tirer_glazer(player,glazer) {
    // mesasge d'alerte affichant les attributs de player
        var coefDirX;
        var coefDirY;
        glazer.anims.play("glazer_attack", true);
	coefDirX=player.x-glazer.x
    coefDirY=player.y-glazer.y
        // on crée la balle a coté du joueur
        var bullet = groupeBullets.create(glazer.x+1, glazer.y+1, 'img_bullet');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(true);
        bullet.body.allowGravity =false;
        bullet.setVelocity(1* coefDirX, 1* coefDirY); // vitesse en x et en y
        bullet.body.onWorldBounds = true; 
        if(Math.abs(bullet.x - glazer.x) < 0.01 && Math.abs(bullet.y - glazer.y) <0.01){
bullet.destroy();
        }
        
} 
function tirer_meduse(player,meduse) {
    // mesasge d'alerte affichant les attributs de player
        var coefDirX;
        var coefDirY;
        
	coefDirX=1
    coefDirY=-1
    
        // on crée la balle a coté du joueur
        var bullet1 = groupeBullets.create(meduse.x, meduse.y, 'img_bullet');
        var bullet2 = groupeBullets.create(meduse.x, meduse.y, 'img_bullet');
        var bullet3 = groupeBullets.create(meduse.x, meduse.y, 'img_bullet');
        var bullet4 = groupeBullets.create(meduse.x, meduse.y, 'img_bullet');
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

function atk_boss(player,boss) {
    // mesasge d'alerte affichant les attributs de player
    var coefDirX;
    var coefDirY;
   
coefDirX=player.x-boss.x
coefDirY=player.y-boss.y
        // on crée la balle a coté du joueur
        var bullet1 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        var bullet2 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        var bullet3 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        var bullet4 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        var bullet5 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        var bullet6 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        var bullet7 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        var bullet8 = groupeBullets.create(boss.x, boss.y, 'img_bullet');
        // parametres physiques de la balle.
        bullet1.setCollideWorldBounds(true);
        bullet1.body.allowGravity =false;
        bullet1.setVelocity(1* coefDirX-5, coefDirY-5); // vitesse en x et en y
        bullet1.body.onWorldBounds = true; 
        bullet2.setCollideWorldBounds(true);
        bullet2.body.allowGravity =false;
        bullet2.setVelocity(1* coefDirX-2.5, coefDirY-2.5); // vitesse en x et en y
        bullet2.body.onWorldBounds = true; 
        bullet3.setCollideWorldBounds(true);
        bullet3.body.allowGravity =false;
        bullet3.setVelocity(coefDirX+5, 1* coefDirY+5); // vitesse en x et en y
        bullet3.body.onWorldBounds = true;
        bullet4.setCollideWorldBounds(true);
        bullet4.body.allowGravity =false;
        bullet4.setVelocity(coefDirX+2.5, 1* coefDirY+2.5); // vitesse en x et en y
        bullet4.body.onWorldBounds = true;
        bullet5.setCollideWorldBounds(true);
        bullet5.body.allowGravity =false;
        bullet5.setVelocity(1* coefDirX-10, coefDirY-10); // vitesse en x et en y
        bullet5.body.onWorldBounds = true; 
        bullet6.setCollideWorldBounds(true);
        bullet6.body.allowGravity =false;
        bullet6.setVelocity(1* coefDirX-15, coefDirY-15); // vitesse en x et en y
        bullet6.body.onWorldBounds = true; 
        bullet7.setCollideWorldBounds(true);
        bullet7.body.allowGravity =false;
        bullet7.setVelocity(coefDirX+15, 1* coefDirY+15); // vitesse en x et en y
        bullet7.body.onWorldBounds = true;
        bullet8.setCollideWorldBounds(true);
        bullet8.body.allowGravity =false;
        bullet8.setVelocity(coefDirX+10, 1* coefDirY+10); // vitesse en x et en y
        bullet8.body.onWorldBounds = true;
        boss.anims.play("boss_attack", true);
     
} 

function atk2_boss(player,boss) {
    // mesasge d'alerte affichant les attributs de player
    var coefDirX;
    var coefDirY;
    coefDirX=player.x-boss.x
    coefDirY=player.y-boss.y


        // on crée la balle a coté du joueur
        var bullet1 = groupeBullets.create(boss.x+400, boss.y, 'img_bullet');
        var bullet2 = groupeBullets.create(boss.x-400, boss.y, 'img_bullet');
        var bullet3 = groupeBullets.create(boss.x+400, boss.y+400, 'img_bullet');
        var bullet4 = groupeBullets.create(boss.x, boss.y+400, 'img_bullet');
        var bullet5 = groupeBullets.create(boss.x, boss.y-50, 'img_bullet');
        var bullet6 = groupeBullets.create(boss.x+400, boss.y+50, 'img_bullet');
        var bullet7 = groupeBullets.create(boss.x-400, boss.y+400, 'img_bullet');
        var bullet8 = groupeBullets.create(boss.x-400, boss.y-50, 'img_bullet');
        // parametres physiques de la balle.
        bullet1.setCollideWorldBounds(true);
        bullet1.body.allowGravity =false;
        bullet1.setVelocity(-boss.x*0.05, 0); // vitesse en x et en y
        bullet1.body.onWorldBounds = true; 
        bullet2.setCollideWorldBounds(true);
        bullet2.body.allowGravity =false;
        bullet2.setVelocity(boss.x*0.05,0); // vitesse en x et en y
        bullet2.body.onWorldBounds = true; 
        bullet3.setCollideWorldBounds(true);
        bullet3.body.allowGravity =false;
        bullet3.setVelocity(-boss.x*0.1, -boss.y); // vitesse en x et en y
        bullet3.body.onWorldBounds = true;
        bullet4.setCollideWorldBounds(true);
        bullet4.body.allowGravity =false;
        bullet4.setVelocity(0,-boss.y*0.5); // vitesse en x et en y
        bullet4.body.onWorldBounds = true;
        bullet5.setCollideWorldBounds(true);
        bullet5.body.allowGravity =false;
        bullet5.setVelocity(0, boss.y*0.5); // vitesse en x et en y
        bullet5.body.onWorldBounds = true; 
        bullet6.setCollideWorldBounds(true);
        bullet6.body.allowGravity =false;
        bullet6.setVelocity(-boss.x*0.1,boss.y); // vitesse en x et en y
        bullet6.body.onWorldBounds = true; 
        bullet7.setCollideWorldBounds(true);
        bullet7.body.allowGravity =false;
        bullet7.setVelocity(boss.x*0.1,-boss.y); // vitesse en x et en y
        bullet7.body.onWorldBounds = true;
        bullet8.setCollideWorldBounds(true);
        bullet8.body.allowGravity =false;
        bullet8.setVelocity(boss.x*0.1, boss.y); // vitesse en x et en y
        bullet8.body.onWorldBounds = true;
        boss.anims.play("boss_attack2", true);
} 

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
}

function death(player,bullet) {
  for (let i = 1; i <= 8; i++) {
    if (groupeBullets.contains(bullet[i])) {
      this.game.scene.start("gameOver");
      bullet[i].destroy();
    }
  } 
}

function hit_G (player,nouvel_gnome) {
  if (grp_gnome.contains(nouvel_gnome)){
    this.game.scene.stop("Swamp");
    this.game.scene.start("gameOver");
    nouvel_gnome.destroy();
  }  
}
function hit_P (player,nouvel_parasite) {
  if (grp_parasite.contains(nouvel_parasite)){
    this.game.scene.start("gameOver");
    nouvel_parasite.destroy();
  }  
}

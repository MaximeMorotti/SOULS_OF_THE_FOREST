var carteDuNiveau, tilesetDecorativeProps, tilesetMainlevBuild;
var groupe_creeper;
var groupe_ombre;
var groupe_fantome;
var groupe_Ogre;
var groupeBullets;
var groupeBullets_P;
var timer = true;

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
      this.load.tilemapTiledJSON("carte_M", "assets/Mountain/moutain_map.json"); 
      this.load.image("W_W", 'assets/weapon/cristal.png')

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
      groupeBullets = this.physics.add.group();
      groupeBullets_P = this.physics.add.group();
      
      this.clavier = this.input.keyboard.createCursorKeys();
      this.boutonFeu_0 = this.input.keyboard.addKey('A');  
      this.boutonFeu_1 = this.input.keyboard.addKey('E'); 
      this.boutonFeu_2 = this.input.keyboard.addKey('R'); 

      // Initialisation de la carte
      carteDuNiveau = this.make.tilemap({ key: "carte_M" });

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

      this.physics.add.overlap(groupeBullets_P, groupe_creeper, hit, null,this);
      this.physics.add.overlap(groupeBullets_P, groupe_ombre, hit, null,this);
      this.physics.add.overlap(groupeBullets_P, groupe_fantome, hit, null,this);
      this.physics.add.overlap(groupeBullets_P, groupe_Ogre, hit, null,this);

      
      this.physics.add.overlap(groupe_creeper, this.player, hit_C, null,this);
      this.physics.add.overlap(groupe_fantome, this.player, hit_F, null,this);

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
        key: "anim_Ogre",
        frames: this.anims.generateFrameNumbers("Ogre", { start: 21, end: 23 }),
        frameRate: 10,
        repeat: 0
      });
      this.anims.create({
        key: "anim_Ogre_stby",
        frames: this.anims.generateFrameNumbers("Ogre", { start: 0, end: 2 }),
        frameRate: 4,
        repeat: -1
      });
      this.anims.create({
        key: "anim_Ogre_P",
        frames: this.anims.generateFrameNumbers("Ogre", { start: 24, end: 26 }),
        frameRate: 10,
        repeat: 0
      });

      var monTimer = this.time.addEvent({
        delay: 4000, // ms
        callback: function () {
            timer = false;
            groupe_Ogre.children.iterate(function(Ogre) {
                Ogre.anims.play('anim_Ogre_stby', false);
                Ogre.anims.play('anim_Ogre_P', true);
                tirer_P(this.player, Ogre);
              },this);
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
                delay: 2000, // ms
                callback: function () {
                    timer = false;
                    groupe_Ogre.children.iterate(function(Ogre) {
                        Ogre.anims.play('anim_Ogre_stby', false);
                        Ogre.anims.play('anim_Ogre', true);
                        tirer_O(this.player, Ogre);
                      },this);
                    var st2 = this.time.addEvent({
                        delay: 400, // ms
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
    });

        
    }
  
    update() {

      if (timer == true){
        groupe_Ogre.children.iterate(function(Ogre) {
          Ogre.anims.play('anim_Ogre_stby', true);
      });
      }

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

      groupeBullets.children.iterate(function(bullet) {
        // Vérifie si la balle a dépassé la limite par rapport à sa position initiale et à son type
        if (bullet.texture.key === "W_W") {
            if (Phaser.Math.Distance.Between(The_Ogre.x, The_Ogre.y, bullet.x, bullet.y) >= 400) {
                ballesADetruire.push(bullet); // Ajoute la balle au tableau des balles à détruire
            }
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
    if (groupeBullets.contains(bullet1)){
      player.destroy
      bullet.destroy();
    }  
    if (groupeBullets.contains(bullet2)){
      player.destroy
      bullet.destroy();
    } 
    if (groupeBullets.contains(bullet3)){
      player.destroy
      bullet.destroy();
    } 
    if (groupeBullets.contains(bullet4)){
      player.destroy
      bullet.destroy();
    } 
  }
  function hit_C (player, nouveau_creeper) {
    if (groupe_creeper.contains(nouveau_creeper)){
      player.destroy();
      nouveau_creeper.destroy();
    } 
  }
  function hit_F (player, nouvel_fantome) {
    if (groupe_fantome.contains(nouvel_fantome)){
      player.destroy();
      nouvel_fantome.destroy();
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
  function tirer_O(player, ennemie) {
    var coefDirX;
    var coefDirY;
  if (player.x < ennemie.x) { coefDirX = -1; } else { coefDirX = 1 }
  if (player.y < ennemie.y) { coefDirY = -1; } else { coefDirY = 1 }
    // on crée la balle a coté du joueur
    var bullet = groupeBullets.create(ennemie.x + (25 * coefDirX), ennemie.y + (25 * coefDirX), 'W_W');
    bullet.setSize(35,35);
    bullet.setOffset(7,7);
  
    // parametres physiques de la balle.
    bullet.positionInitialeX = bullet.x;
    bullet.positionInitialeY = bullet.y;
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;  
    bullet.body.allowGravity =false;
    bullet.setVelocity(player.x-ennemie.x , player.y-ennemie.y); // vitesse en x et en y
  }  
  
  function tirer_P(player, ennemie) {
    // Création des balles autour de l'ennemi
    var bullet8 = groupeBullets.create(ennemie.x + 20, ennemie.y + 20, 'W_W');
    var bullet1 = groupeBullets.create(ennemie.x - 20, ennemie.y + 20, 'W_W');
    var bullet2 = groupeBullets.create(ennemie.x + 20, ennemie.y - 20, 'W_W');
    var bullet3 = groupeBullets.create(ennemie.x - 20, ennemie.y - 20, 'W_W');
    var bullet4 = groupeBullets.create(ennemie.x + 25, ennemie.y, 'W_W');
    var bullet5 = groupeBullets.create(ennemie.x - 25, ennemie.y, 'W_W');
    var bullet6 = groupeBullets.create(ennemie.x, ennemie.y + 25, 'W_W');
    var bullet7 = groupeBullets.create(ennemie.x, ennemie.y - 25, 'W_W');
  
    // Réglage des tailles et des offsets des balles
    groupeBullets.getChildren().forEach((bullet) => {
      bullet.setSize(35, 35);
      bullet.setOffset(7, 7);
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
  }
      

    
       
  
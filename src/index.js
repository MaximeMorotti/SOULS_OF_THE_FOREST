import Ancient_Forest from "/src/Ancient_Forest.js"; 
import niveau1 from "/src/niveau1.js"; 
import niveau2 from "/src/niveau2.js";


// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [Ancient_Forest, niveau1,niveau2] 
  };

// création et lancement du jeu à partir de la configuration config
var game = new Phaser.Game(config);
game.scene.start("Ancient_Forest"); // lancement de la scene selection
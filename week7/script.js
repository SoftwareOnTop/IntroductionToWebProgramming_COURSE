
let game;

const gameOptions = {
    dudeGravity: 800,
    dudeSpeed: 300
}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#112211",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 1000,
        },
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
        scene: PlayGame
    }

    game = new Phaser.Game(gameConfig)
    window.focus();
}

class PlayGame extends Phaser.Scene {

    constructor() {
        super("PlayGame")
        this.score = 0;
        this.kills = 0
    }


    preload() {
        this.load.image("ground", "assets/platform.png")
        this.load.image("star", "assets/star.png")
        this.load.spritesheet("dude", "assets/dude.png", {frameWidth: 32, frameHeight: 48})
        
    }

    create() {
        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        for(let i = 0; i < 20; i++) {
            this.groundGroup.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), "ground");
        }

        this.dude = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "dude")
        this.dude.body.gravity.y = gameOptions.dudeGravity
        this.physics.add.collider(this.dude, this.groundGroup)

        this.starsGroup = this.physics.add.group({})
        this.physics.add.collider(this.starsGroup, this.groundGroup)

        this.physics.add.overlap(this.dude, this.starsGroup, this.collectStar, null, this)

        this.add.image(16, 16, "star")
        this.scoreText = this.add.text(32, 3, "0", {fontSize: "30px", fill: "#ffffff"})
        this.enemyGroup = this.physics.add.group({});
        this.physics.add.collider(this.enemyGroup, this.groundGroup);
        this.physics.add.overlap(this.dude, this.enemyGroup, this.hitenemy, null, this);

        this.enemyGraphics = this.add.graphics();
        this.enemyGraphics.fillStyle(0xff0000, 1); 
        this.enemyGraphics.fillRect(0, 0, 30, 30);
        this.enemyGraphics.generateTexture('enemy', 30, 30);
        this.enemyGraphics.destroy();
        this.bulletGraphics = this.add.graphics()
        this.bulletGraphics.fillStyle(0x00ff00, 1)
        this.bulletGraphics.fillCircle(7, 7 , 7)
        this.bulletGraphics.generateTexture('bullet', 15, 15)
        this.bulletGraphics.destroy();

        this.bullet = this.physics.add.sprite(this.dude.x, this.dude.y, 'bullet')
        this.bullet.setVisible(false)
        this.bullet.setActive(false)
        this.bullet.body.allowGravity = false

        this.physics.add.overlap(this.bullet, this.enemyGroup, this.killEnemy, null, this)

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.cursors = this.input.keyboard.createCursorKeys()
        this.add.image(70, 16, "enemy")
        this.scoreText2 = this.add.text(86, 3, "0", {fontSize: "30px", fill: "#ffffff"})
       

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: "turn",
            frames: [{key: "dude", frame: 4}],
            frameRate: 10,
        })

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {start: 5, end: 9}),
            frameRate: 10,
            repeat: -1
        })

        this.triggerTimer = this.time.addEvent({
            callback: this.addGround,
            callbackScope: this,
            delay: 700,
            loop: true
        })
    }

    addGround() {
        console.log("Adding new stuff!")
        this.groundGroup.create(Phaser.Math.Between(0, game.config.width), 0, "ground")
        this.groundGroup.setVelocityY(gameOptions.dudeSpeed / 6)

        if(Phaser.Math.Between(0, 1)) {
            this.starsGroup.create(Phaser.Math.Between(0, game.config.width), 0, "star")
            this.starsGroup.setVelocityY(gameOptions.dudeSpeed)
            this.enemyGroup.create(Phaser.Math.Between(0, game.config.width), 0, "enemy")
            this.enemyGroup.setVelocityY(gameOptions.dudeSpeed)

        }
    }

    collectStar(dude, start) {
        start.disableBody(true, true)
        this.score += 1
        this.scoreText.setText(this.score)
    }
    hitenemy(dude, enemy) {
        this.scoreText3 = this.add.text(350, 500, "Game Over", {fontSize: "30px", fill: "#ffffff"})
            this.scoreText4 = this.add.text(400, 550, "kills: " + this.kills, {fontSize: "30px", fill: "#ffffff"})
            this.scoreText5 = this.add.text(400, 600, "Score: " + this.score, {fontSize: "30px", fill: "#ffffff"})
            
            this.time.delayedCall(1000, () => { // Uusi yritys sekunnin kuluttua
        this.scene.restart("PlayGame");
        this.score = 0
        this.kills = 0
    })
    }

    killEnemy(bullet, enemy) {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.body.setVelocity(0);
        enemy.disableBody(true, true);
        this.kills += 1
        this.scoreText2.setText(this.kills)
    }

    shootBullet() {
        if (!this.bullet.active) {
            this.bullet.setActive(true);
            this.bullet.setVisible(true);
            this.bullet.setPosition(this.dude.x, this.dude.y);
            this.bullet.body.allowGravity = false;

            if (this.dude.anims.currentAnim && this.dude.anims.currentAnim.key === "left") {
                this.bullet.setVelocityX(-500);
            } else {
                this.bullet.setVelocityX(500);
            }
        }
    }
    
    update() {
        if(this.cursors.left.isDown) {
            this.dude.body.velocity.x = -gameOptions.dudeSpeed
            this.dude.anims.play("left", true)
        }
        else if(this.cursors.right.isDown) {
            this.dude.body.velocity.x = gameOptions.dudeSpeed
            this.dude.anims.play("right", true)
        }
        else {
            this.dude.body.velocity.x = 0
            this.dude.anims.play("turn", true)
        }

        if(this.cursors.up.isDown && this.dude.body.touching.down) {
            this.dude.body.velocity.y = -gameOptions.dudeGravity / 1.6
        }
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.shootBullet();
        }

        if (this.bullet.x > game.config.width || this.bullet.x < 0) {
            this.bullet.setActive(false);
            this.bullet.setVisible(false);
            this.bullet.body.setVelocity(0);
        }

        if(this.dude.y > game.config.height || this.dude.y < 0) {
            
            this.scoreText3 = this.add.text(350, 500, "Game Over", {fontSize: "30px", fill: "#ffffff"})
            this.scoreText4 = this.add.text(400, 550, "kills: " + this.kills, {fontSize: "30px", fill: "#ffffff"})
            this.scoreText5 = this.add.text(400, 600, "Score: " + this.score, {fontSize: "30px", fill: "#ffffff"})
            
            this.time.delayedCall(1000, () => { // Uusi yritys sekunnin kuluttua
        this.scene.start("PlayGame");
        this.score = 0
        this.kills = 0
        
    });
        

        }

    }

}


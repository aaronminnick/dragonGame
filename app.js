import Dragon from "./gameObjects/dragon.js";
import ProjectilePool from "./abstracts/projectile.js";

//setup
globalThis.app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
});
let app = globalThis.app;
app.stage.interactive = true;
app.renderer.view.style.position = 'absolute'
document.body.appendChild(app.view);
app.stage.position.set(app.screen.width / 2, app.screen.height / 2);
app.stage.scale.set(.5)
app.stage.rotation = 0
app.stage.pivot.set(app.screen.width / 2, app.screen.height / 2);

//setup projectile pool
let projectiles = new ProjectilePool(2000);

//setup dragon
let dragon = new Dragon(10);
window.dragon = dragon;
dragon.create();

//legs for temporary visual reference
for (let i = 0; i < 1000; i++) {
    let stuff = PIXI.Sprite.from('./assets/textures/arm.png')
    globalThis.app.stage.addChild(stuff);
    stuff.position.set(Math.random() * app.screen.width*50, Math.random() * app.screen.height*50);
}


app.ticker.add(() => {
    app.width = window.innerWidth;
    app.height = window.innerHeight;

    dragon.update(app.ticker.deltaMS/1000);
    projectiles.update(app.ticker.deltaMS/1000);

    app.stage.pivot.set(dragon.x, dragon.y);
});



window.addEventListener("keydown", handleKeyDown.bind(this));

function handleKeyDown(e) {
    switch (e.keyCode) {
      case 32:
        if (dragon.fireCooldown < 0) {
          projectiles.createOnObject(dragon, 1000, '../assets/textures/Fireball.png', 2, 5, true);
          dragon.fireCooldown = .4;
        }
        break;
    }
}
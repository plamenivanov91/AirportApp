function Pista() {

  PIXI.Sprite.call(this);
  this.texture = PIXI.Texture.fromImage("pista.png");
  this.rotation = Math.PI * 1.5;
  this.x = 700;
  this.y = 850;

}

Pista.prototype = Object.create(PIXI.Sprite.prototype);
Pista.prototype.constructor = Pista;

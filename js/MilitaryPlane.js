function MilitaryPlane() {

  PIXI.Sprite.call(this);
  this.texture = PIXI.Texture.fromImage('militaryPlane.png');
  this.hasToLand = false;
}

MilitaryPlane.prototype = Object.create(PIXI.Sprite.prototype);
MilitaryPlane.prototype.constructor = MilitaryPlane;

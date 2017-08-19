function CivilPlane() {
  PIXI.Sprite.call(this);
  this.texture = PIXI.Texture.fromImage('plane.png');
  this.hasToLand = false;
  this.hasToFly = false;

}

CivilPlane.prototype = Object.create(PIXI.Sprite.prototype);
CivilPlane.prototype.constructor = CivilPlane;

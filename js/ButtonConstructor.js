function butt(coorX, coorY, texture) {

  PIXI.Sprite.call(this);
  this.texture = PIXI.Texture.fromImage(texture);
  this.interactive = true;
  this.x = coorX;
  this.y = coorY;

}

butt.prototype = Object.create(PIXI.Sprite.prototype);
butt.prototype.constructor = butt;

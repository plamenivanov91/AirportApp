function APLot(id, x, y, text) {
  PIXI.Container.call(this);
  this.selected = false;
  this.interactive = true;
  this.id = id;
  this.isEmpty = true;
  this.groundAirPlane = {};
  this.x = x + 10;
  this.y = y + 10;
  this.rotation = Math.PI / 2;
  this._width = 110;
  this._height = 180;

  this.APLotDigit = new PIXI.Text(text, {
    font: "50px Arial",
    fill: "yellow"
  });

  this.APLotDigit.position.x = 40;
  this.APLotDigit.position.y = 100;

    var msk = new PIXI.Graphics();
  	msk.beginFill(0x990099,1);
  	msk.drawRect(0,0,this._width,this._height); // width : 309    height : 343
  	this.addChild(msk);

    msk.addChild(this.APLotDigit);
  this.click = function() {

    if (this.selected) {

      this.selected = false;
      this.emit("deSelected", this.id);
      this.groundAirPlane.alpha = 1;
    }

    else if (!this.isEmpty) {

      this.groundAirPlane.alpha = 0.5;
      this.emit("selected", this.id);
      this.selected = true;
    }
  }
}

APLot.prototype = Object.create(PIXI.Container.prototype);
APLot.prototype.constructor = APLot;

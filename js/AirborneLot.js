function AirborneLot(id, x, y, text) {
  PIXI.Container.call(this);
  var _that = this;
  this.tween;
  this.selected = false;
  this.interactive = true;
  this.id = id;
  this.isEmpty = true;
  this.airborneAirPlane = {};
  this.x = x + 10;
  this.y = y + 10;
  this._width = 100;
  this._height = 100;
  this.groundTarget = {};
  this.isDelayed = false;

  this.ABLotDigit = new PIXI.Text(text, {
    font: "50px Arial",
    fill: 0x990099
  });

    this.msk = new PIXI.Graphics();
  	this.msk.beginFill(0xCCFF00,1);
  	this.msk.drawRect(0,0,this._width,this._height);
  	this.addChild(this.msk);
    this.msk.addChild(this.ABLotDigit);

    this.mousedown = function() {

      if (this.selected) {

        this.selected = false;
        planeIsSelected  = null;
        this.emit("deSelected", this.id);
        this.airborneAirPlane.alpha = 1;
      }

      else if (!this.isEmpty) {
        if (planeIsSelected == null || planeIsSelected == this) {
          planeIsSelected  = this.airborneAirPlane;
        }
        else {
          planeIsSelected.airborneAirPlane.alpha = 1;
          planeIsSelected.selected = false;
        }
        this.airborneAirPlane.alpha = 0.5;
        this.emit("selected", this.id);
        planeIsSelected  = this;
        this.selected = true;

      }
    }

}

var planeIsSelected = null;

AirborneLot.prototype = Object.create(PIXI.Container.prototype);
AirborneLot.prototype.constructor = AirborneLot;

AirborneLot.prototype.addPlane = function (plane) {
this.msk.addChild(plane);

}

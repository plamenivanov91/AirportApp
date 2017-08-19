function UIController() {

  PIXI.Container.call(this);

  this.UIV = new UIView();

  this.onPlaneAdd = function() {
    this.emit("airPlaneToTheAir");
  };

  this.onPlaneLand = function(gateNum) {
    this.emit("landAirPlane", gateNum);
  }

  this.UIV.on("airPlaneToTheAir", this.onPlaneAdd, this);
  this.UIV.on("landAnAirPlane", this.onPlaneLand, this);

  this.addChild(this.UIV);

}

UIController.prototype = Object.create(PIXI.Container.prototype);
UIController.prototype.constructor = UIController;

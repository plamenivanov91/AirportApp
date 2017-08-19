function UIView() {
  PIXI.Container.call(this);

  this.ButtFly = new butt(1680, 40, "src/ButtFly.png");
  this.ButtLand = new butt(1620, 250, "src/ButtLand.png");

  this.onButtFlyClick = function() {
    this.emit("airPlaneToTheAir");
  }

  this.onButtLandClick = function() {
    var gateNum = $('#landingGate').val();
    this.emit("landAnAirPlane", gateNum);
  }

  this.ButtFly.on("click", this.onButtFlyClick, this);
  this.ButtLand.on("click", this.onButtLandClick, this);

  this.addChild(this.ButtFly);
  this.addChild(this.ButtLand);

}

UIView.prototype = Object.create(PIXI.Container.prototype);
UIView.prototype.constructor = UIView;

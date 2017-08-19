function AirPortView(lots) {

  PIXI.Sprite.call(this);
  this.texture = PIXI.Texture.fromImage("src/Airport_Gates.jpg");
  this.pista = new Pista();
  this.addChild(this.pista);
  this.animator = new Animator();
  this.addChild(this.animator);
  this.delayedAirplanes = [];
  _that = this;

  this.planeLanded = function(airborneParklot, targetGroundParkLot) {
    if (airborneParklot.airborneAirPlane instanceof CivilPlane) {
      targetGroundParkLot.groundAirPlane = new CivilPlane();
      targetGroundParkLot.isEmpty = false;
    } else {
      targetGroundParkLot.groundAirPlane = new MilitaryPlane();
      targetGroundParkLot.isEmpty = false;
    }

    targetGroundParkLot.addChild(targetGroundParkLot.groundAirPlane);
    this.removeChild(airborneParklot.airborneAirPlane);
    airborneParklot.hasToLand = false;
    airborneParklot.isEmpty = true;
    airborneParklot.groundAirPlane = null;
    airborneParklot.selected = false;
  }

  this.airborneComplete = function(airborneAPPlot, groundParklot) {
    if (groundParklot.groundAirPlane instanceof CivilPlane) {
      airborneAPPlot.airborneAirPlane = new CivilPlane();
      airborneAPPlot.isEmpty = false;
    } else {
      airborneAPPlot.airborneAirPlane = new MilitaryPlane();
      airborneAPPlot.isEmpty = false;
    }
    airborneAPPlot.airborneAirPlane.scale.x = 1.6;
    airborneAPPlot.airborneAirPlane.scale.y = 1.6;
    airborneAPPlot.addChild(airborneAPPlot.airborneAirPlane);

    this.removeChild(groundParklot.groundAirPlane);
    groundParklot.hasToFly = false;
    groundParklot.isEmpty = true;
    groundParklot.groundAirPlane = null;
    groundParklot.selected = false;

    this.emit("airPlaneInTheAirComplete");
  }
  this.animator.on("airPlaneInTheAir", this.airborneComplete, this);
  this.animator.on("airPlaneLanded", this.planeLanded, this);
}

AirPortView.prototype = Object.create(PIXI.Sprite.prototype);
AirPortView.prototype.constructor = AirPortView;

AirPortView.prototype.drawAirPortLots = function(airPortParklot) {
  for (var i = 0; i < airPortParklot.length; i++) {
    this.addChild(airPortParklot[i]);
  }
}

AirPortView.prototype.militaryPriorityCheck = function(index, indexArray) {
var nextIndex = index;
  for (var i = 0; i < 2; i++) {
    ++nextIndex;
    if(nextIndex >= indexArray.length){
      nextIndex = indexArray.length - nextIndex;
    }
    var nextAirplane = indexArray[nextIndex].airborneAirPlane;

    if ((nextAirplane instanceof MilitaryPlane) && (indexArray[nextIndex].hasToLand == true)) {
      indexArray[index].hasToLand = false;
      indexArray[index].isDelayed = true;
      break;
    }
  }
}

AirPortView.prototype.drawAirborneLots = function(airborneParklot) {

  for (var i = 0; i < airborneParklot.length; i++) {
    this.addChild(airborneParklot[i]);
    var tl = new TimelineMax({onRepeat: idCheck, onRepeatParams: [airborneParklot[i]]});
    tl.repeat(Infinity);
    tl.delay(i + 1);
    tl.to(airborneParklot[i], 8, {
      bezier: {type: "thrue",curviness: 1.5,values:
      [{x: 500,y: 100}, {x: 1200,y: 100},
        {x: 1200,y: 900},{x: 500,y: 1050}, {x: 320,y: 730}],
        autoRotate: ["x", "y", "rotation", 1.5, true]},
      ease: Linear.easeNone});
    airborneParklot[i].tween = tl;
  }

  function idCheck(airborneLot) {
    var index = airborneParklot.indexOf(airborneLot);
    _that.militaryPriorityCheck(index, airborneParklot);

   if ((airborneLot.hasToLand == true)){
      airborneLot.airborneAirPlane.alpha = 1;
      airborneLot.airborneAirPlane.x = airborneLot.x;
      airborneLot.airborneAirPlane.y = airborneLot.y;
      _that.addChild(airborneLot.airborneAirPlane);
      _that.animator.landAnAirPlane(airborneLot, airborneLot.groundTarget);
    }

     else if (airborneLot.isEmpty == true) {
      _that.emit("readyToFly", airborneLot);
    }
  }
}

AirPortView.prototype.airPlaneToAir = function(airborneAPPlot, groundParklot) {

  groundParklot.groundAirPlane.alpha = 1;
  groundParklot.groundAirPlane.x = groundParklot.x;
  groundParklot.groundAirPlane.y = groundParklot.y;
  groundParklot.removeChild(groundParklot.groundAirPlane);

  this.addChild(groundParklot.groundAirPlane);
  this.animator.sendAnAirPlaneToTheAir(airborneAPPlot, groundParklot);
}

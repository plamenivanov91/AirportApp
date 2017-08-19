function AirPortController(lots) {

  _that = this;
  PIXI.Container.call(this);
  this.APView = new AirPortView(lots);
  this.airPortParkLots = [];
  this.airborneParkLots = [];
  this.selectedGroundIDs = [];
  this.selectedAirborneIDs = null;


this.pushToselectedAirborneIDs = function(id) {
  if (this.selectedAirborneIDs != id || this.selectedAirborneIDs == null) {
      this.selectedAirborneIDs = id;
  }
}

this.spliceFromselectedAirborneIDs = function(id) {
  this.selectedAirborneIDs = null;
}

  this.pushToselectedGroundIDs = function(id) {
        this.selectedGroundIDs.push(id);
  }
  this.spliceFromselectedGroundIDs = function(id) {
    var index = this.selectedGroundIDs.indexOf(id);
    this.selectedGroundIDs.splice(index, 1);
  }

  this.addChild(this.APView);
  this.generateAirPortLots();
  this.generateAirborneLots();
  this.randomSpawnOfAirplanesOnTheGround("civil");
  this.randomSpawnOfAirplanesOnTheGround("military");

  for (var i = 0; i < 3; i++) {
  this.randomSpawnOfAirplanesInTheAir("civil");
}
  this.randomSpawnOfAirplanesInTheAir("military");
  this.APView.on("airPlaneInTheAirComplete", this.moveAirPlaneToTheAir, this);
}

AirPortController.prototype = Object.create(PIXI.Container.prototype);
AirPortController.prototype.constructor = AirPortController;

AirPortController.prototype.generateAirborneLots = function() {
  var x, y;
  for (var i = 0; i < 8; i++) {
    x = 300;
    y = 700;
    parklot = new AirborneLot(i, x, y, i);
    this.airborneParkLots.push(parklot);

    parklot.on("selected", this.pushToselectedAirborneIDs, this);
    parklot.on("deSelected", this.spliceFromselectedAirborneIDs, this);
  }
  this.APView.drawAirborneLots(this.airborneParkLots);
};

AirPortController.prototype.generateAirPortLots = function() {
  var x, y;
  for (var i = 0; i < 5; i++) {
    x = 960;
    y = 245 + (i * 120);
    parklot = new APLot(i, x, y, i);
    this.airPortParkLots.push(parklot);

    parklot.on("selected", this.pushToselectedGroundIDs, this);
    parklot.on("deSelected", this.spliceFromselectedGroundIDs, this);
  }
  this.APView.drawAirPortLots(this.airPortParkLots);
};

AirPortController.prototype.getAvailableParkLot = function(applotIndicator) {
  for (var i = 0; i < Infinity;) {
    var currArr;
    switch (applotIndicator) {
      case "forGround":
        currArr = this.airPortParkLots;
        break;
      case "forAir":
        currArr = this.airborneParkLots;
        break;
    }

    var randomGroundAPPlot = Math.floor(Math.random() * currArr.length);
    var currentParkLot = currArr[randomGroundAPPlot];

    var previousParkLot = currArr[randomGroundAPPlot - 1];
    var nextParkLot = currArr[randomGroundAPPlot + 1];

    if (previousParkLot == undefined) {
      previousParkLot = currentParkLot;
    } else if (nextParkLot == undefined) {
      nextParkLot = currentParkLot;
    }

    if (currentParkLot.isEmpty) {
      return currentParkLot;
    }
    i++;
  }
}

AirPortController.prototype.randomSpawnOfAirplanesOnTheGround = function(airplane) {
  var currGroundParkLot = this.getAvailableParkLot("forGround");
  switch (airplane) {
    case "civil":
      currGroundParkLot.groundAirPlane = new CivilPlane();
      currGroundParkLot.isEmpty = false;
      break;
    case "military":
      currGroundParkLot.groundAirPlane = new MilitaryPlane();
      currGroundParkLot.isEmpty = false;
      break;
  }
  currGroundParkLot.addChild(currGroundParkLot.groundAirPlane);
}

AirPortController.prototype.randomSpawnOfAirplanesInTheAir = function(airplane) {

  var currAirborneParkLot = this.getAvailableParkLot("forAir");
  switch (airplane) {
    case "civil":
      currAirborneParkLot.airborneAirPlane = new CivilPlane();
      currAirborneParkLot.isEmpty = false;
      break;
    case "military":
      currAirborneParkLot.airborneAirPlane = new MilitaryPlane();
      currAirborneParkLot.isEmpty = false;
      break;
  }
  currAirborneParkLot.airborneAirPlane.scale.x = 1.6;
  currAirborneParkLot.airborneAirPlane.scale.y = 1.6;
  currAirborneParkLot.addChild(currAirborneParkLot.airborneAirPlane);
}

AirPortController.prototype.landTheAirPlane = function (gateNum) {

var airborneParklot = this.airborneParkLots[this.selectedAirborneIDs];
airborneParklot.hasToLand = true;

       var audioElement = document.createElement('audio');
       audioElement.setAttribute('src', 'src/sound.mp3');

      if((this.airPortParkLots[gateNum] == undefined) || (this.airPortParkLots[gateNum].isEmpty == false)){
        audioElement.play();
        airborneParklot.hasToLand = false;
      }
        airborneParklot.groundTarget = this.airPortParkLots[gateNum];
}
AirPortController.prototype.moveAirPlaneToTheAir = function() {

this.deployAirPlane = function (airborneLot) {

  if (this.selectedGroundIDs.length != 0) {

      var targetAirborneParklot = airborneLot;
      var groundParklot = this.airPortParkLots[this.selectedGroundIDs[0]];
      //groundParklot.hasToFly = true;
      //break;

      this.APView.airPlaneToAir(targetAirborneParklot, groundParklot);
      //break;
  }
  this.selectedGroundIDs = [];
}
this.APView.on("readyToFly", this.deployAirPlane, this);
}

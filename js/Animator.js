function Animator() {
  PIXI.Container.call(this);
  var _that = this;

  this.sendAnAirPlaneToTheAir = function (airborneAPPlot, groundParklot) {
    var groundAirPlane = groundParklot.groundAirPlane;
    
     var tl = new TimelineMax({onComplete:_that.airPlaneEnterAirborneParkLot , onCompleteParams:[airborneAPPlot, groundParklot]});

            tl.to(groundAirPlane,4,{bezier:{autoRotate:["x","y","rotation", Math.PI * 1.5,true],type:"soft",values:
            [{x:groundAirPlane.x - 160, y:groundAirPlane.y},
              {x:groundAirPlane.x - 160, y:groundAirPlane.y - 50},
              {x:groundAirPlane.x - 160 , y:200}
            ]}});

            tl.to(groundAirPlane,4.1,{bezier:{autoRotate:["x","y","rotation", Math.PI / 2,true],type:"thrue", curviness:1.5,values:
            [{x:800, y: 700},
              {x:800, y: 850},
              {x:750, y: 900},
              {x: 350 , y: 800},
              {x: 300 , y: 650},

            ]}, ease:Linear.easeNone});
            tl.to(groundAirPlane.scale ,2, {x:1.6,y:1.6},5);

      }
    this.airPlaneEnterAirborneParkLot = function (airborneAPPlot, groundParklot) {
      _that.emit("airPlaneInTheAir",airborneAPPlot, groundParklot);
    }

  this.landAnAirPlane = function (airborneParklot, targetGroundParkLot) {
    var airAirplane = airborneParklot.airborneAirPlane;
    var tl = new TimelineMax({onComplete:_that.airPlaneLanded , onCompleteParams:[airborneParklot, targetGroundParkLot]});

         tl.to(airAirplane,5,{bezier:{autoRotate:["x","y","rotation", Math.PI / 1.5,true],type:"soft",values:
         [{x: airAirplane.x + 350 , y: airAirplane.y - 600},
           {x:targetGroundParkLot.x - 150, y: targetGroundParkLot.y + 10},
           {x:targetGroundParkLot.x, y:targetGroundParkLot.y}
         ]}});
         tl.to(airAirplane.scale ,3, {x:1,y:1},2);
         }

         this.airPlaneLanded = function (airborneParklot, targetGroundParkLot) {
         _that.emit("airPlaneLanded", airborneParklot, targetGroundParkLot);

         }
    }

Animator.prototype = Object.create(PIXI.Container.prototype);
Animator.prototype.constructor = Animator;

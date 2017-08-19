$(document).ready(function() {
  var stage, renderer;

  var loader = new PIXI.loaders.Loader();
  loader.add('bunny', "src/sprites.json");
  loader.on('complete', onAssetsLoaded);
  loader.load();

  function onAssetsLoaded() {

    stage = new PIXI.Container();
    renderer = new PIXI.autoDetectRenderer(1900 , 1060);
    renderer.backgroundColor = 0xFFFF66	;
    document.body.appendChild(renderer.view);
    requestAnimationFrame(animate);

    var apController = new AirPortController(5);
    var uiController = new UIController();

    uiController.on("airPlaneToTheAir", function () {
      apController.moveAirPlaneToTheAir();
    });

    uiController.on("landAirPlane", function (gateNum) {
      apController.landTheAirPlane(gateNum);
    });

    stage.addChild(uiController);
    stage.addChild(apController);

}
function animate() {
  //APController.bezierche();
  requestAnimationFrame(animate);
  renderer.render(stage);
}

});

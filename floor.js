class FloorItem extends Item {
  trigger(player) {

  }
}

class Stairs extends FloorItem {
  constructor() {
    super();
    this.open = true;
  }
  trigger(unit) {
    super.trigger(unit);
    unit.is_player && this.open && unit.game.nextLevel();
  }
  draw(canvas) {
    var ctx = canvas.ctx;
    ctx.fillStyle = "black";
    ctx.fillRect(10,10,20,20)
  }
}

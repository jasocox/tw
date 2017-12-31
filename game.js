class Game extends uR.Object {
  constructor() {
    super()
    this.bindKeys();
    this.board = new Board({ game: this, });
    this.player = new Player({ game: this, board: this.board, x:3, y:3, health: 3 });
    uR.newElement(
      "tw-scores",
      { parent: document.querySelector("#game") },
      { player: this.player, game: this }
    );
    this.board.draw();
    this.controller = new Controller({ parent: this });
    this.level_number = -1;
    this.nextLevel();
  }
  nextLevel() {
    this.level_number++;
    this.board.loadLevel(this.level_number);
  }
  keydown(key) {
    this.key_map[key] && this.key_map[key]();
    this.board.draw();
    this.ui && this.ui.update();
  }
  keyup(key) {}
  bindKeys() {
    var key_map = {
      up: function() { this.player.move(0,-1); },
      down: function() { this.player.move(0,1); },
      left: function() { this.player.move(-1,0); },
      right: function() { this.player.move(1,0); },
      space: function() { this.player.move(0,0); },
    }
    this.key_map = {};
    function d(f,self) {
      f = f.bind(self);
      return function() {
        f();
        self.nextTurn();
      }
    }
    for (var k in key_map) { this.key_map[k] = d(key_map[k],this); }
  }
  nextTurn() {
    this.board.pieces.forEach(function(p) { p.play() });
  }
}

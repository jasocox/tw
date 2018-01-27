class Game extends uR.Object {
  constructor() {
    super()
    this.bindKeys();
    this.board = new Board({ game: this, });
    this.controller = new Controller({ parent: this });
    this.level_number = -1;
    this.nextLevel();
    uR.newElement(
      "tw-scores",
      { parent: document.querySelector("#game") },
      { player: this.player, game: this }
    );
    this.board.draw();
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
  onPiecePop(piece) {
    if (!this.board.pieces.length) {
      this.piece_count = (this.piece_count || 0) + 1;
      var enemy_count = 0;
      var board = this.board;
      while(enemy_count<this.piece_count) {
        var square = board.getSquare(uR.math.randint(0,board.x_max),uR.math.randint(0,board.y_max));
        if (square) {
          board.pieces.push(new board.enemy_map['W']({x:square.x,y:square.y,board:board}));
          enemy_count += 1;
        }
      }
    }
  }
}

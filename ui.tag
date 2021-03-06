<tw-scores>
  <div>Health: { player.health }</div>
  <div>Gold: { player.gold }</div>
  <div>Score: { player.score }</div>
  <pre class="minimap">{ player.printMiniMap() }</pre>
  <div class="admin">
    <button onclick={ showSprites }>show sprites</button>
    <div each={ settings }>
      <button onclick={ editSettings }>{ name }</button>
    </div>
  </div>

  this.on("mount",function() {
    this.player = this.opts.player;
    this.opts.game.ui = this;
    this.game = this.opts.game;
    this.update();
  });
  this.on("update",function() {
    this.settings = [
      { name: "Game Config", config: this.opts.game.config },
    ]
    for (let key of uR.sprites.keys) {
      var sprite = uR.sprites[key];
      if (!sprite.config.keys.length) { continue }
      sprite.draw();
      this.settings.push({ name: "Sprite - " + sprite.name, config: sprite.config });
    }
  });
  showSprites() {
    uR.alertElement('tw-sprites');
  }
  editSettings(e) {
    e.item.config.openEditor();
  }
</tw-scores>

<tw-gameover>
  <div class={ theme.outer }>
    <div class={ theme.content }>
      <h1>Game over!</h1>
      <p>Press any key to restart</p>
    </div>
  </div>
  this.on("unmount",function() {
    this.opts.game.restart();
  });
</tw-gameover>

<tw-sprites>
  <div class={ theme.outer }>
    <div class={ theme.content }>
      <div each={ sprites }>
        <img src={ canvas.toDataURL() } />
      </div>
    </div>
  </div>
  this.on("mount",function() {
    this.sprites = [];
    for (let key of uR.sprites.keys) { uR.sprites[key].draw(); this.sprites.push(uR.sprites[key]); }
    this.update();
  });
</tw-sprites>

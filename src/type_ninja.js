/**
 * Top level class of the application
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
var TypeNinja = new Class({
  HITS_BEFORE_ADVANCING: 8,
  MISS_BEFORE_SLOW_DOWN: 2,
  
  MAX_MISSES_BEFORE_LEVEL_UP:   2,
  MIN_MISSES_BEFORE_LEVEL_DOWN: 8,
  
  initialize: function(element) {
    this.element = $E('div', {'class': 'tn-layout'}).insertTo(element);
    
    this.progress = new TypeNinja.Progress();
    this.field    = new TypeNinja.Field();
    this.keyboard = new TypeNinja.Keyboard();
    this.settings = new TypeNinja.Settings();
    
    this.element.insert([
      this.settings.element,
      this.progress.element,
      this.field.element,
      this.keyboard.element
    ]);
    
    // connecting the events
    this.keyboard
      .onLayoutChange(this.progress.setLayout.bind(this.progress))
      .onKeyPress(this.field.keyPressed.bind(this.field));
      
    this.settings
      .onLayoutChange(this.keyboard.setLayout.bind(this.keyboard))
      .onStartClick(this.start.bind(this))
      .onStopClick(this.stop.bind(this));
      
    this.field
      .onHit(this.countHit.bind(this))
      .onMiss(this.countMiss.bind(this));
    
    
    // initializing the layout
    this.settings
      .setLayout(Cookie.get('tn-layout') || 'en')
      .setSpeed((Cookie.get('tn-speed') || '2').toInt());

    this.progress.setLevel((Cookie.get('tn-level') || '2').toInt());
    
    
    // initiating the statisticss
    this.missedKeys = {};
    this.hitsCounter = 0;
    this.missCounter = 0;
  },
  
  start: function() {
    this.stopped = false;
    
    this.dropNext();
  },
  
  stop: function() {
    this.stopped = true;
    this.field.clear();
  },
  
// proteced

  countHit: function(char) {
    if (this.missedKeys[char])
      this.missedKeys[char] --;
      
    if (this.missedKeys[char] < 1)
      delete(this.missedKeys[char]);
    
    this.hitsCounter ++;
    this.missCounter = 0;
    
    if (this.hitsCounter > this.HITS_BEFORE_ADVANCING) {
      this.settings.advance();
      this.hitsCounter = 0;
    }
    
    this.settings.countHit().updateMostMissed(this.missedKeys);
    
    this.checkProgress();
  },
  
  countMiss: function(char) {
    if (!this.missedKeys[char]) this.missedKeys[char] = 0;
    this.missedKeys[char] ++;
    
    this.missCounter ++;
    this.hitsCounter = 0;
    
    if (this.missCounter > this.MISS_BEFORE_SLOW_DOWN) {
      this.settings.slowDown();
    }
    
    this.settings.countMiss().updateMostMissed(this.missedKeys);
    
    this.checkProgress();
  },
  
  dropNext: function() {
    if (this.stopped) return false;
    
    var speed = 1000 + 7000 * (10 - this.settings.getSpeed()) / 10;
    
    var symbol = this.progress.getActive().concat(this.mostMissedChars()).random();
    this.field.drop(symbol, speed, this.keyboard.getKeyLeftOffset(symbol));
    
    this.timer = this.dropNext.bind(this).delay(speed/2);
  },
  
  // returns the list of most missed chars
  mostMissedChars: function() {
    return Object.keys(this.missedKeys);
  },
  
  // adjusts the progress bar position
  checkProgress: function() {
    var missed_chars = this.mostMissedChars();
    
    if (missed_chars.length < this.MAX_MISSES_BEFORE_LEVEL_UP)
      this.progress.levelUp();
    else if (missed_chars.length > this.MIN_MISSES_BEFORE_LEVEL_DOWN)
      this.progress.levelDown();
  }
});
/**
 * Top level class of the application
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */

var TypeNinja = new Class({
  extend: {
    ADVANCING_THRESHOLD: 1,
  },
  
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
    this.keyboard.setLayout('en');
    this.progress.setLevel(2);
    
    
    this.missedKeys = {};
    this.hitsCounter = 0;
    this.missCounter = 0;
    //this.start();
  },
  
  start: function() {
    this.stopped = false;
    
    this.dropNext();
  },
  
  stop: function() {
    this.stopped = true;
  },
  
// proteced

  countHit: function(char) {
    if (this.missedKeys[char])
      this.missedKeys[char] --;
    
    this.hitsCounter ++;
    this.missCounter = 0;
    
    if (this.hitsCounter > TypeNinja.ADVANCING_THRESHOLD) {
      this.settings.advance();
      this.hitsCounter = 0;
    }
    
    this.settings.countHit().updateMostMissed(this.missedKeys);
  },
  
  countMiss: function(char) {
    if (!this.missedKeys[char]) this.missedKeys[char] = 0;
    this.missedKeys[char] ++;
    
    this.missCounter ++;
    this.hitsCounter = 0;
    
    if (this.missCounter > TypeNinja.ADVANCING_THRESHOLD) {
      this.settings.slowDown();
    }
    
    this.settings.countMiss().updateMostMissed(this.missedKeys);
  },
  
  dropNext: function() {
    if (this.stopped) return false;
    
    var speed = (10 - this.settings.getSpeed()) * 1000;
    
    var symbol = this.progress.getActive().random();
    this.field.drop(symbol, speed, this.keyboard.getKeyLeftOffset(symbol));
    
    this.timer = this.dropNext.bind(this).delay(speed/2);
  }
});
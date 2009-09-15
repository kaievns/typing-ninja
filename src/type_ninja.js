/**
 * Top level class of the application
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */

var TypeNinja = new Class({
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
    console.log("Hit", char);
  },
  
  countMiss: function(char) {
    console.log("Miss", char);
  },
  
  dropNext: function() {
    if (this.stopped) return false;
    
    var symbol = this.progress.getActive().random();
    this.field.drop(symbol, this.keyboard.getKeyLeftOffset(symbol));
    
    this.timer = this.dropNext.bind(this).delay(2000);
  }
});
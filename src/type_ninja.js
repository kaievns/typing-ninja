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
    
    this.element.insert([
      this.progress.element,
      this.field.element,
      this.keyboard.element
    ]);
    
    // connecting the events
    this.keyboard.onLayoutChange(this.progress.setLayout.bind(this.progress));
    
    // initializing the layout
    this.keyboard.setLayout('en');
    
    this.progress.setLevel(2);
  }
});
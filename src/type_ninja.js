/**
 * Top level class of the application
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */

var TypeNinja = new Class({
  initialize: function(element) {
    this.element = $E('div', {'class': 'tn-layout'}).insertTo(element);
    
    this.keyboard = new TypeNinja.Keyboard();
    
    this.element.insert([
      this.keyboard.element
    ]);
  }
});
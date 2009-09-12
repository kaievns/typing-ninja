/**
 * Top level class of the application
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */

var TypeNinja = new Class({
  initialize: function(element) {
    this.element = $E('div', {'class': 'tn-layout'}).insertTo(element);
    
    this.keyboard = new TypeNinja.Keyboard();
    this.field    = new TypeNinja.Field();
    
    this.element.insert([
      this.field.element,
      this.keyboard.element
    ]);
  }
});
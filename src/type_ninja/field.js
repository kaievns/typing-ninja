/**
 * The class of field
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
TypeNinja.Field = new Class(Observer, {
  EVENTS: $w('hit miss'),
  
  initialize: function(options) {
    this.$super(options);
    this.element = $E('div', {'class': 'tn-field'});
    this.stack = [];
  },
  
  // receives the requests to drop another symbol
  drop: function(symbol, offset_left) {
    var key = $E('div', {'class': 'tn-key', html: symbol, style: 'left: '+offset_left+'px'}).insertTo(this.element);
    
    key.droppinFx = new Fx.Morph(key, {
      duration: 8000, fps: 40,
      onFinish: function() {
        var element = this.pullElement(symbol.charCodeAt());
        if (element) {
          element.highlight('#F66', {onFinish: element.remove.bind(element)});
          this.fire('miss', symbol);
        }
      }.bind(this)
    }).start({ top: (this.element.offsetHeight - key.offsetHeight - 2)+'px' });
    
    this.stack.push({code: symbol.charCodeAt(), element: key});
  },
  
  // receives key-press events out of the keyboard
  keyPressed: function(key_code) {
    var element = this.pullElement(key_code);
    
    if (element) {
      element.droppinFx.cancel();
      element.highlight('#AFA', {
        duration: 160, onFinish: element.remove.bind(element)
      });
      
      this.fire('hit', element.innerHTML);
    }
  },
  
// protected
  
  // pulls the key out of the dropping keys list
  pullElement: function(key_code) {
    var unit = null, stack = [];
    
    // looking for the first matching key
    for (var i=0; i < this.stack.length; i++) {
      if (!unit && this.stack[i].code == key_code) {
        unit = this.stack[i];
      } else {
        stack.push(this.stack[i]);
      }
    }
    
    this.stack = stack;
    
    return unit ? unit.element : null;
  }
});
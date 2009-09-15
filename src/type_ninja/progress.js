/**
 * The progress-bar element
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
TypeNinja.Progress = new Class(Observer, {
  // the keys presenting sequence
  SEQUENCE: "fjdksla; gtyrueiwoqpbnvmc,x.z/'FJDKSLA:GHTYRUEIWOQPBNVMC<X>Z?\"675849302-1=^&%*$(#)@_!+[{}]`~\\|",
  
  // basic constructor
  initialize: function() {
    this.element = $E('div', {'class': 'tn-progress'});
    
    this.build();
  },
  
  /**
   * Sets the sequence layout
   *
   * @param Array layout (out of the Keyboard.LAYOUTS)
   * @return this
   */
  setLayout: function(layout) {
    // building the current layout
    this.layout = [];
    
    // filling up the symbols 
    layout.join('').split('').each(function(symbol, position) {
      position = this.sequence.indexOf(this.enLayout[position]);
      if (position > -1) {
        this.keys[position].innerHTML = this.layout[position] = symbol;
      }
    }, this);
    
    return this;
  },
  
  /**
   * sets the level
   * 
   * @param mixed level a string symbol out of the SEQUENCE or a number of the symbol in the sequence
   * @return this
   */
  setLevel: function(number) {
    this.level = isString(number) ? this.sequence.indexOf(number) : number - 1;
    
    this.keys.each(function(key, i) {
      key[i > this.level ? 'addClass' : 'removeClass']('tn-progress-key-disabled');
    }, this);
    
    this.scrollTo(this.level);
    
    return this;
  },
  
  getActive: function() {
    return this.layout.flatten().slice(0, this.level+1);
  },
  
// protected
  scrollTo: function(index) {
    var box_size = this.containerBox.offsetWidth;
    var key_size = this.keys[0].offsetWidth + 2;
    var max_size = (key_size * this.keys.length) - box_size;
    
    var offset = box_size/2 - index*key_size;
    
    if (offset > 0) {
      offset = 0;
    } else if (offset < -max_size) {
      offset = -max_size;
    }
    
    this.container.morph({left: offset+'px'});
  },
  
  build: function() {
    this.enLayout  = TypeNinja.Keyboard.LAYOUTS.EN.join('').split('');
    this.sequence = this.SEQUENCE.split('');
    
    this.keys = [];
    
    this.containerBox = $E('div', {'class': 'tn-progress-container'}).insertTo(this.element);
    this.container = $E('div').insertTo(this.containerBox);
    this.container.insert(this.sequence.map(function(symbol) {
      var key = $E('span').onClick(this.setLevel.bind(this, symbol));

      this.keys.push(key);

      return key;
    }, this));
  }
});
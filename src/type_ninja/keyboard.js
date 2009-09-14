/**
 * The game keyboard widget
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
TypeNinja.Keyboard = new Class(Observer, {
  extend: {
    EVENTS: $w('layout_change'),
    
    LAYOUTS: {
      EN: [
        '`~1!2@3#4$5%6^7&8*9(0)-_=+',
        'qQwWeErRtTyYuUiIoOpP[{]}\\|',
        'aAsSdDfFgGhHjJkKlL;:\'"',
        'zZxXcCvVbBnNmM,<.>/?'
      ],

      RU: [
        '][1!2"3№4;5%6:7?8*9(0)-_=+',
        'йЙцЦуУкКеЕнНгГшШщЩзЗхХъЪ\\/',
        'фФыЫвВаАпПрРоОлЛдДжЖэЭ',
        'яЯчЧсСмМиИтТьЬбБюЮ.,'
      ]
    },
    
    FINGERS: [
      '11234444321111',
      '01234444321111',
      '0123444432111',
      '112344443211'
    ]
  },
  
  /**
   * constructor
   *
   * @param String optional initial layout name
   */
  initialize: function(layout_name, options) {
    this.$super(options);
    
    this.element = $E('div', {'class': 'tn-keyboard'});
    
    this.build().connect();
  },
  
  /**
   * Sets the layout
   *
   * @param String layout name
   * @return Keyboard self
   */
  setLayout: function(name) {
    var down = null;
    
    (this.layout = this.constructor.LAYOUTS[name.toUpperCase()]).each(function(row, i) {
      row.split('').each(function(symbol, j) {
        if (j % 2) {
          var key = this.keys[down.charCodeAt()] = this.keys[symbol.charCodeAt()] = this.rows[i][(j-1)/2];
          key.innerHTML = '<span>'+down+'</span><span class="up">'+symbol+'</span>';
        } else {
          down = symbol;
        }
      }, this);
    }, this);
    
    return this.fire('layout_change', this.layout);
  },
  
  shiftUp: function(event) {
    if (!event || event.keyCode == 16)
      this.element.addClass('shifted');
      
    return this;
  },
  
  shiftDown: function(event) {
    if (!event || event.keyCode == 16)
      this.element.removeClass('shifted');
      
    return this;
  },
  
// protected
  
  hightlightKey: function(event) {
    var key = this.keys[event.charCode] || this.keys[event.keyCode];
    if (key) {
      if (!event.altKey && !event.ctrlKey && !event.metaKey) {
        event.stop();
        key.highlight({duration: 160});
      }
    }
  },

  // connects the events
  connect: function() {
    document.on({
      keypress: this.hightlightKey.bind(this),
      keyup:    this.shiftDown.bind(this),
      keydown:  this.shiftUp.bind(this)
    });
    
    return this;
  },
  
  // builds the main keyboard structure
  build: function() {
    this.keys = []; // a flat keys list (indexed by key-code)
    this.rows = []; // the row by row keys list
    
    // grabbing the default layout as the model
    this.constructor.LAYOUTS.EN.each(function(row, i) {
      var row_el = this.buildRow(i, row);
      
      if (i == 0) row_el.insert(this.buildKey('&larr;', 'backspace', 8));
      if (i == 1) row_el.insert(this.buildKey('&rarr;', 'tab'), 'top');
      if (i == 2) {
        row_el.insert({
          top:    this.buildKey('', 'capslock'),
          bottom: this.buildKey('&crarr;', 'enter', 13)
        });
      }
      if (i == 3) {
        row_el.insert({
          top:    this.buildKey('Shift', 'l-shift', 16),
          bottom: this.buildKey('Shift', 'r-shift', 16)
        });
      }
      
      this.element.insert(row_el);
      
      // assigning the finger styles
      this.constructor.FINGERS[i].split('').each(function(number, i) {
        row_el.childNodes[i].addClass('tn-keyboard-key-'+number+'-finger');
      });
    }, this);
    
    // building the spacebar row
    this.element.insert(this.buildRow(4, '').insert(this.buildKey(' ', 'space', 32)));
    
    return this;
  },
  
  // builds a row of keys
  buildRow: function(num, chars_row) {
    var keys = [];
    
    (chars_row.length/2).times(function() {
      keys.push(this.buildKey(''));
    }, this);
    
    this.rows.push(keys);
    
    return $E('div').addClass('tn-keyboard-row-'+(num+1)).insert(keys);
  },
  
  // builds a key elemnt
  buildKey: function(label, klass, key_code) {
    // bulding the key element
    var key = $E('span', {'class': klass}).addClass('tn-keyboard-key').update(label);
    
    // registering the key in the keys registry
    if (key_code && key_code != 16) {
      this.keys[key_code] = key;
    }
    
    return key;
  }
});

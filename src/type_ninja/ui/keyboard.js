/**
 * Represents the keyboard ui
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */
TypeNinja.UI.Keyboard = new Class({
  initialize: function(model) {
    this.model = model;
    
    this.element = $E('div', {'class': 'tn-keyboard'});
    
    this.model.rows.each(function(row, i) {
      var row_el = this.row(i, row.map(function(key) {
        return this.key(key);
      }, this));
      
      if (i == 0) row_el.insert(this.key('←', 'backspace', 8));
      if (i == 2) row_el.insert(this.key('Enter', 'enter', 13));
      if (i == 3) {
        row_el.insert({
          top:    this.key('Shift', 'r-shift', 16),
          bottom: this.key('Shift', 'l-shift', 16)
        });
      }
      
      this.element.insert(row_el);
    }, this);
    
    this.element.insert(this.row(4, [this.key(' ', 'space', 32)]));
    
    var receiver = $E('input').setStyle({border:'none',display:'block',width:'0px',height:'0px'}).insertTo(document.body);
    
    window.addEventListener('focus', function() { receiver.focus(); }, false);
    window.addEventListener('click', function() { receiver.focus(); }, false);
    
    
    receiver.on('keydown', (function(e) {
      if (e.keyCode == 16) this.element.addClass('shifted');
    }).bind(this)).on('keyup', (function(e) {
      if (e.keyCode == 16) this.element.removeClass('shifted');
    }).bind(this)).on('keypress', this.highlightKey.bindAsEventListener(this), false).focus();
  },
  
  highlightKey: function(e) {
    var key = this.keys[e.charCode] || this.keys[e.keyCode];
    if (key) {
      key.highlight({duration: 100})
    }
  },
  
// private
  row: function(num, keys) {
    return $E('div').addClass('row-'+(num+1)).insert(keys);
  },
  
  key: function(label, klass, key_code) {
    var key = $E('span', {'class': klass}).addClass('tn-key').update(
      isString(label) ? label : '<span>'+label.down+'</span><span class="up">'+label.up+'</span>'
    );
    
    this.keys = this.keys || {};
    
    (isString(label) ? [key_code] : [label.down.charCodeAt(0), label.up.charCodeAt(0)]).each(function(code) {
      if (code != 16) {
        this.keys[code] = key;
      }
    }, this);
    
    return key;
  }
})
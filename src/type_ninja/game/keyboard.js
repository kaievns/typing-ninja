/**
 * Represents the keyboard layout model
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */
TypeNinja.Game.Keyboard = new Class({
  initialize: function(layout) {
    this.rows = [];
    
    layout.each(function(row) {
      var keys = [], key = {};
      row.split('').each(function(char, i) {
        key[i % 2 ? 'up' : 'down'] = char;
        
        if (i % 2) {
          keys.push(key);
          key = {};
        }
      });
      
      this.rows.push(keys);
    }, this);
  }
})
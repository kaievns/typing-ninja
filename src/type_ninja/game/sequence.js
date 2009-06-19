/**
 * This model represent the order in which the game levels up
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */
TypeNinja.Game.Sequence = new Class({
  letters: [],
  
  initialize: function(ascii_sequence, ascii_layout, current_layout) {
    var letters_map = this.generateLettersMap(ascii_layout, current_layout);
    
    this.letters = ascii_sequence.split('').map(function(letter) {
      return letter == ' ' ? ' ' : letters_map[letter];
    });
    
    this.position = 2;
  },

// private
  generateLettersMap: function(ascii_layout, current_layout) {
    var current_letters = current_layout.join('').split(''), map = {};
    
    ascii_layout.join('').split('').each(function(char, i) {
      map[char] = current_letters[i];
    });
    
    return map;
  }
});
/**
 * The game status bar unit
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */
TypeNinja.UI.Status = new Class({
  initialize: function(sequence) {
    this.model = sequence;
    
    this.element = $E('div', {'class': 'tn-status'});
    this.element.update(this.model.letters.map(function(letter, i) {
      var letter = $E('span', {'html': letter}).on('click', function() { console.log(i); });
      if (i < sequence.position) letter.addClass('active');
      return letter;
    })).insert('<div style="clear: both"></div>');
  }
});
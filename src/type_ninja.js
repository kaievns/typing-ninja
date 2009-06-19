/**
 * Top level class of the application
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */

var TypeNinja = new Class({
  include: Options,
  
  initialize: function(element, options) {
    this.setOptions(options);
    this.element = $(element);
    
    if (!this.element) throw "Can't find the target element";
    
    this.game = new TypeNinja.Game();
    this.ui   = new TypeNinja.UI(this.element, this.game);
  }
});
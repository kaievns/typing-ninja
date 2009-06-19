/**
 * TypeNinja user interface builder/holder top class
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */
TypeNinja.UI = new Class({
  initialize: function(element, model) {
    this.element = $E('div', {'class': 'tn-layout'}).insertTo(element);
    this.model   = model;
    
    this.build();
  },
  
  build: function() {
    var UI = this.constructor;
    
    this.field    = new UI.Field();
    this.status   = new UI.Status(this.model.sequence);
    this.keyboard = new UI.Keyboard(this.model.keyboard);
    
    this.element.insert([
      this.status.element,
      this.field.element,
      this.keyboard.element
    ]);
  }
});
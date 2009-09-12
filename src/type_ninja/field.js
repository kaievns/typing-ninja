/**
 * The class of field
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
TypeNinja.Field = new Class(Observer, {
  initialize: function() {
    this.element = $E('div', {'class': 'tn-field'});
  }
});
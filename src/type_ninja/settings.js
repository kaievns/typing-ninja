/**
 * The settings bar unit
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov
 */
TypeNinja.Settings = new Class(Observer, {
  EVENTS: $w('layout_change speed_change stop_click start_click reset'),
  
  initialize: function(options) {
    this.$super(options);
    
    this.element = $E('div', {'class': 'tn-settings'});
    
    this.build().connect();
  },
  
// protected
  connect: function() {
    this.layouts.onChange(function() { this.fire('layout_change', this.layouts.value); }.bind(this));
    this.speeds.onChange(function() { this.fire('speed_change', this.speeds.value); }.bind(this));
    
    this.trigger.onClick(function() {
      this.fire(this.trigger.hasClass('tn-stop') ? 'stop_click' : 'start_click');
      this.trigger.toggleClass('tn-stop').set(
        'value', this.trigger.hasClass('tn-stop') ? 'Stop' : 'Start'
      ).blur();
    }.bind(this));
    
    this.reset.onClick(function(event) {
      event.stop();
      this.fire('reset');
    }.bind(this));
  },
  
  build: function() {
    // building the settings block
    this.layouts = $E('select').insert(this.buildOptions(Object.keys(TypeNinja.Keyboard.LAYOUTS)));
    this.speeds = $E('select').insert(this.buildOptions('123456789'.split('')));
    
    this.trigger = $E('input', {type: 'button', value: 'Start', 'class': 'tn-start'});
    
    $E('fieldset').update('<legend>Settings</legend>')
      .insertTo(this.element).insert([
        this.buildOption('Layout', this.layouts),
        this.buildOption('Speed', this.speeds),
        this.trigger
      ]);
    
    // building the statistic block
    this.hits     = $E('span');
    this.missed   = $E('span');
    this.accuracy = $E('span');
    this.reset    = $E('a', {'class': 'tn-reset', html: 'Reset', href: ''});
    
    $E('fieldset').update('<legend>Statistic</legend>')
      .insertTo(this.element).insert([
        this.buildOption('Hits', this.hits),
        this.buildOption('Missed', this.missed),
        this.buildOption('Accuracy', this.accuracy),
        this.reset
      ]);
      
    // building the most missed block
    this.mostMissed = $E('div');
    
    $E('fieldset').update('<legend>Most Missed</legend>')
      .insertTo(this.element).insert(this.mostMissed);
      
    return this;
  },
  
  buildOption: function(label, element) {
    return $E('div', {'class': 'tn-settings-option'}).insert([$E('label', {html: label}), element]);
  },
  
  buildOptions: function(list) {
    return list.map(function(name) {
      return $E('option', {value: name, html: name});
    });
  }
});
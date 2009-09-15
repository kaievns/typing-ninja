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
  
  // returns the current speed as an integer between 1 and 9
  getSpeed: function() {
    return this.speeds.value.toInt();
  },
  
  // increases the speed
  advance: function() {
    this.speeds.setValue(this.getSpeed() + 1).change();
  },
  
  // decreases the speed
  slowDown: function() {
    this.speeds.setValue(this.getSpeed() - 1).change();
  },
  
  // updates the most-missed list
  updateMostMissed: function(most_missed) {
    var chart = [];
    
    for (var key in most_missed) {
      if (most_missed[key] > 0) {
        chart.push({
          symbol: key,
          count: most_missed[key]
        })
      }
    }
    
    chart = chart.sortBy('count').reverse().slice(0, TypeNinja.Settings.MOST_MISSED_COUNT);
  },
  
  countHit: function() {
    this.hits.innerHTML = ''+(this.hits.innerHTML.toInt() + 1);
    
    return this.calcAccuracy();
  },
  
  countMiss: function() {
    this.missed.innerHTML = ''+(this.missed.innerHTML.toInt() + 1);
    return this.calcAccuracy();
  },
  
// protected

  calcAccuracy: function() {
    var hits = this.hits.innerHTML.toInt();
    var missed = this.missed.innerHTML.toInt();
    var accuracy = hits / (hits+missed) * 100;
    
    this.accuracy.innerHTML = (accuracy || 0).round() + '%';
    
    return this;
  },

  connect: function() {
    this.layouts.onChange(function() { this.fire('layout_change', this.layouts.value); }.bind(this));
    this.speeds.onChange(function() { this.fire('speed_change', this.speeds.value); }.bind(this));
    
    this.trigger.onClick(function() {
      this.trigger.toggleClass('tn-stop').set(
        'value', this.trigger.hasClass('tn-stop') ? 'Stop' : 'Start'
      ).blur();
      
      this.fire(this.trigger.hasClass('tn-stop') ? 'start_click' : 'stop_click');
    }.bind(this));
    
    this.reset.onClick(function(event) {
      event.stop();
      this.hits.innerHTML = this.missed.innerHTML = '0';
      this.calcAccuracy().fire('reset');
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
    this.hits     = $E('span', {html: '0'});
    this.missed   = $E('span', {html: '0'});
    this.accuracy = $E('span', {html: '0'});
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
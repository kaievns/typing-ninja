/**
 * The game logic top class
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */
TypeNinja.Game = new Class({
  LAYOUTS: {
    ENG: [
      '`~1!2@3#4$5%6^7&8*9(0)-_=+',
      'qQwWeErRtTyYuUiIoOpP[{]}\\|',
      'aAsSdDfFgGhHjJkKlL;:\'"',
      'zZxXcCvVbBnNmM,<.>/?'
    ],
    
    RUS: [
      '][1!2"3№4;5%6:7?8*9(0)-_=+',
      'йЙцЦуУкКеЕнНгГшШщЩзЗхХъЪ\\/',
      'фФыЫвВаАпПрРоОлЛдДжЖэЭ',
      'яЯчЧсСмМиИтТьЬбБюЮ.,'
    ]
  },
    
  SEQUENCE: "fjdksla; gtyrueiwoqpbnvmc,x.z/'FJDKSLA:GHTYRUEIWOQPBNVMC<X>Z?\"675849302-1=^&%*$(#)@_!+",
  
  initialize: function(language) {
    var lang = language || 'ENG';
    if (!this.LAYOUTS[lang]) throw 'Unknown language "'+lang+'"';
    
    this.language = lang;
    
    this.keyboard = new TypeNinja.Game.Keyboard(this.LAYOUTS[lang]);
    this.sequence = new TypeNinja.Game.Sequence(this.SEQUENCE, this.LAYOUTS.ENG, this.LAYOUTS[lang]);
  }
});
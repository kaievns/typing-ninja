/**
 * The working initialization script
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
[
  'type_ninja',
  'type_ninja/keyboard',
  'type_ninja/field',
  'type_ninja/progress',
  'type_ninja/settings'
  
].each(function(file) {
  document.writeln('<scr'+'ipt src="src/'+file+'.js"></scr'+'ipt>');
})
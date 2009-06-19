/**
 * Just an initialization script
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St. <nemshilov#gmail.com>
 */
[
  '',
  '/ui',
  '/ui/field',
  '/ui/status',
  '/ui/keyboard',
  '/game',
  '/game/keyboard',
  '/game/sequence'
].each(function(name) {
  document.write('<scr'+'ipt src="src/type_ninja'+name+'.js"></scr'+'ipt>');
});
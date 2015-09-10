$(document).ready(function() {
				var c = $('#control'),
					s = $('#control select'),
					b = $('body'),
					l = $('#border'),
					o = s.find('option'),
					to;

				s.click(function() {
					clearInterval(to);
				}).change(function(){
					var t = $(this),
						v = t.val(),
						d = t.find(':selected').data('bg');

					b.removeAttr('class').addClass(d);
					l.removeAttr('class').addClass(v);
				});

				setTimeout(function() {
					b.addClass("dark");

					setTimeout(function(){
						l.removeAttr('class').addClass("hl");
					}, 789);

					to = setInterval(function(){
						c.fadeIn(456);
						 var i = o.index(s.find(':selected'));

						 o.eq(i).prop('selected', false);

						 if(i==o.length-1) i=-1;

						 o.eq(i+1).prop('selected', true);

						 s.trigger('change');
					}, 3333);
				}, 2222);
				
			});
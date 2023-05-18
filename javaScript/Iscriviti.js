//jQuery di prova
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset: proprietà che andremo ad animare
var animating; //na cosetta che mi ha concesso di prevenire dei click involontari. Se spera funga e non sia solo culo
// prima ho lanciato una madonnina UwU

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//"attiva" il passaggio successivo nella barra dei progressi usando l'index del next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//mostra il field set successivo
	next_fs.show(); 
	//cela l'attuale campo con lo style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//mentre l'opacità di current_fs si riduce a zero, lo salvo su "now"
			//1. con questo scalo dell'80% current_fs
			scale = 1 - (1 - now) * 0.2;
			//2. sposta next_fs sulla destra (50%)
			left = (now * 50)+"%";
			//3. it moves in incrementa l'opacità di next_fs ad 1 mentre si muove
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//sto schifo mi serve a disattivare lo stato corrente della barra dei progressi
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//mostra il fieldset precedente
	previous_fs.show(); 
	//maschera lo stato corrente del fieldset usando lo style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//al ridursi dell'opacità del current_fs a zero, lo si salva su "now"
			//1. porta previous_fs dall'80% al 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. porta current_fs sulla destra del 50% - 0%
			left = ((1-now) * 50)+"%";
			//3. incrementa l'opacità di previous_fs ad 1 al muoversi (ogni tanto sfaciola)
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		
		easing: 'easeInOutBack'
	});
});


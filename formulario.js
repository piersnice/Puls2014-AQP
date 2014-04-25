var $form = $('#formulario'),
	$titulo= $('#titulo'),
	$url = $('#url'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$primerpost = $('.item').first();
	$ocultaraside = $('aside');

if (localStorage.getItem('autosave')) {
	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'));
}

var id = setInterval(function(){
	sessionStorage.setItem('titulo', $titulo.val());
	sessionStorage.setItem('url', $url.val());
	}, 1000);

function mostrarFormulario(){
	$form.slideToggle(); //ocultar y mostrar formulario (slideToggle)
	$list.slideToggle();
	$ocultaraside.slideToggle();

}

function agregarPost(e){
	e.preventDefault();
	e.stopPropagation();

	var url= $url.val(),
	titulo = $titulo.val(),	
	$clone = $primerpost.clone();
	
	$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href', url);

	$clone.hide();

	$list.prepend($clone);
	mostrarFormulario();

	$titulo.val('');
	$url.val('');

	$clone.fadeIn();//fadeIn(); animacion

}
//EVENTOS
$('nav').on('click', 
	function(){ console.log("soy un nav y me hicieron y click");})
$('nav ul').on('click',
	function(){ console.log("soy un ul y me hicieron y click");})


$button.click( mostrarFormulario );

$form.on('submit', agregarPost);

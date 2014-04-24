var $form = $('#formulario'),
	$titulo= $('#titulo'),
	$url = $('#url'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$primerpost = $('.item').first();

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
	return false;
}

function agregarPost(){
	var url= $url.val(),
	titulo = $titulo.val(),	
	$clone = $primerpost.clone();
	
	$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href', url);

	$clone.hide();

	$list.prepend($clone);
	mostrarFormulario();
	$clone.fadeIn();//fadeIn();
	$titulo.val('');
	$url.val('');

	return false;
}

//EVENTOS

$button.click( mostrarFormulario );
$form.on('submit', agregarPost );
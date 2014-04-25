$(function(){

	$('footer .logos').load('logos_footer.html #maestrosdelweb');
	/*$.get('logos_footer.html', function(codiguito){
		//console.log(codiguito);
		$('footer').append(codiguito);
	});*/

	$.get('usuario.json', function(info) {
		var avatar   = new Image();
		avatar.src 	 = info.avatar;
		avatar.title = info.nombre+' '+info.apellido;
		$('#avatar').append(avatar);
		//console.log(info);
	});

});

var base_url = "http://query.yahooapis.com/v1/public/yql?";


function obtenerGeoInformacion(lati, longi){
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+lati+' '+longi+'" AND gflags="R"';
	//query = encodeURIComponent(query);
	console.log(query);

	$.ajax({
		url: base_url+"q= "+ query,
		dataType: 'jsonp',
		jsonpCallback:'procesarGeoInfo',
		data: {
			format : 'json'
		}
	});
}

function procesarGeoInfo(datos){
	var res    = datos.query.results.Result;
	var barrio = res.neighborhood;
	var calle  = res.street;
	var ciudad = res.city;
	var pais   = res.country;
	var woeid  = res.woeid;

	console.log(datos);
	$('#geo')
	.prepend('<p><strong>'+barrio+', '+calle+'</strong><br>'+ciudad+', '+pais+'</p>');
	obtenerClima(woeid);
}

function obtenerClima(woeid){
	var query = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" and u="c"';
	query = encodeURIComponent(query);
	//console.log(query);

	$.ajax({
		url: base_url+"q= "+ query,
		dataType: 'jsonp',
		jsonpCallback:'procesarClima',
		data: {
			format : 'json'
		}
	});
}

function procesarClima(datos){

	var clima = datos.query.results.channel;
	var temp  = clima.item.condition.temp;
	var unit  = clima.units.temperature;
	var cond  = clima.item.condition.code;
	var img   = new	Image();
	img.src   = "http://l.yimg.com/a/i/us/we/52/"+cond+".gif"

	console.log(clima);

	$('#clima')
	.append(img)
	.append(temp+' '+unit+'º');
	//.append(clima.item.description);
}
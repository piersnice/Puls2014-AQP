$(function(){
	var geo = navigator.geolocation;
	var opciones = {}
	function geo_error() {
		console.log("hhmm... tis is akward. no puedo saber dodne estas");
	}

	function geo_exito(posicion){
		var lati  = posicion.coords.latitude;
		var longi = posicion.coords.longitude;
		var mapa  = new Image();
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?maptype=hybrid&zoom=13&size=300x300&sensor=false&center="+lati+","+longi;
		$('#geo').append(mapa);

		obtenerGeoInformacion(lati, longi);
	}


geo.getCurrentPosition(geo_exito, geo_error, opciones);//pregunta una vez si le permitimos saber nuestra ubicacion
	

});
$(function() {

	let typeTemp = 'celsius';
	let temperature, tempMin, tempMax;
	
	$('#fahr').click(function() {
		typeTemp = 'fahr';
		$('#temp').html(tempType(temperature));
		$('#tempMinMax').html(tempType(tempMin) + ' / ' + tempType(tempMax));
	});

	$('#cels').click(function() {
		typeTemp = 'celsius';
		$('#temp').html(tempType(temperature));
		$('#tempMinMax').html(tempType(tempMin) + ' / ' + tempType(tempMax));
	});

	$('#refresh').click(function() {
		getWeather();
	})

	function getWindDirection(degrees) {
		switch (true) {
			case ((degrees >= 0 && degrees <= 22.5) || (degrees >= 337.5 && degrees <= 360)):
				return 'N';
				break;
			case (degrees > 22.5 && degrees <= 67.5):
				return 'NE';
				break;
			case (degrees > 67.5 && degrees <= 112.5):
				return 'E';
				break;
			case (degrees > 112.5 && degrees <= 157.5):
				return 'SE';
				break;
			case (degrees > 157.5 && degrees <= 202.5):
				return 'S';
				break;
			case (degrees > 202.5 && degrees <= 247.5):
				return 'SW';
				break;
			case (degrees > 247.5 && degrees <= 292.5):
				return 'W';
				break;
			case (degrees > 292.5 && degrees <= 337.5):
				return 'NW';
				break;
		}
	}

	function tempType(temp) {
		if (typeTemp === 'celsius') {
			return (temp - 273.15).toFixed(0) + '\u2103';
		} else if (typeTemp === 'fahr') {
			return (temp * 9/5 - 459.67).toFixed(0) + '\u2109';
		}
	}

    function convertTime(unix) {
		const time = new Date(unix * 1000);
		return time;
    }

	function getWeather() {
		navigator.geolocation.getCurrentPosition(function(position) {
			$.ajax({
				method: 'GET',
				dataType: 'json',
				data: null,
				url: `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=255620d8760822a61d24a215fed04157`,
				success: function(res) {
					temperature = res.main.temp;
					tempMin = res.main.temp_min;
					tempMax = res.main.temp_max;

					$('#city').html(res.name);
					$('#time').html(convertTime(res.dt));
					$('#description').html(res.weather[0].description);
					$('#temp').html(tempType(temperature));
					$('#icon').html(`<img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png" alt="#">`);
					$('#humidity').html(res.main.humidity + '%');
					$('#windSpeed').html((res.wind.speed * 3.6) + 'km/h');
					$('#windDirect').html(getWindDirection(res.wind.deg));
					$('#clouds').html(res.clouds.all + '%');
					$('#pressure').html(res.main.pressure + ' hPa');
					$('#tempMinMax').html(tempType(tempMin) + ' / ' + tempType(tempMax));

				}
			})
		});
	}

	getWeather();
	
})

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv=”Content-Type” content=”text/html; charset=ISO-8859-1″ />
		<style type="text/css">
			@font-face { font-family: "Vision-Black"; src: url("Assets/Website/fonts/Vision-Black.ttf") format("truetype"); };
			@font-face { font-family: "Vision-Light"; src: url("Assets/Website/fonts/Vision-Light.ttf") format("truetype"); };
		</style>
		<link rel="stylesheet" href="src/css/base.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script>
			var dayval = 0;
			var monthval = 0;
			var yearval = 0;

			function rankingClick(){
				var div = document.getElementById("popups");
				var background = document.createElement("div");
				div.appendChild(background);
				background.classList.add("divbg");
				var popupBackground = document.createElement("div");
				popupBackground.classList.add("popupfin");
				background.appendChild(popupBackground);
				var closebutton = document.createElement("div");
				closebutton.classList.add("closebutton");
				closebutton.addEventListener('click', closepopUp);
				popupBackground.appendChild(closebutton);
				var closeimg = document.createElement("img");
				closeimg.classList.add("closeimg");
				closeimg.src = 'Assets/Website/close-24px.svg';
				closebutton.appendChild(closeimg);
				var name = document.createElement('a');
				name.classList.add('boton-ajugar');
				name.addEventListener('click', onCloseRanking);
				name.innerHTML = 'Volver a participar';
				popupBackground.appendChild(name);
				name = document.createElement("pre");
				name.classList.add("ranking");
				name.innerHTML =
" RANKING \n\
DE RESULTADOS";
				popupBackground.appendChild(name);
				var redBarBG = document.createElement('div');
				redBarBG.classList.add("rankingbar");
				popupBackground.appendChild(redBarBG);
				name = document.createElement("a");
				name.classList.add("nombre_tabla");
				name.innerHTML = "Nombre";
				redBarBG.appendChild(name);
				name = document.createElement("a");
				name.classList.add("fecha_tabla");
				name.innerHTML = "Fecha";
				redBarBG.appendChild(name);
				name = document.createElement("a");
				name.classList.add("tiempo_tabla");
				name.innerHTML = "Tiempo";
				redBarBG.appendChild(name);
				redBarBG = document.createElement("div");
				redBarBG.classList.add("rankingTable");
				popupBackground.appendChild(redBarBG);
				var table = document.createElement("table");
				table.classList.add("rankTable");
				redBarBG.appendChild(table);
				$.ajax({
					url: 'requests.php',
					data: {action: 'seeranking'},
					type: 'post',
					success: function(output) {
						var val = JSON.parse(output).rows;
						console.log(val);
						for(let i = 0; i < val.length; ++i)
						{
							let tablerow = document.createElement("tr");
							tablerow.classList.add("tablerow");
							table.appendChild(tablerow);
							name = document.createElement("td");
							name.classList.add("tablecol");
							name.innerHTML = (val[i].name);
							tablerow.appendChild(name);
							name = document.createElement("td");
							name.classList.add("tablecol2");
							name.innerHTML = (val[i].date);
							tablerow.appendChild(name);
							name = document.createElement("td");
							name.classList.add("tablecol3");
							name.innerHTML = (val[i].time);
							tablerow.appendChild(name);
						}
					}
				});
			}

			function instruccionesClick(){
				var div = document.getElementById("popups");
				var background = document.createElement("div");
				div.appendChild(background);
				background.classList.add("divbg");
				var popupBackground = document.createElement("div");
				popupBackground.classList.add("popupinstru");
				background.appendChild(popupBackground);
				var closebutton = document.createElement("div");
				closebutton.classList.add("closebutton");
				closebutton.addEventListener('click', closepopUp);
				popupBackground.appendChild(closebutton);
				var closeimg = document.createElement("img");
				closeimg.classList.add("closeimg");
				closeimg.src = 'Assets/Website/close-24px.svg';
				closebutton.appendChild(closeimg);
				var varbg = document.createElement("div");
				varbg.classList.add("popupinstru2");
				popupBackground.appendChild(varbg);
				var name = document.createElement('a');
				name.classList.add('boton-ajugar');
				name.addEventListener('click', onCloseInstrucciones);
				name.innerHTML = '¡A jugar!';
				popupBackground.appendChild(name);
				name = document.createElement('a');
				name.classList.add('instruccionesTitle');
				name.innerHTML = 'INSTRUCCIONES';
				popupBackground.appendChild(name);
				name = document.createElement('img');
				name.src = 'Assets/Website/instrucciones.png';
				name.classList.add('instroImg');
				varbg.appendChild(name);
			}

			function registrateClick(){
				var div = document.getElementById("popups");
				var background = document.createElement("div");
				div.appendChild(background);
				background.classList.add("divreg");
				var closebutton = document.createElement("div");
				closebutton.classList.add("closebutton");
				closebutton.addEventListener('click', closepopUp);
				background.appendChild(closebutton);
				var closeimg = document.createElement("img");
				closeimg.classList.add("closeimg");
				closeimg.src = 'Assets/Website/close-24px.svg';
				closebutton.appendChild(closeimg);
				var name = document.createElement('a');
				name.classList.add('boton-registrate');
				name.addEventListener('click', onRegistrationComplete);
				name.innerHTML = 'Registrate y juega';
				background.appendChild(name);
				name = document.createElement("pre");
				name.classList.add("ranking");
				name.innerHTML =
" COMPLETA EL REGISTRO \n\
PARA PARTICIPAR";
				background.appendChild(name);
				var div = document.createElement("div");
				div.classList.add("llenaeldiv");
				background.appendChild(div);
				name = document.createElement("pre");
				name.classList.add("llenael");
				name.innerHTML =
"Llena los campos del formulario con un codigo \n\
de producto para participar";
				div.appendChild(name);
				name = document.createElement("a");
				name.classList.add("nombreinput");
				name.innerHTML = "Nombre";
				background.appendChild(name);
				name = document.createElement("a");
				name.classList.add("apellidosinput");
				name.innerHTML = "Apellidos";
				background.appendChild(name);
				name = document.createElement("a");
				name.classList.add("telefonoinput");
				name.innerHTML = "Teléfono";
				background.appendChild(name);
				name = document.createElement("a");
				name.classList.add("correoinput");
				name.innerHTML = "Correo Electrónico";
				background.appendChild(name);
				name = document.createElement("a");
				name.classList.add("codigoinput");
				name.innerHTML = "Código de Producto";
				background.appendChild(name);
				var check = document.createElement("input");
				check.classList.add("aceptoinput");
				check.type = "checkbox";
				check.id = "checkbox";
				name = document.createElement("label");
				name.classList.add("aceptoinput");
				name.innerHTML = "Acepto Términos y Condiciones";
				name.appendChild(check);
				background.appendChild(name);
				name = document.createElement("input");
				name.classList.add("nombreinput");
				name.type = "text";
				name.id = 'regisname';
				name.innerHTML = "Nombre";
				background.appendChild(name);
				name = document.createElement("input");
				name.classList.add("apellidosinput");
				name.id = 'regislastname';
				name.type = "text";
				name.innerHTML = "Nombre";
				background.appendChild(name);
				name = document.createElement("input");
				name.classList.add("telefonoinput");
				name.id = 'regisphone';
				name.type = "tel";
				name.innerHTML = "Nombre";
				background.appendChild(name);
				name = document.createElement("input");
				name.classList.add("correoinput");
				name.id = 'regisemail';
				name.type = "email";
				name.innerHTML = "Nombre";
				background.appendChild(name);
				name = document.createElement("input");
				name.id = 'ticket';
				name.classList.add("codigoinput");
				name.type = "text";
				name.innerHTML = "Nombre";
				background.appendChild(name);

			}

			function onRegistrationComplete(){
				if(checkbox.checked != true)
					return;
				let tick = document.getElementById("ticket").value;
				let regname = document.getElementById("regisname").value;
				let reglastname = document.getElementById("regislastname").value;
				let regphone = document.getElementById("regisphone").value;
				let regemail = document.getElementById("regisemail").value;
				let regdateofbirth = dayval + '/' + monthval + '/' + yearval;
				$.ajax({
					url: 'requests.php',
					data: {
						action: 'tryregister',
						ticket: tick,
						name: regname,
						lastname: reglastname,
						phone: regphone,
						email: regemail,
						dateofbirth: regdateofbirth
					},
					type: 'post',
					success: function(output) {
						var val = output;
						console.log(val);
						if (val == 'ok'){
							window.location.replace("/game.php/?ticket=" + tick + "&name=" + regname + "&lastname=" + reglastname + "&phone=" + regphone + "&email="  + regemail);
						}
						else{
							wrongticket();
						}
					}
				});
			}

			function wrongticket(){

			}

			function onSubmitAge(){
				var div = document.getElementById("popups");
				var day = document.getElementById("day");
				var month = document.getElementById("month");
				var year = document.getElementById("year");
				dayval = day.options[day.selectedIndex].text;
				monthval = month.options[month.selectedIndex].text;
				yearval = year.options[year.selectedIndex].text;
				div.innerHTML = "";
			}

			function onCloseInstrucciones(){
				var div = document.getElementById("popups");
				div.innerHTML = "";
			}

			function onCloseRanking(){
				var div = document.getElementById("popups");
				div.innerHTML = "";
			}

			function closepopUp() {
				var div = document.getElementById("popups");
				div.innerHTML = "";
			}


			function onCloseGameEnd() {
				var div = document.getElementById("popups");
				div.innerHTML = "";
			}

			function gameEnd(id, end, points, dead) {
				var div = document.getElementById("popups");
				var background = document.createElement("div");
				div.appendChild(background);
				background.classList.add("divbg");
				var popupBackground = document.createElement("div");
				popupBackground.classList.add("popupfin");
				background.appendChild(popupBackground);
				var closebutton = document.createElement("div");
				closebutton.classList.add("closebutton");
				closebutton.addEventListener('click', closepopUp);
				popupBackground.appendChild(closebutton);
				var closeimg = document.createElement("img");
				closeimg.classList.add("closeimg");
				closeimg.src = 'Assets/Website/close-24px.svg';
				closebutton.appendChild(closeimg);
				var name = document.createElement('a');
				name.classList.add('boton-volverAParticipar');
				name.addEventListener('click', onCloseRanking);
				name.innerHTML = 'Volver a participar';
				popupBackground.appendChild(name);
				name = document.createElement('img');
				name.classList.add('coin1');
				name.src = "Assets/Website/moneda.png";
				popupBackground.appendChild(name);
				name = document.createElement('img');
				name.classList.add('coin2');
				name.src = "Assets/Website/moneda.png";
				popupBackground.appendChild(name);
				name = document.createElement('img');
				name.classList.add('coin3');
				name.src = "Assets/Website/moneda.png";
				popupBackground.appendChild(name);
				name = document.createElement('pre');
				if(dead == "true")
				{
					name = document.createElement('pre');
					name.classList.add('felicidades');
					name.innerHTML =
					"\
NO PIERDAS \n\
LA FRESCURA, \n\
REGISTRA MÁS \n\
CÓDIGOS Y <span style='color:yellow;'> SIGUE </span> \n\
<span style='color:yellow;'> PARTICIPANDO. </span>";
					popupBackground.appendChild(name);
				}
				else
				{
					name = document.createElement('pre');
					name.classList.add('felicidades');
					name.innerHTML =
"\
¡FELICIDADES \n\
LOGRASTE LLEGAR \n\
AL OXXO CON \n\
<span style='color:yellow;'>"+ points +"</span> TIC TACS \n\
EN <span style='color:yellow;'>" + end + "</span> SEGUNDOS!";
					popupBackground.appendChild(name);
					name = document.createElement('pre');
					name.classList.add('podrasconocer');
					name.innerHTML =
					"Podrás conocer si resultas ganador \n\
					el dia NN en la seccion de Ranking.";
					popupBackground.appendChild(name);
				}
			}

			function agePicker() {
				var div = document.getElementById("popups");
				var background = document.createElement("div");
				div.appendChild(background);
				background.classList.add("divbg");
				var popupBackground = document.createElement("div");
				popupBackground.classList.add("popupage");
				background.appendChild(popupBackground);
				var day = document.createElement("select");
				var month = document.createElement("select");
				var year = document.createElement("select");
				day.id = "day";
				month.id = "month";
				year.id = "year";
				day.multiple = false;
				month.multiple = false;
				year.multiple = false;
				day.classList.add("datePick");
				month.classList.add("monthPick");
				year.classList.add("yearPick");
				popupBackground.appendChild(day);
				popupBackground.appendChild(month);
				popupBackground.appendChild(year);
				let days = moment("01-2020", "MM-YYYY").daysInMonth();
				for(let d = 0; d < days; d++)
				{
					let option = document.createElement('option');
					option.value = d + 1;
					option.innerHTML = d + 1;
					day.appendChild(option);
				}

				for(let m = 0; m < 12; m++)
				{
					let option = document.createElement('option');
					option.value = m + 1;
					option.innerHTML = m + 1;
					month.appendChild(option);
				}

				for(let y = 1970; y < 2020; y++)
				{
					let option = document.createElement('option');
					option.value = y;
					option.innerHTML = y;
					year.appendChild(option);
				}

				let name = document.createElement('a');
				name.classList.add('dayText');
				name.innerHTML = 'Día';
				popupBackground.appendChild(name);
				name = document.createElement('a');
				name.classList.add('monthText');
				name.innerHTML = 'Mes';
				popupBackground.appendChild(name);
				name = document.createElement('a');
				name.classList.add('yearText');
				name.innerHTML = 'Año';
				popupBackground.appendChild(name);

				name = document.createElement('a');
				name.classList.add('ingresa');
				name.innerHTML = 'Ingresa tu fecha de nacimiento';
				popupBackground.appendChild(name);

				name = document.createElement('a');
				name.classList.add('boton-continuar');
				name.addEventListener('click', onSubmitAge);
				name.innerHTML = 'Continuar';
				popupBackground.appendChild(name);
				month.addEventListener('change', function(event) {
					let monthval = month.value.toString();
					if(monthval.length == 1)
						monthval = "0" + monthval;
					let dateString = monthval + "-" + year.value;
					let dayLength = moment(dateString, "MM-YYYY").daysInMonth();
					console.log(dateString);
					day.innerHTML = "";
					for(let d = 0; d < dayLength; d++)
					{
						let option = document.createElement('option');
						option.value = d + 1;
						option.innerHTML = d + 1;
						day.appendChild(option);
					}
				});

				var buttonContinue = document.createElement("a");
			}

			function onLoad(){
				const queryString = window.location.search;
				const urlParams = new URLSearchParams(queryString);
				if(urlParams.has('playerID'))
					gameEnd(urlParams.get('playerID'), urlParams.get('time'), urlParams.get('points'), urlParams.get('d'));
				else
					agePicker();
			}

			function onResize(){

			}
		</script>
	</head>
	<body onload="onLoad()" onresize="onresize">
		<div class="mainContainer">
			<div class="footer">
				<img class="footerImg" id="background" src="Assets/Website/home-img-footer-mobile.png">
			</div>
			<div class="head">
				<ul class="headbar">
					<li>
						<img class="logo" src="Assets/Website/logo/tictac-logo.png">
					</li>
					<li class='headButtons'>
						<div class="button-ranking">
							<a class="button-black" onclick="rankingClick()"> RANKING </a>
						</div>
						<div class="button-instrucciones">
							<a class="button-black" onclick="instruccionesClick()"> INSTRUCCIONES </a>
						</div>
					</li>
				</ul>
			</div>
			<div class="content">
				<div class="diviertete">
					<a class="diviertete"> DIVIÉRTETE JUGANDO </a>
				</div>
				<div class="inlineTexts">
					<a class="con">CON </a>
					<a class="tictac">TIC TAC</a>
				</div>
				<div class="bottomTexts">
					<pre class="participa">








Y participa para ganar refrescantes premios diarios
de $1,000 en créditos de Oxxo, durante 33 días.
					</pre>
					<a class="boton-registrate-y-juega" onclick="registrateClick()">
						Registrate y juega
					</a>
				</div>
			</div>
			<div id="popups">
			</div>
		</div>
	</body>
</html>

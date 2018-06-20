/******************** REGISTER ***************************/
var registerFromView;
function loadPageRegister(){

	$(".page").addClass("cached");
	
	
	if($(".register").length>0){			
		$(".register").removeClass("cached");
		initializePageRegister();
	}else{	
		mainView.router.reloadPage(appConfig.lang+"/register.html");

	}
}

function initializePageRegister(){

    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
    dataselectR();
	addActionsRegister();
	
}

function addActionsRegister(){

	$("#registerBtn")[0].onclick = function enterKey(e) {

		if($('#legal').is(":checked")){
            registerAjax();
		}else{
			myApp.alert('debes aceptar los términos y condiciones para registrarte', "Plenus");
		}

	};

    $('#goBackRegister').on('click', function() {
       loadPageLogin();
    });

    $$('select').on('change', function () {
        setTimeout(function(){ 
            $('.icon-back').click();
        }, 100);

    });

    $('#inputLocalidad').on('change', function() {
    	var a = $('#inputLocalidad').val();
    	var res = a.split("|");	
       $('#inputCP').val(res[1]);
    });

}


function registerAjax(){
	try{
		
		var datosRegister;
		var dataName = $("#inputName").val();
		var dataSurname = $("#inputSurname").val();
		var dataEmail = $("#inputEmail").val();
		var dataPhone = $("#inputPhone").val();
		var dataDNI = $("#inputDNI").val();
		var dataCUIL = $("#inputCUIL").val();
		var dataProvincia = $('.provincia .item-after').text();
		var temp1 = $('#inputLocalidad').val();
		var temp2 = temp1.split("|");
		var dataLocalidad = temp2[0];
		var dataAddress = $("#inputAddress").val();
		var dataCP = $('#inputCP').val();
		var dataCountry = $("#inputCountry").val();
		var dataPass1 = $("#inputPassword1").val();	
		var dataPass2 = $("#inputPassword2").val();
		
		if((dataName===null||dataName==="")||
			(dataSurname===null||dataSurname==="")||
			(dataEmail===null||dataEmail==="")||
			(dataPhone===null||dataPhone==="")||
			(dataDNI===null||dataDNI==="")||
			(dataCUIL===null||dataCUIL==="")||
			(dataAddress===null||dataAddress==="")||
			(dataCountry===null||dataCountry==="")){
			myApp.alert('Error en los campos ingresados', "Plenus");		
			console.log('Error en los campos ingresados');
		}else if(!validateEmail(dataEmail)) {
                myApp.alert('Por favor ingrese un email válido', "Plenus");
            }
        else if(!(dataPass1===dataPass2)) {
                myApp.alert('Las contraseñas no coinciden', "Plenus");
            }
            if(validateEmail(dataEmail) && dataPass1===dataPass2){
					datosRegister='name='+dataName+'&surname='+dataSurname+'&email='+dataEmail+'&phone='+dataPhone+'&dni='+dataDNI+'&cuil='+dataCUIL+'&address='+dataAddress+'&country='+dataCountry+'&postalCode='+dataCP+'&password='+dataPass1+'&state='+dataProvincia+'&city='+dataLocalidad;
					console.log(datosRegister);
				}
				
				$('#loading').css('z-index', 9999);
				$('#loading').css('display', 'block');
				
				$.ajax({
						type: "GET", 
						url: appServices.TySRegister, 
						data:datosRegister,
						contentType: "application/json",
						sync: false, 
						dataType: "JSON", 
						success: function(data){
							
							try{
								
								$('#loading').css('display', 'none');
								
								var b = JSON.parse(data); 
								
								
								if (b.status === "ok"){
									console.log(dataEmail);
									$.ajax({
										type: "GET", 
										url: appServices.TySConfirmarMail, 
										data:'mail='+dataEmail,
										contentType: "application/json",
										sync: false, 
										dataType: "JSON", 
										success: function(data){	
											console.log(data);
											var c = JSON.parse(data); 
											if (c.status === "ok"){
											}
										}
									});		
									
									myApp.alert('Registro exitoso!', "Plenus");
									loadPageLogin();
									inputName.value="";
									inputSurname.value="";
									inputEmail.value="";
									inputPhone.value="";
									inputProvincia.value="";
									inputLocalidad.value="";
									$('.provincia .item-after').text('Seleccionar');
									$('.localidad .item-after').text('Seleccionar');
									inputAddress.value ="";
									dataPass1.value="";
									dataPass2.value="";
									inputMayorista.checked = false;
									inputCUIL.value="";
									inputDNI.value="";
								}else{
									console.log("Datos erroneos");
									
									myApp.alert(b.stacktrace, "Plenus");
									
								}
								
							}catch(err){
								$('#loading').css('display', 'none');
								//myApp.alert('Error al procesar el registro. Si el problema persisite contactese a registro@touchandshop.net', "Plenus");
							}
						},
						error: function(data){
							$('#loading').css('display', 'none');
							//myApp.alert('Error al procesar el registro. Si el problema persisite contactese a registro@touchandshop.net', "Plenus");
						}
						
				});

	}catch(err){
		$('#loading').css('display', 'none');
		myApp.alert('Error al procesar el registro. Si el problema persisite contactese a contacto@plenus.com', "Plenus");
	}
	
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function dataselectR(){
    //localidad = JSON.parse(localStorage.listLocalidad);
    if(flagOnceSelect==false){
        $('.changeAddressR').empty();    
        $('.changeAddressR').append('<div style="margin:0px; width: 100%;"><div class="card-header" style="padding:0px;">Provincia<a style="width: 100%;" class="item-link smart-select smart-select-init provincia" data-searchbar="true" data-searchbar-placeholder="Buscar Provincia"><select name="provinceName" id="inputProvincia" onchange="loadLocationR();"><option value="">Seleccionar</option></select><div class="item-content"><div class="item-inner" style="width: 100%;"><div class="item-title"></div><div class="item-after">Seleccionar</div></div></div></a></div></div>');
        for(var i=0;i<provincias.length;i++){
                $('#inputProvincia').append('<option value="'+provincias[i].id+'">'+provincias[i].nombre+'</option>');    
        }
        $('.changeAddressR').append('<div style="margin:0px; width: 100%;"><div class="card-header" style="padding:0px;">Localidad<a style="width: 100%;" class="item-link smart-select smart-select-init localidad" data-searchbar="true" data-searchbar-placeholder="Buscar Localidad"><select name="locationName" id="inputLocalidad"><option value="">Seleccionar</option></select><div class="item-content"><div class="item-inner" style="width: 100%;"><div class="item-title"></div><div class="item-after">Seleccionar</div></div></div></a></div></div>');
        flagOnceSelect=true;
    }
}

function loadLocationR(){
    var idProvincia = parseInt($('#inputProvincia').val());
    $('#inputLocalidad').empty();
    $('#inputLocalidad').append('<option value="" class="defaultLocation">Seleccionar</option>');
    //$('.localidad .item-after').empty();
    //$('.localidad .item-after').append('<div class="preloader preloader-red"></div>');
    for(var i=0;i<localidad.length;i++){
        if(localidad[i].provincia_id==idProvincia && localidad[i].nombre!=""){
          $('#inputLocalidad').append('<option value="'+localidad[i].nombre+'|'+localidad[i].codigopostal+'">'+localidad[i].nombre+' ('+localidad[i].codigopostal+')</option>');  
        }        
    }    
}



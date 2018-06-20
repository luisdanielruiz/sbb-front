/******************** RECOVERY ***************************/
var recoveryFromView;
function loadPageRecovery(){

	$(".page").addClass("cached");
	
	
	if($(".recovery").length>0){			
		$(".recovery").removeClass("cached");
		initializePageRecovery();
	}else{	
		mainView.router.reloadPage(appConfig.lang+"/recovery.html");

	}
}

function initializePageRecovery(){

    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
	addActionsRecovery();
	
}

function addActionsRecovery(){

	$("#recoveryBtn")[0].onclick = function enterKey(e) {
		recuperarPassword();
		
	};

	$('#goBackRecovery').on('click', function() {
       loadPageLogin();
    });
}
function recuperarPassword(){
    
	var email = $("#mailRecovery").val();
	
	if(email!=null&&email!=""){
		var datos='mail='+email;
		console.log(datos);
		$.ajax({
				type: "GET", 
				url: appServices.TySRecovery, 
				data:datos,
				contentType: "application/json",
				sync: false, 
				dataType: "JSON", 
				success: function(data){
					
						console.log(data);
						var b = JSON.parse(data); 
						console.log( b.status); 
						
						if (b.status === "ok"){
							myApp.alert('Ya enviamos su contraseña, revise su mail.', "Plenus");
							loadPageLogin();
						}else{
							console.log("Datos erroneos");
							
							myApp.alert(b.stacktrace, "Plenus");
						}
					
				},error: function (data) {
                $('#loading').remove();
                myApp.alert("Problemas en la conexión a internet","Plenus");
            }
		});
	}else{
		myApp.alert('Ingrese su mail', "Plenus");
	}
}
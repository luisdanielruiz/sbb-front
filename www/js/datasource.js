var tySVersion = "tySVersion";

function actualizarListaLocales(){
    $.ajax({
        url: appServices.TySVersionLocal,
		success:function (data){
            if (localStorage.getItem(tySVersion) == null || localStorage.getItem(tySVersion) != data) {//miro version
                tempVersion = data;
                $.ajax({
                    url: appServices.TySListarRubrosLocal,
                    success: function (data3) {

                        //localStorage.setItem(listRubrosLocal, data3);
                        //loadListarRubros();
                    	}, error: function (jqXHR, textStatus, errorThrown) {
                        //loadListarRubros();
                   		 }
                		});
			   }
            }

    });
}

function loadListarProduct(){
    var dataProduct =null;
    dataProduct = JSON.parse(localStorage.listProductLocal);
    //carga de imagenes en array
                    for (var i = 0; i < dataProduct.length; i++) {
                    dataProduct[i].posProduct = i;
                    if (dataProduct[i].imageProduct == null || dataProduct[i].imageProduct == "") {
                        dataProduct[i].imageProduct = "img/noImageDirectory.png";
                        dataProduct[i].arrayImageProduct= ["img/noImage2.png"];
                    } else {

                        dataProduct[i].arrayImageProduct = dataProduct[i].imageProduct.split("|");

                        for (var j =0; j< dataProduct[i].arrayImageProduct.length;j++){
                            dataProduct[i].arrayImageProduct[j] = appServices.TySImg+dataProduct[i].arrayImageProduct[j];
                        }
                        if (dataProduct[i].arrayImageProduct[dataProduct[i].arrayImageProduct.length-1] == appServices.TySImg){
                            dataProduct[i].arrayImageProduct.pop();
                        }

                        dataProduct[i].imageProduct=dataProduct[i].arrayImageProduct[0];
                        //dataProduct[i].arrayImageProduct.pop();
                        //armar variable img directory

                        // armar array imagenes para tomar con for de template
                        
                    }
                    
                }

    $('#loading').remove();
    
}

function loadAll(){
$('#loading').css('z-index', 9999);
$('#loading').css('display', 'block');
    $('#loading').css('display', 'none');
}
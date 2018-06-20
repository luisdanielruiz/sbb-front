var compiledAutocompleateTemplate;
function runTemplates(){
     
    $.get('T/directoryTemplate.html', function(data){
            compiledListPlacesTemplate = Template7.compile(data);
        });

    $.get('T/busquedaTemplate.html', function(data){
        compiledBusquedaTemplate = Template7.compile(data);
    });
        
    $.get('T/favoritesTemplate.html', function(data){
            compiledListFavoritesTemplate = Template7.compile(data);
        });
    
    $.get('T/myAccountTemplate.html', function(data){
            compiledMyAccountTemplate = Template7.compile(data);
        });

    $.get('T/payHistoryTemplate.html', function(data){
            compiledPayHistoryTemplate = Template7.compile(data);
        });

    $.get('T/payDetailTemplate.html', function(data){
            compiledPayDetailTemplate = Template7.compile(data);
        });
     	    
	$.get('T/autoCompleateTempleate.html', function(data){
            compiledAutocompleateTemplate = data;
        });

    $.get('T/productTemplate.html', function(data){
            compiledListProductTemplate = Template7.compile(data);
        });

    $.get('T/catalogTemplate.html', function(data){
            compiledListCatalogTemplate = Template7.compile(data);
        });
}
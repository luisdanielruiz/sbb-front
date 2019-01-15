function runTemplates(){
    $.get('T/myAccountTemplate.html', function(data){
            compiledMyAccountTemplate = Template7.compile(data);
        });

    $.get('T/velocidadTemplate.html', function(data){
        compiledListVelocidadTemplate = Template7.compile(data);
    });

    $.get('T/fuerzaTemplate.html', function(data){
        compiledListFuerzaTemplate = Template7.compile(data);
    });
}
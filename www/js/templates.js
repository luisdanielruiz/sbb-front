function runTemplates(){
    $.get('T/myAccountTemplate.html', function(data){
            compiledMyAccountTemplate = Template7.compile(data);
        });
}
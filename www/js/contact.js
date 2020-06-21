/******************** CONTACT ***************************/
function loadPageContact() {
  $(".navbar").attr("style", "");
  $(".page").addClass("cached");
  
  refreshFooterContact();

  if ($(".contact").length > 0) {
    $(".contact").removeClass("cached");
    initializePageContact();
  } else {
    mainView.router.reloadPage(appConfig.lang + "/contact.html");
  }
}

function initializePageContact() {
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }
  addActionsContact();
}

function addActionsContact() {
  $("#toolBarBottom").css("display", "block");
  //$("#toolBarBottom").removeClass("hideFooter");

  $("#sendMail")[0].onclick = function enterKey(e) {
    sendMail();
  };
  if (titleMessaje != null) {
    $("#asuntoInput").val(titleMessaje);
  }
  if (messaje != null) {
    $("#mensajeInput").val(messaje);
  }
}

function sendMail() {
  var email = 'contacto@sbb-app.site';
  var subject = $("#asuntoInput").val();
  var emailBody = $("#mensajeInput").val();

  if (emailBody !== "" && emailBody !== null) {
    window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +   emailBody;
  } else {
    myApp.alert("Debe ingresar un mensaje", "SBB");
    mensajeInput.value = "";
    asuntoInput.value = "";
  }
}
function refreshFooterContact() {
  $(".icon-home").removeClass("selectedIcon");
  $(".icon-list").removeClass("selectedIcon");
  $(".icon-heart").removeClass("selectedIcon");
  $(".icon-user").removeClass("selectedIcon");
  $(".icon-basket").removeClass("selectedIcon");
}

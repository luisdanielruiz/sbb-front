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
  var asunto = $("#asuntoInput").val();
  var mensaje = $("#mensajeInput").val();
  var datos =
    "idUser=" +
    Juser.result.idUser +
    "&mail=" +
    Juser.result.email +
    "&asunto=" +
    asunto +
    "&mensaje=" +
    mensaje;
  if (mensaje !== "" && mensaje !== null) {
    var state = 0;
    console.log(datos);
    $.ajax({
      type: "GET",
      url: appServices.SBBContacto,
      data: datos,
      contentType: "application/json",
      sync: false,
      dataType: "JSON",
      success: function(data) {
        var b = JSON.parse(data);
        console.log(b.status);

        if (b.status === "ok") {
          state = 1;
          myApp.alert("Su mensaje fué enviado exitosamente!", "SBB");
          mensajeInput.value = "";
          asuntoInput.value = "";
        }
      },
      error: function(data) {
        $("#loading").remove();
        myApp.alert("Problemas en la conexión a internet", "SBB");
      }
    });
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

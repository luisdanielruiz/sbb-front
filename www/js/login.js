/******************** Login ***************************/
function loadPageLogin() {
  $("#toolBarBottom").css("display", "none");
  $("#navBarIos").addClass("hideFooter");
  $(".page").addClass("cached");

  if ($(".login").length > 0) {
    $(".login").removeClass("cached");
    initializePageLogin();
  } else {
    mainView.router.reloadPage(appConfig.lang + "/login.html");
  }
}

function initializePageLogin() {
  addActionsLogin();
}

function addActionsLogin() {
  $("#loginManualBtn")[0].onclick = function enterKey(e) {
    loginAjax();
  };

  $("#goRegister")[0].onclick = function enterKey(e) {
    loadPageRegister();
  };

  /*button top*/
  $("#recovery")[0].onclick = function enterKey(e) {
    loadPageRecovery();
  };

  // $("#omitir")[0].onclick = function enterKey(e) {
  //   omitirRegistro();
  // };
}

var Juser;

function loginAjax() {
  var dataMail = $("#loginManual_input_email").val();
  var pass = $("#loginManual_input_pass").val();
  var dataPass = CryptoJS.MD5(pass).toString();

  $("#loading").css("z-index", 9999);
  $("#loading").css("display", "block");

  $.ajax({
    type: "GET",
    url: appServices.SBBLogin,
    data: "email=" + dataMail + "&password=" + dataPass,
    contentType: "application/json",
    sync: false,
    dataType: "JSON",
    success: function(data) {
      $("#loading").css("display", "none");

      if (
        dataMail !== "" &&
        dataMail !== null &&
        dataPass !== "" &&
        dataPass !== null
      ) {
        var b = JSON.parse(data);
        console.log(b.status);

        if (b.status === "ok") {
          localStorage.setItem("localUser", JSON.stringify(b));
          Juser = JSON.parse(localStorage.localUser);
          $(".name-user").html("¡Hola " + b.result.name + "!");
          loadAll();
          loadPageHome();
          $("#menu-logIn").css("display", "none");
          $("#menu-logOut").css("display", "block");
          $("#menu-payHistory").css("display", "block");
        } else {
          console.log("Datos erroneos");

          myApp.alert("Ingrese su usuario y contraseña nuevamente", "SBB");
        }
      } else {
        myApp.alert("Ingrese mail y contraseña", "SBB");
      }
    },
    error: function(data) {
      $("#loading").remove();
      myApp.alert("Problemas en la conexión a internet", "SBB");
    }
  });
}

function omitirRegistro() {
  loadPageHome();
  localStorage.setItem("localUser", "");
}

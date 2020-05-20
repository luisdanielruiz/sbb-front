/******************** REGISTER ***************************/
var registerFromView;
function loadPageRegister() {
  $(".page").addClass("cached");

  if ($(".register").length > 0) {
    $(".register").removeClass("cached");
    initializePageRegister();
  } else {
    mainView.router.reloadPage(appConfig.lang + "/register.html");
  }
}

function initializePageRegister() {
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }
  addActionsRegister();
}

function addActionsRegister() {
  $("#registerBtn")[0].onclick = function enterKey(e) {
    if ($("#legal").is(":checked")) {
      registerAjax();
    } else {
      myApp.alert(
        "debes aceptar los términos y condiciones para registrarte",
        "SBB"
      );
    }
  };

  $("#goBackRegister").on("click", function() {
    loadPageLogin();
  });
}

function registerAjax() {
  var datosRegister;
  var dataName = $("#inputName").val();
  var dataSurname = $("#inputSurname").val();
  var dataEmail = $("#inputEmail").val();
  var dataphone = "123456";
  var pass1 = $("#inputPassword1").val();
  var pass2 = $("#inputPassword2").val();
  var dataPass1 = CryptoJS.MD5(pass1).toString();
  var dataPass2 = CryptoJS.MD5(pass2).toString();
  try {
    if (
      dataName === null ||
      dataName === "" ||
      (dataSurname === null || dataSurname === "") ||
      (dataEmail === null || dataEmail === "")
    ) {
      myApp.alert("Error en los campos ingresados", "SBB");
      console.log("Error en los campos ingresados");
    } else if (!validateEmail(dataEmail)) {
      myApp.alert("Por favor ingrese un email válido", "SBB");
    } else if (!(dataPass1 === dataPass2)) {
      myApp.alert("Las contraseñas no coinciden", "SBB");
    }
    if (validateEmail(dataEmail) && dataPass1 === dataPass2) {
      datosRegister =
        "name=" +
        dataName +
        "&surname=" +
        dataSurname +
        "&email=" +
        dataEmail +
        "&password=" +
        dataPass1 +
        "&phone=" +
        dataphone;
      console.log(datosRegister);
    }

    $("#loading").css("z-index", 9999);
    $("#loading").css("display", "block");

    $.ajax({
      type: "GET",
      url: appServices.SBBRegister,
      data: datosRegister,
      contentType: "application/json",
      sync: false,
      dataType: "JSON",
      success: function(data) {
        try {
          $("#loading").css("display", "none");

          var b = JSON.parse(data);

          if (b.status === "ok") {
            console.log(dataEmail);
            $.ajax({
              type: "GET",
              url: appServices.SBBConfirmarMail,
              data: "mail=" + dataEmail,
              contentType: "application/json",
              sync: false,
              dataType: "JSON",
              success: function(data) {
                console.log(data);
                var c = JSON.parse(data);
                if (c.status === "ok") {
                }
              }
            });

            myApp.alert("Registro exitoso!", "SBB");
            loadPageLogin();
            inputName.value = "";
            inputSurname.value = "";
            inputEmail.value = "";
            inputPhone.value = "";
            inputProvincia.value = "";
            inputLocalidad.value = "";
            $(".provincia .item-after").text("Seleccionar");
            $(".localidad .item-after").text("Seleccionar");
            inputAddress.value = "";
            dataPass1.value = "";
            dataPass2.value = "";
            inputMayorista.checked = false;
            inputCUIL.value = "";
            inputDNI.value = "";
          } else {
            console.log("Datos erroneos");

            myApp.alert(b.stacktrace, "SBB");
          }
        } catch (err) {
          $("#loading").css("display", "none");
        }
      },
      error: function(data) {
        $("#loading").css("display", "none");
      }
    });
  } catch (err) {
    $("#loading").css("display", "none");
    myApp.alert(
      "Error al procesar el registro. Si el problema persisite contactese a info@smartboxingbag.info",
      "SBB"
    );
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

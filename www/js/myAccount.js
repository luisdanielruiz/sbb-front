/******************** MY ACCOUNT ***************************/
var onceMyAccount = false;
var cambioPass = false;

function loadPageMyAccount() {
  $("#toolBarBottom").css("display", "block");
  // $("#toolBarBottom").removeClass("hideFooter");

  $(".page").addClass("cached");
  refreshFooterMyAccount();

  if ($(".myAccount").length > 0) {
    $(".myAccount").removeClass("cached");
    initializePageMyAccount();
  } else {
    mainView.router.reloadPage("ES/myAccount.html");
  }
}

function initializePageMyAccount() {
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }

  appendMyAccount();
}

function addActionsMyAccount() {
  $("#inputPassMyAccount")[0].onclick = function enterKey(e) {
    if (document.getElementById("oldPassMyAccount").style.display === "none") {
      document.getElementById("oldPassMyAccount").style.display = "block";
      document.getElementById("newPassMyAccount1").style.display = "block";
      document.getElementById("newPassMyAccount2").style.display = "block";
      $("#modificarBtn").css("display", "block");
      cambioPass = true;
    } else {
      document.getElementById("oldPassMyAccount").style.display = "none";
      document.getElementById("newPassMyAccount1").style.display = "none";
      document.getElementById("newPassMyAccount2").style.display = "none";
      $("#modificarBtn").css("display", "none");
      cambioPass = false;
      updateChanges();
    }
  };

  $("#backAccount")[0].onclick = function enterKey(e) {
    masterBack();
  };

  var a = $("#catalogPlace2").val();
  var b = $("#catalogPlace2").attr("status");

  $("#modificarBtn")[0].onclick = function enterKey(e) {
    modificar();
  };

  if (b == 0 || b == null) {
    document.getElementById("btnPremiun").style.display = "none";
  } else {
    document.getElementById("btnPremiun").style.display = "block";
  }

  $("#inputNameMyAccount").change(function() {
    updateChanges();
  });
  $("#inputSurNameMyAccount").change(function() {
    updateChanges();
  });
  $("#inputEmailMyAccount").change(function() {
    updateChanges();
  });
  $("#inputPhoneMyAccount").change(function() {
    updateChanges();
  });
  $("#inputOldPassMyAccount").change(function() {
    updateChanges();
  });
  $("#inputNewPassMyAccount1").change(function() {
    updateChanges();
  });
  $("#inputNewPassMyAccount2").change(function() {
    updateChanges();
  });
}

function updateChanges() {
  if (
    $("#inputNameMyAccount").val() == Juser.result.name &&
    $("#inputSurNameMyAccount").val() == Juser.result.surname &&
    $("#inputEmailMyAccount").val() == Juser.result.email &&
    $("#inputPhoneMyAccount").val() == Juser.result.phone
  ) {
    $("#modificarBtn").css("display", "none");
  } else {
    $("#modificarBtn").css("display", "block");
  }
}

//var lUserId = JSON.stringify(Juser.result.idUser);

function modificar() {
  var dataUser = $("#inputUserNameMyAccount").val();
  var dataName = $("#inputNameMyAccount").val();
  var dataSurname = $("#inputSurNameMyAccount").val();
  var dataEmail = $("#inputEmailMyAccount").val();
  var dataPass = $("#inputOldPassMyAccount").val();
  var pass1 = $("#inputNewPassMyAccount1").val();
  var pass2 = $("#inputNewPassMyAccount2").val();
  var dataPass1 = CryptoJS.MD5(pass1).toString();
  var dataPass2 = CryptoJS.MD5(pass2).toString();
  var passValitation = true;

  if (dataUser === null) {
    dataUser = JSON.stringify(a.result.userName);
  }
  if (dataName === null) {
    dataName = JSON.stringify(a.result.name);
  }
  if (dataSurname === null) {
    dataSurname = JSON.stringify(a.result.surname);
  }
  if (dataEmail === null) {
    dataEmail = JSON.stringify(a.result.email);
  }

  var datos =
    "idUser=" +
    Juser.result.idUser +
    "&userName=" +
    dataName +
    "&name=" +
    dataName +
    "&surname=" +
    dataSurname +
    "&email=" +
    dataEmail +
    "&phone=1234567&city=city&dni=12345678&address=address&country=country";

  if (
    cambioPass === true &&
    dataPass === Juser.result.password &&
    dataPass1 === dataPass2
  ) {
    datos =
      "idUser=" +
      Juser.result.idUser +
      "&userName=" +
      dataUser +
      "&name=" +
      dataName +
      "&surname=" +
      dataSurname +
      "&email=" +
      dataEmail +
      "&phone=1234567&city=city&dni=12345678&address=address&country=country" +
      "&password=" +
      dataPass +
      "&newPassword1=" +
      dataPass1 +
      "&newPassword2=" +
      dataPass2;
  }
  if (
    (cambioPass === true && dataPass != Juser.result.password) ||
    dataPass1 != dataPass2
  ) {
    myApp.alert("Error en el cambio de contraseña");
    initializePageMyAccount();
    passValitation = false;
  }

  console.log(datos);
  $.ajax({
    type: "GET",
    url: appServices.SBBMyAccount,
    data: datos, //+'&password='+dataPass1,
    contentType: "application/json",
    sync: false,
    dataType: "JSON",
    success: function(data) {
      console.log(data);
      var b = JSON.parse(data);

      if (b.status === "ok" && cambioPass === false) {
        myApp.alert("Modificación exitosa!", "SBB");
        loadPageHome();
      } else if (
        b.status === "ok" &&
        cambioPass === true &&
        passValitation === true
      ) {
        Juser.result.password = b.result.password;
        localStorage.setItem("localUser", JSON.stringify(Juser));

        myApp.alert("Modificación exitosa!", "SBB");
        //localStorage.clear;
        //location.reload;
        //loadPageLogin();
      }
    },
    error: function(data) {
      $("#loading").remove();
      myApp.alert("Problemas en la conexión a internet", "SBB");
    }
  });
  inputOldPassMyAccount.value = "";
  inputNewPassMyAccount1.value = "";
  inputNewPassMyAccount2.value = "";
}

function appendMyAccount() {
  if(localStorage.localUser!=""){
    if (!onceMyAccount) {
      var profileHTML = compiledMyAccountTemplate(Juser.result);

      $(".myAccountContent").append($(profileHTML));
      $("#modificarBtn").css("display", "none");
      addActionsMyAccount();
      onceMyAccount = true;
    }
  }else{ 
    myApp.alert("Debes iniciar sesion.", "SBB");
    masterBack();
  }
}
function refreshFooterMyAccount() {
  $(".icon-home").removeClass("selectedIcon");
  $(".icon-list").removeClass("selectedIcon");
  $(".icon-heart").removeClass("selectedIcon");
  $(".icon-user").addClass("selectedIcon");
  $(".icon-tag").removeClass("selectedIcon");
  $(".icon-basket").removeClass("selectedIcon");
}

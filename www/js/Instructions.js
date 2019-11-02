/******************** INSTRUCTIONS ***************************/
function loadPageInstructions(){
    $(".page").addClass("cached");
    
    refreshFooterInstructions();
  
    if ($(".instructions").length > 0) {
      $(".instructions").removeClass("cached");
      initializePageInstructions();
    } else {
      mainView.router.reloadPage(appConfig.lang + "/instructions.html");
    }
  }
  
  function initializePageInstructions() {
    if (
      userHistory[userHistory.length - 1] !=
      $(".page:not(.cached)").attr("data-page")
    ) {
      userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
    //addActionsContact();
  }
  
//   function addActionsContact() {
//     $("#toolBarBottom").removeClass("hideFooter");
  
//     $("#sendMail")[0].onclick = function enterKey(e) {
//       sendMail();
//     };
//     if (titleMessaje != null) {
//       $("#asuntoInput").val(titleMessaje);
//     }
//     if (messaje != null) {
//       $("#mensajeInput").val(messaje);
//     }
//   }
  

  function refreshFooterInstructions() {
    $(".icon-home").removeClass("selectedIcon");
    $(".icon-list").removeClass("selectedIcon");
    $(".icon-heart").removeClass("selectedIcon");
    $(".icon-user").removeClass("selectedIcon");
    $(".icon-basket").removeClass("selectedIcon");
  }
  

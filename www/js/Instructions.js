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
  }  

  function refreshFooterInstructions() {
    $(".icon-home").removeClass("selectedIcon");
    $(".icon-list").removeClass("selectedIcon");
    $(".icon-heart").removeClass("selectedIcon");
    $(".icon-user").removeClass("selectedIcon");
    $(".icon-basket").removeClass("selectedIcon");
  }
  

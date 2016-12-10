(function(){
  angular.module("WebAppMaker")
  .controller("AfterLoginController", AfterLoginController);

  function AfterLoginController($routeParams, UserService) {
    var vm = this;
    vm.userId = $routeParams.uid;

    function init() {
      UserService.findUserById(vm.userId)
      .success(function(user){
        if(user != '0') {
          vm.user = user;
        }
      })
      .error(function(){
        console.log("findUserById-error");
      });
    }
    init();
  }
})();
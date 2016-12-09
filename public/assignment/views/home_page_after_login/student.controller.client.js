(function(){
  angular.module("WebAppMaker")
  .controller("StudentController", StudentController);

  function StudentController($routeParams, UserService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.updateUser = updateUser;
    vm.unregisterUser = unregisterUser;

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
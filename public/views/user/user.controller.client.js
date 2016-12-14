(function(){
  angular.module("WebAppMaker")
  .controller("LoginController", LoginController);

  function LoginController($location, UserService) {
    var vm = this;
    vm.login = login;

    function login(user) {
      if(!user || !user.username || !user.password) {
        vm.error = "Username or Password can't be empty";
        return;
      }

      var promise = UserService.findUserByCredentials(user.username, user.password);
      promise
      .success(function(user){
        if(user === '0') {
          vm.error = "No such user";
        } else {
          $location.url("/user/" + user._id);
        }
      })
      .error(function(bbbb){
        console.log(bbbb);
      });
    }
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("RegisterController", RegisterController);

  function RegisterController($routeParams, UserService, $location) {
    var vm = this;
    vm.register = register;

    function register(user) {
      if(!user || !user.username || !user.password || !user.password2 || !user.type || !user.firstName || !user.lastName) {
        vm.error = "Mandatory filed cannot be empty!";
        return;
      }
      if(user.password != user.password2) {
        vm.error = "Password don't match";
        return;
      }
      if((user.type.toLowerCase() != "student") && (user.type.toLowerCase() != "faculty")) {
        vm.error = "Please enter 'student' or'faculty' for identity";
        return;
      }

      var user = {
        username: user.username,
        password: user.password,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        email: user.email
      };

      UserService
      .createUser(user)
      .success(function(user){
        $location.url("/user/"+user._id);
      })
      .error(function (error) {

      });
    }
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("ProfileController", ProfileController);

  function ProfileController($routeParams, UserService) {
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

    function updateUser() {
      // console.log(vm.user);
      if(vm.user.email.includes("@") && (vm.user.email.includes(".com") || vm.user.email.includes(".COM"))){
        UserService.updateUser(vm.user);
        vm.success = "You have successfully update your personal info!"
        vm.error = null;
      } else {
        vm.error = "Please enter a valid email address: example@example.com"
        vm.success = null;
      }
    }

    function unregisterUser() {
      UserService
      .unregisterUser(vm.user._id)
      .success(function(){
        $location.url("/login");
      })
      .error(function(){

      });
    }
  }
})();
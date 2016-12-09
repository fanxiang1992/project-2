(function(){
  angular.module("WebAppMaker")
  .controller("CourseListController", CourseListController);

  function CourseListController($routeParams, CourseService) {
    var vm = this;
    vm.userId = $routeParams['uid'];

    function init() {
      CourseService.findCoursesForUser(vm.userId).success(function(courses){
        vm.courses = courses;
      });
    }
    init();
  }
})();



(function(){
  angular.module("WebAppMaker")
  .controller("GradeStudentController", GradeStudentController);

  function GradeStudentController($routeParams, CourseService, GradeService) {
    var vm = this;
    vm.userId = $routeParams.uid;

    function init() {
      GradeService.findAllGradeforUser(vm.userId).success(function(grades){
        if(grades != '[]') {
          vm.grades = grades;
          for (g in grades) {
            // console.log(g);
            var cid = grades[g].courseId;
            CourseService.findCourseById(cid).success(function(course){
              setCourseNameforGrades(course);
            })
          }
        }
      }).error(function(){
        console.log("finding grades for user error");
      });

    }
    init();

    function setCourseNameforGrades(course) {
      for(g in vm.grades){
        if (vm.grades[g].courseId == course._id){
          vm.grades[g].courseName = course.name + "-" + course.sectionNum;
          break;
        }
      }
    }

  }
})();
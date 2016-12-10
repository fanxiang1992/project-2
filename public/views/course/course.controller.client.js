(function(){
  angular.module("WebAppMaker")
  .controller("CourseListController", CourseListController);

  function CourseListController($routeParams, CourseService, UserService) {
    var vm = this;
    vm.userId = $routeParams['uid'];

    function init() {
      UserService.findUserById(vm.userId).success(function(user){
        vm.user = user;
      });

      CourseService.findCoursesForUser(vm.userId).success(function(courses){
        vm.courses = courses;
      });
    }
    init();
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("CourseEditController", CourseEditController);

  function CourseEditController($routeParams, CourseService, $route, $location) {
    var vm = this;
    vm.courseId = $routeParams.cid;
    vm.userId = $routeParams.uid;
    vm.updateCourse = updateCourse;
    vm.deleteCourse = deleteCourse;
    
    function init() {
      CourseService.findCoursesForUser(vm.userId).success(function(courses){
        vm.courses = courses;
      });

      CourseService.findCourseById(vm.courseId).success(function(course) {
        vm.course = course;
      });
    }
    init();

    function updateCourse(course) {
      CourseService.updateCourse(vm.courseId, course).success(function() {
        $location.url("/user/" + vm.userId + "/course");
      });
    }

    function deleteCourse() {
      CourseService.deleteCourse(vm.courseId).success(function() {
        $location.url("/user/" + vm.userId + "/course");
      })
    }
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("CourseNewController", CourseNewController);

  function CourseNewController($routeParams, CourseService, UserService, $route, $location) {
    var vm = this;
    var courseId = parseInt($routeParams.cid);
    vm.userId = $routeParams.uid;
    vm.createCourse = createCourse;
    
    function init() {
      var promise = CourseService.findCoursesForUser(vm.userId);
      promise
      .success(function(courses){
        vm.courses = courses;
      });

      UserService.findUserById(vm.userId).success(function(user){
        vm.user = user;
      });

      CourseService.findAllCourses().success(function(allcourses){
        vm.allcourses = allcourses;
      });
    }
    init();


    function createCourse(course) {
      if(!course || !course.name || !course.description || !course.sectionNum || !course.date) {
        vm.error = "Course name or description can't be empty";
        return;
      }

      for(i = 0; i < vm.allcourses.length; i++) {
        if(course.name == vm.allcourses[i].name) {
          if (course.sectionNum == vm.allcourses[i].sectionNum) {
            vm.error = "This course already exist!!!!!!";
            return;
          }
        }
      }

      vm.course.instructor = vm.user.firstName;
      vm.course.instructoremail = vm.user.email;

      CourseService.createCourse(vm.userId, course)
      .success(function (course) {
        $location.url("/user/" + vm.userId + "/course");
      });
    }
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("CourseAllController", CourseAllController);

  function CourseAllController($routeParams, CourseService, UserService) {
    var vm = this;
    vm.userId = $routeParams['uid'];

    function init() {
      UserService.findUserById(vm.userId).success(function(user){
        vm.user = user;
      });
      CourseService.findAllCourses().success(function(courses){
        vm.courses = courses;
      });
    }
    init();
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("CourseDetailsController", CourseDetailsController);

  function CourseDetailsController($routeParams, CourseService, UserService) {
    var vm = this;
    vm.userId = $routeParams['uid'];
    vm.courseId = $routeParams.cid;

    vm.addClass = addClass;
    vm.dropClass = dropClass;
    vm.haveClass = haveClass;

    function init() {
      UserService.findUserById(vm.userId).success(function(user){
        vm.user = user;
      });
      CourseService.findCourseById(vm.courseId).success(function(course){
        vm.course = course;
      });
    }
    init();


    function haveClass(course) {
      var templ = vm.user.courseTake;
      var result = false;
      for(var c in templ) {
        temp = templ[c];
        if(temp._id === vm.course._id){
          result = true;
        }
      }
      return result;
    }

    function addClass(course) {
      var templ = vm.user.courseTake;
      // console.log(templ);
      // console.log(vm.course);
      flag = true;
      for(var c in templ) {
        temp = templ[c];
        if(temp._id === vm.course._id){
          alert("You already registed for this class");
          flag = false;
        }
      }
      if (flag) {
        // console.log("course added");
        vm.user.courseTake.push(vm.course);
        UserService.updateUser(vm.user);
      }
    }

    function dropClass(course) {
      // console.log(vm.user.courseTake);
      var templ = vm.user.courseTake;
      // console.log(templ);
      // console.log(vm.course._id);
      for(var c in templ) {
        temp = templ[c];
        if(temp._id === vm.course._id) {
          vm.user.courseTake.splice(c, 1);
        }
      }
      UserService.updateUser(vm.user);
    }

  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("CourseSocialController", CourseSocialController);

  function CourseSocialController($routeParams, CourseService, UserService) {
    var vm = this;
    vm.userId = $routeParams['uid'];

    function init() {
      UserService.findUserById(vm.userId).success(function(user){
        vm.user = user;
      });
      CourseService.findAllCourses().success(function(courses){
        vm.courses = courses;
      });
    }
    init();
  }
})();


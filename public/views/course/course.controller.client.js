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

  function CourseEditController($routeParams, UserService, CourseService, $route, $location) {
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

      UserService.getAllUser().success(function(alluser){
        vm.alluser = alluser;
      });

    }
    init();

    function updateCourse(course) {
      CourseService.updateCourse(vm.courseId, course).success(function() {
        $location.url("/user/" + vm.userId + "/course");
      });
    }

    function deleteCourse() {
      var flag = false;
      for (var u in vm.alluser) {
        var currentUser = vm.alluser[u];
        var courseTaken = currentUser.courseTake;
        for(var c in courseTaken) {
          if(vm.course._id === courseTaken[c]._id){
            flag = true;
          }
        }
      }
      
      if(flag) {
        alert("There are students currently taking this course. You CAN'T delete the courese now!")
        return;
      }

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

      UserService.getAllUser().success(function(alluser){
        vm.alluser = alluser;
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

      console.log(vm.alluser);

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

  function CourseSocialController($routeParams, GradeService, CourseService, UserService, PostService, $location, $route) {
    var vm = this;
    vm.userId = $routeParams['uid'];
    vm.courseId = $routeParams['cid'];
    vm.createGrade = createGrade;
    vm.getGrade = getGrade;
    vm.createPost = createPost;
    vm.deletePost = deletePost;

    function init() {
      UserService.findUserById(vm.userId).success(function(user){
        vm.user = user;
      });

      CourseService.findCourseById(vm.courseId).success(function(course) {
        vm.course = course;
        UserService.getAllUser().success(function(alluser){ 
          vm.alluser = alluser;
          console.log(vm.alluser);
          vm.allinClass = [];
          for (var u in vm.alluser) {
            var currentUser = vm.alluser[u];
            var courseTaken = currentUser.courseTake;
            for(var c in courseTaken) {
              if(vm.course._id === courseTaken[c]._id){
                vm.allinClass.push(currentUser);
              }
            }
          }

          for (var u in vm.allinClass) {
            GradeService.findCourseGradeforUser(vm.allinClass[u]._id, vm.course._id).success(function(returnGrade){
              assignGrade(vm.allinClass, returnGrade);
            });
          }
        });
      });

      PostService.findAllPostforCourse(vm.courseId).success(function(posts){
        if(posts != '[]') {
          vm.allpost = posts;
          for(p in posts) {
            // set the current userId for everypost user for enable delete
            vm.allpost[p].currentId = vm.userId;
            var uid = posts[p].userId;
            UserService.findUserById(uid).success(function(user){
              //assign a user name for the post
              setUserNameforPost(user);
            })
          }
        }
      }).error(function(){
        console.log("finding posts for course error");
      })
    }
    init();

    function assignGrade(users, grade) {
      var userid = grade.userId;
      for (var u in vm.allinClass) {
        if (vm.allinClass[u]._id == userid) {
          if(grade == "0") {
            vm.allinClass[u].gradeLetter = "N/A";
          } else {
            vm.allinClass[u].gradeLetter = grade.letterGrade;
          }
          break;
        }
      }
    }

    function createGrade(user, letter) {
      // console.log(user);
      // console.log(letter);

      if (letter != "A" && letter != "B" && letter != "C" && letter != "D" && letter != "F"
           && letter != "A-" && letter != "B-" && letter != "C-" && letter != "D-"
           && letter != "B+" && letter != "C+" && letter != "D+") {
        vm.error = "A Grade can only be a LetterGrade.";
        vm.success = null;
        return;
      }

      var grade = {letterGrade: letter, courseId: vm.course._id, userId: user._id};
      GradeService.findCourseGradeforUser(user._id, vm.course._id).success(function(returnGrade){
        // console.log("Returngrade:::::::")
        console.log(returnGrade);
        if(returnGrade == "0") {
          console.log("create!!!!");
          GradeService.createGrade(grade).success(function(createdGrade) {
            console.log("Create success!!");
            vm.success = "Successfully assigned Grade for this student.";
            vm.error = null;
          });
        } else {
          console.log("update!!!!!!!");
          GradeService.updateGrade(returnGrade._id, grade).success(function(updatedGrade) {
            console.log("Update success");
            vm.success = "Successfully assigned Grade for this student.";
            vm.error = null;
          });
        }
      });
    }

    function getGrade(user) {
      GradeService.findCourseGradeforUser(user._id, vm.course._id).success(function(returnGrade){
        console.log(returnGrade);
        if(returnGrade == "0") {
          return "N/A";
        } else {
          return returnGrade.letterGrade;
        }
      });
    }

    function setUserNameforPost(user) {
      for (p in vm.allpost){
        if (vm.allpost[p].userId == user._id) {
          vm.allpost[p].username = user.firstName + ' ' + user.lastName;
        }
      }
    }

    function createPost(post) {
      // console.log("step1 post");

      if(!post || !post.comment) {
        vm.error = "You cannot submit a empty comment!";
        return;
      }

      vm.post.userId = vm.userId;
      vm.post.courseId = vm.courseId;


      PostService.createPost(post).success(function(returnpost){
        $route.reload();
        // $location.url("/user/" + vm.userId + "/course/" + vm.courseId + "/social");
      })
    }

    function deletePost(pid) {
      // console.log("delete step 1");
      PostService.deletePost(pid).success(function() {
        $route.reload();
      })
    }
  }
})();


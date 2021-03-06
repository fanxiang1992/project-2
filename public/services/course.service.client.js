(function(){
  angular.module("WebAppMaker")
  .factory("CourseService", CourseService);

  function CourseService($http) {
    

    var api = {
      findCoursesForUser: findCoursesForUser,
      createCourse: createCourse,
      updateCourse: updateCourse,
      deleteCourse: deleteCourse,
      findCourseById: findCourseById,
      findAllCourses: findAllCourses
    };
    return api;


    function findCoursesForUser(uid) {
      var url = '/api/user/' + uid + '/course';
      return $http.get(url);
    }

    function createCourse(uid, course) {
      // course.developerId = uid;
      var url = '/api/user/' + uid + '/course';
      return $http.post(url, course);
    }

    function updateCourse(wid, course) {
      var url = '/api/course/' + wid;
      return $http.put(url, course);
    }

    function deleteCourse(wid) {
      var url = '/api/course/' + wid;
      return $http.delete(url);
    }

    function findCourseById(wid) {
      var url = '/api/course/' + wid;
      return $http.get(url);
    }

    function findAllCourses() {
      var url = '/api/course';
      return $http.get(url);
    }

  }
})();
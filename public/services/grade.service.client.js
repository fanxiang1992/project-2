(function(){
	angular.module("WebAppMaker")
	.factory("GradeService", GradeService);

	function GradeService($http) {
		var api = {
			createGrade: createGrade,
			findAllGradeforUser: findAllGradeforUser,
			// findAllGradeforCourse: findAllGradeforCourse,
			updateGrade: updateGrade,
			findCourseGradeforUser: findCourseGradeforUser
		};
		return api;

		function createGrade(grade) {
			var url = '/api/grade';
			return $http.post(url, grade)
		}

		function findAllGradeforUser(uid) {
			console.log("step 1");
			var url = '/api/grade/' + uid;
			return $http.get(url);
		}

		function findCourseGradeforUser(uid, cid) {
			var url = '/api/grade?uid=' +uid + '&cid=' +cid;
			return $http.get(url);
		}

		// function findAllGradeforCourse(cid) {
		// 	console.log("gets here")
		// 	var url = '/api/grade/this/' + cid;
		// 	return $http.get(url);
		// }

	    function updateGrade(gid, grade) {
	      var url = '/api/grade/' + gid;
	      return $http.put(url, grade);
	    }
	}
})();
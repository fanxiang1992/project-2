(function(){
	angular.module("WebAppMaker")
	.factory("PostService", PostService);

	function PostService($http) {
		var api = {
			createPost: createPost,
			updatePost: updatePost,
			findAllPostforCourse: findAllPostforCourse,
			findCoursePostforUser: findCoursePostforUser,
			deletePost: deletePost
		};
		return api;

		function createPost(post) {
			var url = '/api/post';
			return $http.post(url, post);
		}

		function updatePost(pid, post) {
			var url = '/api/post/' + pid;
			return $http.put(url, post);
		}

		function findAllPostforCourse(cid) {
			var url = '/api/post/' + cid;
			return $http.get(url);
		}

		function findCoursePostforUser(uid, cid) {
			var url = '/api/post?uid=' + uid + '&cid=' + cid;
			return $http.get(url);
		}

	    function deletePost(pid) {
	      // console.log("delete step 2");
	      var url = "/api/post/" + pid;
	      return $http.delete(url);
	    }
	}
})();
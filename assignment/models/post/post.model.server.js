
module.exports = function() {
	var mongoose = require("mongoose");
	var PostSchema = require("./post.schema.server")();
	var PostModel = mongoose.model("PostModel", PostSchema);

	var api = {
		findAllPostforCourse: findAllPostforCourse,
		updatePost: updatePost,
		createPost: createPost,
		deletePost: deletePost,
		findCoursePostforUser: findCoursePostforUser
	};
	return api;

    function createPost(post) {
        return PostModel.create(post);
    }

	function findAllPostforCourse(cid) {
		return PostModel.find({ courseId: cid });
	}

	function updatePost(postId, post) {
		return PostModel
		.update(
		{
			_id: postId
		},
		{
	        comment: post.comment,
	        userId: post.userId,
	        courseId: post.courseId
		});
	}

	function deletePost(postId) {
		return PostModel.remove({_id: postId});
	}

	function findCoursePostforUser(uid, cid) {
		return PostModel.findOne({
			userId: uid,
			courseId: cid
		})
	}
}
module.exports = function (app, model) {


	// var api = {
	// 	findAllPostforCourse: findAllPostforCourse,
	// 	updatePost: updatePost,
	// 	createPost: createPost,
	// 	deletePost: deletePost,
	// 	findCoursePostforUser: findCoursePostforUser
	// };

	app.post('/api/post', createPost);

	app.put('/api/post/:postId', updatePost);

	app.get('/api/post/:courseId', findAllPostforCourse);

	app.get('/api/post', findCoursePostforUser);

    app.delete('/api/post/:postId',deletePost);

	function createPost(req, res) {
		var post = req.body;
		model.postModel.createPost(post).then(
			function (newpost) {
				res.send(newpost);
			},
			function (error) {
				res.sendStatus(400).send(error);
			});
	}

	function updatePost(req, res) {
		var post = req.body;
		var pid = req.params.postId;
		model.postModel.updatePost(pid, post).then(
			function(status){
				res.sendStatus(200);
			},
			function(error) {
				res.sendStatus(400).send(error);
			});
	}

	function findAllPostforCourse(req, res) {
		var courseId = req.params.courseId;
		model.postModel.findAllPostforCourse(courseId).then(
			function (posts) {
				if (posts) {
					res.json(posts);
				} else {
					res.send('0');
				}
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}


	function findCoursePostforUser(req, res) {
		var cid = req.query.cid;
		var uid = req.query.uid;

		model.postModel.findCoursePostforUser(uid, cid).then(
			function(posts) {
				if(posts) {
					res.json(posts);
				} else {
					res.send('0');
				}
			},
			function(error) {
				res.sendStatus(400).send(error);
			});

	}

	function deletePost(req, res) {
        // console.log("delete step 3");
		var pid = req.params.postId;
		model.postModel.deletePost(pid).then(
			function (status) {
				res.send(200);
			},
			function (error) {
				res.sendStatus(400).send(error);
			});
	}

	
}
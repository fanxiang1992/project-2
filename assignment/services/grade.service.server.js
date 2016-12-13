
module.exports = function (app, model) {

	app.get('/api/grade/:userId', findAllGradeforUser);

	// app.get('/api/grade/this/:courseId', findAllGradeforCourse);

	app.put('/api/grade/:gradeId', updateGrade);

	app.post('/api/grade', createGrade);

	app.get('/api/grade', findCourseGradeforUser);


	function findCourseGradeforUser(req, res) {
		var cid = req.query.cid;
		var uid = req.query.uid;

		model.gradeModel.findCourseGradeforUser(uid, cid).then(
			function(grade) {
				if(grade) {
					res.json(grade);
				} else {
					res.send('0');
				}
			},
			function(error) {
				res.sendStatus(400).send(error);
			});
	}

    function createGrade(req, res) {
      var grade = req.body;
      model.gradeModel.createGrade(grade).then(
        function (newgrade) {
          res.send(newgrade);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
        );
    }

	function findAllGradeforUser(req, res) {
		console.log("step 2");
		var userId = req.params.userId;
		model.gradeModel.findAllGradeforUser(userId).then(
			function (grades) {
				if(grades) {
					res.json(grades);
				} else {
					res.send('0');
				}
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	// function findAllGradeforCourse(req, res) {
	// 	console.log("not here");
	// 	model.gradeModel.findAllGradeforCourse(req.params.courseId).then(
	// 		function (grades) {
	// 			if(grades) {
	// 				res.json(grades);
	// 			} else {
	// 				res.send('0');
	// 			}
	// 		},
	// 		function(error){
	// 			res.sendStatus(400).send(error);
	// 		});
	// }

	function updateGrade(req, res) {
		var grade = req.body;
		var gid = req.params.gradeId;
		model.gradeModel.updateGrade(gid, grade).then(
			function(status) {
				res.sendStatus(200);
			},
			function(error) {
				res.sendStatus(400).send(error);
			});
	}
}
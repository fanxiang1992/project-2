
module.exports = function() {
	var mongoose = require("mongoose");
	var GradeSchema = require("./grade.schema.server")();
	var GradeModel = mongoose.model("GradeModel", GradeSchema);

	var api = {
		findAllGradeforUser: findAllGradeforUser,
		// findAllGradeforCourse: findAllGradeforCourse,
		updateGrade: updateGrade,
		createGrade: createGrade,
		findCourseGradeforUser: findCourseGradeforUser
	};
	return api;

	function findCourseGradeforUser(uid, cid) {
		return GradeModel.findOne({
			userId: uid,
			courseId: cid
		})
	}

    function createGrade(grade) {
        return GradeModel.create(grade);
    }

	function findAllGradeforUser(uid) {
		// console.log("step 3");
		return GradeModel.find({ userId: uid });
	}

    // function findAllWebsitesForUser(userId) {
         // return WebsiteModel.find({ _user: userId });
    // }

	// function findAllGradeforCourse(courseId) {
	// 	return GradeModel.findById(courseId);
	// }

	function updateGrade(gradeId, grade) {
		return GradeModel
		.update(
		{
			_id: gradeId
		},
		{
			letterGrade: grade.letterGrade,
			userId: grade.userId,
        	courseId: grade.courseId
		});
	}
}
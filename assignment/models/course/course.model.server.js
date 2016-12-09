
module.exports = function() {
    var mongoose = require("mongoose");
    var CourseSchema = require("./Course.schema.server")();
    var CourseModel = mongoose.model("CourseModel", CourseSchema);

    var api = {
        createCourseForUser: createCourseForUser,
        findCoursesForUser:findCoursesForUser,
        deleteCourse:deleteCourse,
        findCourseById:findCourseById,
        updateCourse:updateCourse,
        findAllCourses: findAllCourses
    };
    return api;

    function findAllCourses() {
      return CourseModel.find();
    }


    function updateCourse(courseId,course) {
      return CourseModel
      .update(
      {
        _id: courseId
      },
      {
        name: course.name,
        sectionNum: course.sectionNum,
        date: course.date,
        description: course.description
      }
      );
    }

    function findCourseById(courseId) {
        return CourseModel
            .findById(courseId);
    }

    function deleteCourse(courseId) {
        return CourseModel
            .remove({
                _id:courseId
            })
    };

    function findCoursesForUser(userId) {
        return CourseModel
            .find({
                _user: userId
            });
    }

    function createCourseForUser(userId, course) {
        course["_user"] = userId;
        return CourseModel.create(course);
    }
};

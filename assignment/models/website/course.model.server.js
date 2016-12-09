
module.exports = function() {
    var mongoose = require("mongoose");
    var CourseSchema = require("./Course.schema.server")();
    var CourseModel = mongoose.model("CourseModel", CourseSchema);

    var api = {
        createCourseForUser: createCourseForUser,
        findCoursesForUser:findCoursesForUser,
        deleteCourse:deleteCourse,
        //findWebsiteById:findWebsiteById,
        updateCourse:updateCourse
    };
    return api;


    function updateCourse(courseId,course) {
      return CourseModel
      .update(
      {
        _id: courseId
      },
      {
        name: course.name,
        description: course.description
      }
      );
    }

    // function findWebsiteById(websiteId) {
    //     return WebsiteModel
    //         .findById(websiteId);
    // }

    function deleteCourse(courseId) {
        return CourseModel
            .remove({
                _id:CourseId
            })
    };

    function findCoursesForUser(userId) {
        return CourseModel
            .find({
                _user: userId
            });
    }

    function createCourseForUser(userId,course) {
        course["_user"] = userId;
        return CourseModel.create(course);
    }
};

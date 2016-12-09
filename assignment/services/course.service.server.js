

module.exports = function (app, model) {

  app.post('/api/user/:userId/course',createCourse);
  app.get('/api/user/:userId/course', findCoursesForUser);
  app.put('/api/course/:courseId', updateCourse);
  app.delete('/api/course/:courseId', removeCourse);



  function createCourse(req, res) {
    var course = req.body;
    var uid = req.params.userId;
    model.courseModel.createCourseForUser(uid, course).then(
      function (newCourse) {
        res.json(newCourse);
      })
  }


  function removeCourse(req, res) {
    var wid = req.params.courseId;
    model.courseModel.deleteCourse(wid).then(
      function (status) {
        res.sendStatus(200);
      },
      function (error) {
        res.sendStatus(400).send(error);
      }
      )
  }



  function updateCourse(req, res) {
    var course = req.body;
    var wid = req.params.courseId;
    model.courseModel.updateCourse(wid, course).then(
      function(status){
        res.sendStatus(200);
      },
      function(error){
        res.sendStatus(400).send(error);
      }
      );
  }


  function findCoursesForUser(req, res) {
    model.courseModel.findCoursesForUser(req.params.userId).then(
      function (courses) {
        if(courses){
          res.json(courses);
        }
        else{
          res.send('0');
        }
      },
      function(error){
        res.sendStatus(400).send(error);
      }
      );

  }

}
(function(){
  angular.module("WebAppMaker")
  .controller("HomeController", HomeController);

  function HomeController($scope, $http) {
    var vm = this;
    var apiKey = "38540142a62c06bf";
    var state = "MA";
    var city = "Boston";
    var time = moment();
    vm.dateMonth = time.format("MMMM");
    vm.dateDay = time.format("D");
    vm.dateYear = time.format("YYYY");
    vm.dateWeek = time.format('dddd');

    vm.displayLocation = {full: "Boston, MA", city: "Boston", state: "MA", state_name: "Massachusetts", country: "US"};
    vm.temperature = "24.8";    
    vm.feelsLike = "25";
    vm.observationTime = moment("Sat, 10 Dec 2016 22:27:24 -0500").format("ddd, MMM D YYYY");
    vm.weather = "Partly Cloudy";
    vm.icon = "http://icons.wxug.com/i/c/k/nt_clear.gif";

    // $http.get("http://api.wunderground.com/api/" + apiKey + "/conditions/q/" + state + "/" + city + ".json").then(function(response) {
    //   // console.log(response);
    //   var current_observation = response.data.current_observation;
    //   vm.displayLocation = current_observation.display_location;    //object
    //   vm.temperature = current_observation.temp_f;      //string
    //   vm.feelsLike = current_observation.feelslike_f;          //string
    //   vm.observationTime = moment(current_observation.observation_time_rfc822).format("ddd, MMM D YYYY");
    //   vm.weather = current_observation.weather
    //   vm.icon = current_observation.icon_url
    // });
  }
})();
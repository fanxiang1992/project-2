(function() {
  angular.module("WebAppMaker").config(Config);

  function Config($routeProvider) {
    $routeProvider
    .when("/home", {
      templateUrl: "views/home.html"
    })
    .when("/login", {
      templateUrl: "views/user/login.view.client.html",
      controller: "LoginController",
      controllerAs: "model"
    })
    .when("/register", {
      templateUrl: "views/user/register.view.client.html",
      controller: "RegisterController",
      controllerAs: "model"
    })
    .when("/user/:uid", {
      templateUrl: "views/home_page_after_login/after-login.view.client.html",
      controller: "AfterLoginController",
      controllerAs: "model"
    })
    .when("/user/:uid/profile", {
      templateUrl: "views/user/profile.view.client.html",
      controller: "ProfileController",
      controllerAs: "model"
    })

    .when("/user/:uid/course", {
      templateUrl: "views/course/course-list.view.client.html",
      controller: "CourseListController",
      controllerAs: "model"
    })
    // .when("/user/:uid/website/new", {
    //   templateUrl: "views/website/website-new.view.client.html",
    //   controller: "WebsiteNewController",
    //   controllerAs: "model"

    // })
    // .when("/user/:uid/website/:wid", {
    //   templateUrl: "views/website/website-edit.view.client.html",
    //   controller: "WebsiteEditController",
    //   controllerAs: "model"
    // })

    // .when("/user/:uid/website/:wid/page", {
    //   templateUrl: "views/page/page-list.view.client.html",
    //   controller: "PageListController",
    //   controllerAs: "model"
    // })

    // .when("/user/:uid/website/:wid/page/new", {
    //   templateUrl: "views/page/page-new.view.client.html",
    //   controller: "PageNewController",
    //   controllerAs: "model"
    // })

    // .when("/user/:uid/website/:wid/page/:pid", {
    //   templateUrl: "views/page/page-edit.view.client.html",
    //   controller: "PageEditController",
    //   controllerAs: "model"
    // })


    // .when("/user/:uid/website/:wid/page/:pid/widget", {
    //   templateUrl: "views/widget/widget-list.view.client.html",
    //   controller: "WidgetListController",
    //   controllerAs: "model"
    // })

    // .when("/user/:uid/website/:wid/page/:pid/widget/new", {
    //   templateUrl: "views/widget/widget-chooser.view.client.html",
    //   controller: "WidgetNewController",
    //   controllerAs: "model"
    // })


    // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
    //   templateUrl: "views/widget/widget-edit.view.client.html",
    //   controller: "WidgetEditController",
    //   controllerAs: "model"
    // })
     .otherwise({
       redirectTo: "/home"
     });
  }
})();

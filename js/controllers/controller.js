require([
  '$api/models',
  'js/components#Components'
], function(models, Components) {

  /**
    Controller Object

    Generic controller object
  */
  var Controller = function(name, config) {
    this.name = name;
    this.config = config;
    this.selector = config.selector;
    this.selectors = config.selectors;
  };

  // class specific methods
  Controller.prototype = {

    // Controller.loadView
    //    To be called by components.Components
    //    Loads template from file if available.
    //    When view is ready, afterLoad helper function is called
    loadView: function(dependency) {

      if (this.config.loadtemplate) {

        $(this.selector).load(
          this.config.viewpath,
          this.afterLoad.bind(this, dependency));
      } else
        this.afterLoad(dependency);
    },
    // helper function for setting configurations
    // after the loadView function as finished
    afterLoad: function(dependency) {
      this.jelement = $(this.selector);
      this.element = this.jelement[0];

      this.loadController(dependency);

      var supports = this.component.supports;

      if (!supports)
        return;

      // call loadView on all the controllers that depend on
      // this controller.
      for (var i = 0; i < supports.length; ++i) {
        var support = Components.components[supports[i]];
        if (support && support.controller) {
          support.controller.loadView(this);
        }
      }
    },
    loadController: function() {
      // handler that will be called after the DOM element
      // of the component has been loaded.
      // note: child classes should implement this method as needed.
    }
  };

  Controller.prototype.constructor = Controller;

  exports.controller = Controller;
});
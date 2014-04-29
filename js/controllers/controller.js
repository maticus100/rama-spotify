require(['$api/models'], function(models) {

  var Controller = new Class({
    initialize: function(name, config) {
      this.name = name;
      this.config = config;
      this.selector = config.selector;
    }
  });

  function afterLoad(controller, supports) {
    return function(dependency) {
      controller.jelement = $(controller.selector);
      controller.element = controller.jelement[0];

      controller.afterLoad(dependency);

      if (supports && supports.controller)
        supports.controller.loadView(null, controller);
    };
  }

  Controller.implement({
    loadView: function(supports, dependency) {
      if (this.config.loadtemplate) {
        $(this.selector).load(
          this.config.viewpath,
          afterLoad(this, supports)
        );
      } else
        afterLoad(this, supports)(dependency);
    },
    updateView: function() {},
  });

  exports.controller = Controller;
});
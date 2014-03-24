define(['can/control', 'ejs!./ejs-control'], function (Control, renderer) {

    return Control.extend({
        init: function () {
            this.element.html(renderer({model: this.options.model}));
        }
    });
});
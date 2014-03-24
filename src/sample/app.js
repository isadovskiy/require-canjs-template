define(['jquery', './ejs-control/ejs-control', './mustache-control/mustache-control', 'can/map'], function ($, EjsControl, MustacheControl, Map) {

    return function (el) {

        $(function () {

            var model = new Map({
                now: new Date()
            });

            // update that property every second
            setInterval(function(){
                model.attr('now', new Date() );
            },1000);

            var ejsControl = new EjsControl($(el).find('.ejs'), {
                model: model
            });

            var mustacheControl = new EjsControl($(el).find('.mustache'), {
                model: model
            });

        });

    };

});
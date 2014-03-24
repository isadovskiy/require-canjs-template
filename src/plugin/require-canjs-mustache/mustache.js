define(['text', 'can/view/mustache'], function (text, can) {

    var mustache,
        extension;

    // The template extension
    extension = 'mustache';

    mustache = {

        version: '0.1.0',

        pluginBuilder: './mustache.builder',

        load: function (name, req, load, config) {
            var nameTokens = name.split('?');
            var url = req.toUrl(nameTokens[0] + '.' + extension);
            var id = nameTokens[1] || can.view.toId(url);
            text.get(url, function (template) {
                var renderer = can.view.mustache(id, template);
                renderer.id = id;
                load(renderer);
            });
        }

    };

    return mustache;

});

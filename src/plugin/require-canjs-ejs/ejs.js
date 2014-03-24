define(['text', './ejs.includes', 'can/view/ejs'], function (text, injectIncludes, can) {

    var ejs,
        extension;

    // The template extension
    extension = 'ejs';

    ejs = {

        version: '0.1.0',

        pluginBuilder: './ejs.builder',

        load: function (name, req, load, config) {
            var nameTokens = name.split('?');
            var url = req.toUrl(nameTokens[0] + '.' + extension);
            var id = nameTokens[1] || can.view.toId(url);
            text.get(url, function (template) {
                var renderTemplate = function (template) {
                    var renderer = can.view.ejs(id, template);
                    renderer.id = id;
                    load(renderer);
                };
                if (config.injectIncludedTemplates) {
                    injectIncludes(template, extension, renderTemplate, ejs);
                } else {
                    renderTemplate(template);
                }
            });
        }

    };

    return ejs;

});

require.config({
    map: {
        '*': {
            'can/util/library': 'can/util/optimize'
        }
    }
});

define(['text', './ejs.includes', 'can/view/ejs'], function (text, injectIncludes, can) {

    var ejs,
        extension,
        buildMap;

    // The template extension
    extension = 'ejs';

    // Holds the raw templates, keyed by relative path.
    buildMap = {};

    ejs = {

        load: function (name, req, load, config) {
            if (config.inlineTemplates !== false) {
                var nameTokens = name.split('?');
                var url = req.toUrl(nameTokens[0] + '.' + extension);
                text.get(url, function (template) {
                    var renderTemplate = function (template) {
                        var id = nameTokens[1] || can.view.toId(url);
                        try {
                            var tpl = new can.EJS({
                                text: template
                            });
                            buildMap[name] = {
                                id: id,
                                text: tpl.template.out
                            };
                        } catch (e) {
                            console.log('Error compiling EJS template: ' + e);
                        }
                        load();
                    };
                    if (config.injectIncludedTemplates) {
                        injectIncludes(template, extension, renderTemplate, ejs);
                    } else {
                        renderTemplate(template);
                    }
                });
            } else {
                load();
            }
        },

        write: function (pluginName, moduleName, write) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = buildMap[moduleName];
                write('define("' + pluginName + '!' + moduleName + '", ["can/view/ejs"], function (can) {' +
                    'var renderer = can.EJS(function(_CONTEXT,_VIEW) {' + content.text + '});' +
                    'var frag = can.view.preload("' + content.id + '", renderer);' +
                    'frag.id = "' + content.id +  '";' +
                    'return frag;' +
                '});\n');
            }
        }

    };

    return ejs;

});

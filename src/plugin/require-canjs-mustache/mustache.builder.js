require.config({
    map: {
        '*': {
            'can/util/library': 'can/util/optimize'
        }
    }
});

define(['text', 'can/view/mustache'], function (text, can) {

    var mustache,
        extension,
        buildMap;

    // The template extension
    extension = 'mustache';

    // Holds the raw templates, keyed by relative path.
    buildMap = {};

    mustache = {

        load: function (name, req, load, config) {
            if (config.inlineTemplates !== false) {
                var nameTokens = name.split('?');
                var url = req.toUrl(nameTokens[0] + '.' + extension);
                text.get(url, function (template) {
                    var id = nameTokens[1] || can.view.toId(url);
                    try {
                        var tpl = new can.Mustache({
                            text: template
                        });
                        buildMap[name] = {
                            id: id,
                            text: tpl.template.out
                        };
                    } catch (e) {
                        console.log('Error compiling Mustache template: ' + e);
                    }
                    load();
                });
            } else {
                load();
            }
            load();
        },

        write: function (pluginName, moduleName, write) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = buildMap[moduleName];
                write('define("' + pluginName + '!' + moduleName + '", ["can/view/mustache"], function (can) {' +
                    'var renderer = can.Mustache(function(scope, options) {' + content.text + '});' +
                    'var frag = can.view.preload("' + content.id + '", renderer);' +
                    'frag.id = "' + content.id +  '";' +
                    'return frag;' +
                '});\n');
            }
        }

    };

    return mustache;

});

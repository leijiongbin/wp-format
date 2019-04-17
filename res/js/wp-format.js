(function ($) {
    $(document).ready(function () {

        function getSelectedAll(editor) {
            var start = editor.selection.getStart()
            var end = editor.selection.getEnd()
            var els = [start]

            var flag = true;
            setTimeout(function(){flag=false},1000);
            while( flag ) {
                var last = els[els.length - 1]
                if ( els[els.length - 1] === end ) break;
                els.push($(last).next()[0])
            }
            els.push(end)
            return els;
        }

        function addNodeTextIndent(node, editor, plus) {
            var nodeName = node.nodeName;
            if (nodeName == 'P' || nodeName == 'DIV' ||
                nodeName == 'H1' || nodeName == 'H2' || nodeName == 'H3' || nodeName == 'H4' || nodeName == 'H5' || nodeName == 'H6'
            ){
                var indent = parseInt(editor.dom.getStyle(node, 'text-indent'));
                // 修正2的倍数
                indent = isNaN(indent) ? 0 : parseInt(indent/2) * 2;
                // 缩进处理
                if (plus == 1){
                    // 累加
                    indent += 2;
                } else if (plus == -1){
                    // 累减
                    indent -= 2;
                } else {
                    indent = indent - 2 < 0 ? 2 : indent - 2;
                }
                // 判断是否已经添加样式
                var style = indent <= 0 ? '' : indent + 'em';
                editor.dom.setStyle(node, 'text-indent', style);
            };
        }

        function addAllNodesTextIndent(editor, plus) {
            var doms = getSelectedAll(editor);
            for (i=0;i<doms.length;i++){
                addNodeTextIndent(doms[i], editor, plus); 
            }
        } 

        /**
         * tab处理
         */
        function tabHandler(e, editor) {
            if (e.keyCode === 9 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                addAllNodesTextIndent(editor, e.shiftKey ? -1 : 1);
                // 阻止事件传递
                e.preventDefault();
            }
        }

        // 创建插件
        tinymce.create('tinymce.plugins.wpformat', {
            init : function(editor, url) {
                // 增加按钮
                editor.addButton('wpformat', {
                    title: 'ctrl+a全选，点击一键排版',
                    image: url + '/../images/wp-format.jpg',
                    onclick : function() {
                        addAllNodesTextIndent(editor, 0);
                    }
                });
                // 绑定tab事件
                if (tinymce.Env.gecko) {
                    editor.on('keypress keydown', function (e) {
                        tabHandler(e, editor);
                    });
                } else {
                    editor.on('keydown', function (e) {
                        tabHandler(e, editor);
                    });
                }
            }
        });
        tinymce.PluginManager.add('wpformat', tinymce.plugins.wpformat);
    });
})(jQuery);
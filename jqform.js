 /**
 * Copyright (c) 2011, Stojce Slavkovski
 * All rights reserved.
 *
 * Licensed under the BSD, MIT, and GPL (your choice!) Licenses:
 *
 */

(function () {
    if (window.jQuery) {
        (function ($) {
            $.fn.extend({
                aspForm: function (o) {

                    var defaults = {
                        method: 'post',
                        target: '_self',
                        action: '',
                        submit: '',
                        viewstate: ''
                    };

                    var options = $.extend(defaults, o);
                    options.form = this;

                    $(this).delegate(options.submit, 'click', function (e) {
                        submitForm(e);
                    });

                    $(this).find('input').bind('keyup', function (e) {
                        if (e.keyCode == 13) {
                            submitForm(e);
                            return false;
                        }
                        return true;
                    });

                    var submitForm = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var op = options;
                        var frm = document.createElement("form");
                        frm.setAttribute("style", "display:none");
                        frm.setAttribute("method", op.method);
                        frm.setAttribute("target", op.target);
                        frm.setAttribute("action", op.action);

                        op.form.clone().appendTo(frm);
                        
                        op.form.find('textarea').each(function (i) {
                            $(frm).find('textarea:eq(' + i + ')').val($(this).val());
                        });
                        
                        op.form.find('select').each(function (i) {
                            $(frm).find('select:eq(' + i + ')').val($(this).val());
                        });

                        op.form.find('input, textarea, select').not(':hidden').each(function () {
                            $(this).val('');
                        });
                        
                        if (!!o.viewstate) {
                            $('<input type="hidden" name="__VIEWSTATE" id="_VIEWSTATE" value="' + o.viewstate + '" />').appendTo(frm);
                        }

                        document.body.appendChild(frm);

                        frm.submit();
                        $(frm).remove();
                    };

                    return this;
                }
            });
        })(window.jQuery);
    }
})();

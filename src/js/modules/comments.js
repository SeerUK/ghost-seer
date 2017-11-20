"use strict";

var buttonSelector = "gs-load-comments";
var button = document.getElementById(buttonSelector);

if (button) {
    document.getElementById(buttonSelector).onclick = function(e) {
        var identifier = button.getAttribute("data-gs-comments-identifier");
        var url = button.getAttribute("data-gs-comments-url");

        console.log("Loading comments for identifier:", identifier);
        console.log("Loading comments for URL:", url);

        button.parentNode.removeChild(button);

        window.disqus_config = function () {
            this.page.url = url;
            this.page.identifier = identifier;
        };

        (function() {
            var d = document, s = d.createElement("script");
            s.async = true;
            s.src = "https://elliotwright.disqus.com/embed.js";
            s.setAttribute("data-timestamp", +new Date());
            (d.head || d.body).appendChild(s);
        })();
    };
}


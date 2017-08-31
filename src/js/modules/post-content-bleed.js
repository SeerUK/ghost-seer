var width = {};
var willMutate;
var measure;
var mutate;

var n2a = Array.prototype.slice;

function measureTask() {
    var nextWidth = {
        client: document.documentElement.clientWidth,
        viewport: window.innerWidth
    };

    if (nextWidth.client !== width.client || nextWidth.viewport !== width.viewport) {
        width = nextWidth;
        willMutate = true;
        mutate(mutateTask);
    }
}

function mutateTask() {
    var elements = n2a.call(document.querySelectorAll(".gs-post-content pre"))
        .concat(n2a.call(document.querySelectorAll("img[src$='#full']")));

    var mutator;

    if (width.viewport >= (904 + window.mqGenie.width)) {
        mutator = function(element) {
            element.style.removeProperty("max-width");
            element.style.removeProperty("margin-left");
            element.style.removeProperty("margin-right");
        };
    } else {
        mutator = function(element) {
            element.style.maxWidth = width.client + "px";
            element.style.marginLeft = -(width.client / 2) + "px";
            element.style.marginRight = -(width.client/ 2) + "px";
        };
    }

    elements.forEach(mutator);

    willMutate = false;
}

function invalidateWidth() {
    if (!willMutate) {
        measure(measureTask);
    }
}

function install() {
    measure = window.requestAnimationFrame;
    mutate = mutateTask;
    window.addEventListener("resize", invalidateWidth);
    window.addEventListener("orientationchange", invalidateWidth);
    invalidateWidth();
}

install();

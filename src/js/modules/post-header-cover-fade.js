"use strict";

var wrapperSelector = ".gs-post-header__wrapper";

var measure;

function mutateTask() {
    var wrapper = document.querySelector(wrapperSelector);
    var scrollTop = document.documentElement.scrollTop;

    var delta = (0 - (wrapper.scrollHeight / 2)) - (scrollTop / 2.5);
    var opacity = 1 - (scrollTop * (100 / window.innerHeight)) / 100;

    wrapper.style.transform = "translate3d(0, " + delta + "px, 0)";
    wrapper.style.opacity = opacity;
}

function mutate() {
    measure(mutateTask)
}

function install() {
    measure = window.requestAnimationFrame;
    window.addEventListener("orientationchange", mutate);
    window.addEventListener("resize", mutate);
    window.addEventListener("scroll", mutate);
    mutate();
}

install();

// ==UserScript==
// @name         freelancehunt parse
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Зачем он нуже -не знает никто
// @author       Гошанбульйон
// @match        https://freelancehunt.com/*
// @icon         https://freelancehunt.com/static/images/apple-icon-57x57.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    alert("i'm pare freelancehunt");
    let projects = $('table > tbody > tr');/*массив всех проектов(несортированный массив)*/
    let premium_projects = [];/*массив премиальных проектов*/
    let common_projects =[]; /*массив не премиальных проектов*/

    for (i=0; i < projects.length; i++){/*пробегаемся по всем проектам, и складываем их по разным массивам*/
        let project = projects[i];
        if project.chil
    }
    projects.css({'background-color':'red'});
})();

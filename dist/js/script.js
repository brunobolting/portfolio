"use strict";var links=document.querySelectorAll('.internal-link[href^="#"]');function getScrollTopByHref(o){var t=o.getAttribute("href");return document.querySelector(t).offsetTop}function scrollToIdOnClick(o){o.preventDefault(),scrollToPosition(getScrollTopByHref(o.target))}function scrollToPosition(o){window.scroll({top:o,behavior:"smooth"})}links.forEach(function(o){o.addEventListener("click",scrollToIdOnClick)});
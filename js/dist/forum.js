module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){e.exports=flarum.core.compat.app},function(e,t){e.exports=flarum.core.compat.extend},,function(e,t){e.exports=flarum.core.compat["models/Discussion"]},function(e,t){e.exports=flarum.core.compat["components/Badge"]},,,function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(0),u=n.n(o),a=n(3),i=n.n(a),c=n(4),s=n.n(c);u.a.initializers.add("clarkwinkelmann-popular-discussion-badge",(function(){Object(r.extend)(i.a.prototype,"badges",(function(e){var t=this,n=u.a.forum.attribute("popularDiscussionBadgeConditions");Array.isArray(n)&&n.some((function(e){return function(e,t){return Object.keys(t).every((function(n){var r=t[n];if(!r||r<0)return!0;switch(n){case"comments":return e.commentCount()>=r;case"views":return e.attribute("views")>=r||e.attribute("viewCount")>=r;default:return console.warn("Unknown popular discussion criteria "+n),!0}}))}(t,e)}))&&e.add("popular",s.a.component({type:"popular",icon:"fas fa-fire",label:u.a.translator.trans("clarkwinkelmann-popular-discussion-badge.forum.badge_label")}))}))}))}]);
//# sourceMappingURL=forum.js.map
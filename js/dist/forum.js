module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=flarum.core.compat.app},,,function(e,t){e.exports=flarum.core.compat.extend},function(e,t){e.exports=flarum.core.compat["models/Discussion"]},function(e,t){e.exports=flarum.core.compat["components/Badge"]},function(e,t,r){"use strict";r.r(t);var n=r(3),o=r(0),u=r.n(o),a=r(4),i=r.n(a),c=r(5),s=r.n(c);u.a.initializers.add("clarkwinkelmann-popular-discussion-badge",(function(){Object(n.extend)(i.a.prototype,"badges",(function(e){var t=this,r=u.a.forum.attribute("popularDiscussionBadgeConditions");(Array.isArray(r)?r.some((function(e){return function(e,t){return Object.keys(t).every((function(r){var n=t[r];if(!n||n<0)return!0;switch(r){case"comments":return e.commentCount()>=n;case"views":return e.attribute("views")>=n||e.attribute("viewCount")>=n;default:return console.warn("Unknown popular discussion criteria "+r),!0}}))}(t,e)})):this.attribute("isPopular"))&&e.add("popular",s.a.component({type:"popular",icon:"fas fa-fire",label:u.a.translator.trans("clarkwinkelmann-popular-discussion-badge.forum.badge_label")}))}))}))}]);
//# sourceMappingURL=forum.js.map
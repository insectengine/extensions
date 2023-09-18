"use strict";(self.webpackChunkquarkus_extensions=self.webpackChunkquarkus_extensions||[]).push([[247],{1554:function(e,t,n){function r(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}n.d(t,{Z:function(){return r}})},3194:function(e,t,n){n.d(t,{Z:function(){return $}});var r=n(9568);function a(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}var i=n(5235),o=n(1554);function u(e,t){return(0,o.Z)(2,arguments),function(e,t){(0,o.Z)(2,arguments);var n=(0,i.Z)(e).getTime(),r=a(t);return new Date(n+r)}(e,-a(t))}function s(e){(0,o.Z)(1,arguments);var t=(0,i.Z)(e),n=t.getUTCDay(),r=(n<1?7:0)+n-1;return t.setUTCDate(t.getUTCDate()-r),t.setUTCHours(0,0,0,0),t}function c(e){(0,o.Z)(1,arguments);var t=(0,i.Z)(e),n=t.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(n+1,0,4),r.setUTCHours(0,0,0,0);var a=s(r),u=new Date(0);u.setUTCFullYear(n,0,4),u.setUTCHours(0,0,0,0);var c=s(u);return t.getTime()>=a.getTime()?n+1:t.getTime()>=c.getTime()?n:n-1}function d(e){(0,o.Z)(1,arguments);var t=(0,i.Z)(e),n=s(t).getTime()-function(e){(0,o.Z)(1,arguments);var t=c(e),n=new Date(0);return n.setUTCFullYear(t,0,4),n.setUTCHours(0,0,0,0),s(n)}(t).getTime();return Math.round(n/6048e5)+1}var l={};function f(){return l}function h(e,t){var n,r,u,s,c,d,l,h;(0,o.Z)(1,arguments);var m=f(),g=a(null!==(n=null!==(r=null!==(u=null!==(s=null==t?void 0:t.weekStartsOn)&&void 0!==s?s:null==t||null===(c=t.locale)||void 0===c||null===(d=c.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==u?u:m.weekStartsOn)&&void 0!==r?r:null===(l=m.locale)||void 0===l||null===(h=l.options)||void 0===h?void 0:h.weekStartsOn)&&void 0!==n?n:0);if(!(g>=0&&g<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var w=(0,i.Z)(e),v=w.getUTCDay(),b=(v<g?7:0)+v-g;return w.setUTCDate(w.getUTCDate()-b),w.setUTCHours(0,0,0,0),w}function m(e,t){var n,r,u,s,c,d,l,m;(0,o.Z)(1,arguments);var g=(0,i.Z)(e),w=g.getUTCFullYear(),v=f(),b=a(null!==(n=null!==(r=null!==(u=null!==(s=null==t?void 0:t.firstWeekContainsDate)&&void 0!==s?s:null==t||null===(c=t.locale)||void 0===c||null===(d=c.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==u?u:v.firstWeekContainsDate)&&void 0!==r?r:null===(l=v.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==n?n:1);if(!(b>=1&&b<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var y=new Date(0);y.setUTCFullYear(w+1,0,b),y.setUTCHours(0,0,0,0);var p=h(y,t),T=new Date(0);T.setUTCFullYear(w,0,b),T.setUTCHours(0,0,0,0);var C=h(T,t);return g.getTime()>=p.getTime()?w+1:g.getTime()>=C.getTime()?w:w-1}function g(e,t){(0,o.Z)(1,arguments);var n=(0,i.Z)(e),r=h(n,t).getTime()-function(e,t){var n,r,i,u,s,c,d,l;(0,o.Z)(1,arguments);var g=f(),w=a(null!==(n=null!==(r=null!==(i=null!==(u=null==t?void 0:t.firstWeekContainsDate)&&void 0!==u?u:null==t||null===(s=t.locale)||void 0===s||null===(c=s.options)||void 0===c?void 0:c.firstWeekContainsDate)&&void 0!==i?i:g.firstWeekContainsDate)&&void 0!==r?r:null===(d=g.locale)||void 0===d||null===(l=d.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==n?n:1),v=m(e,t),b=new Date(0);return b.setUTCFullYear(v,0,w),b.setUTCHours(0,0,0,0),h(b,t)}(n,t).getTime();return Math.round(r/6048e5)+1}function w(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}var v={y:function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return w("yy"===t?r%100:r,t.length)},M:function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):w(n+1,2)},d:function(e,t){return w(e.getUTCDate(),t.length)},a:function(e,t){var n=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:function(e,t){return w(e.getUTCHours()%12||12,t.length)},H:function(e,t){return w(e.getUTCHours(),t.length)},m:function(e,t){return w(e.getUTCMinutes(),t.length)},s:function(e,t){return w(e.getUTCSeconds(),t.length)},S:function(e,t){var n=t.length,r=e.getUTCMilliseconds();return w(Math.floor(r*Math.pow(10,n-3)),t.length)}},b="midnight",y="noon",p="morning",T="afternoon",C="evening",x="night",M={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return v.y(e,t)},Y:function(e,t,n,r){var a=m(e,r),i=a>0?a:1-a;return"YY"===t?w(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):w(i,t.length)},R:function(e,t){return w(c(e),t.length)},u:function(e,t){return w(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return w(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return w(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return v.M(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return w(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,t,n,r){var a=g(e,r);return"wo"===t?n.ordinalNumber(a,{unit:"week"}):w(a,t.length)},I:function(e,t,n){var r=d(e);return"Io"===t?n.ordinalNumber(r,{unit:"week"}):w(r,t.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):v.d(e,t)},D:function(e,t,n){var r=function(e){(0,o.Z)(1,arguments);var t=(0,i.Z)(e),n=t.getTime();t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0);var r=n-t.getTime();return Math.floor(r/864e5)+1}(e);return"Do"===t?n.ordinalNumber(r,{unit:"dayOfYear"}):w(r,t.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return w(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return w(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return w(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?y:0===a?b:a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?C:a>=12?T:a>=4?p:x,t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return v.h(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):v.H(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):w(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):w(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):v.m(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):v.s(e,t)},S:function(e,t){return v.S(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return D(a);case"XXXX":case"XX":return S(a);default:return S(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return D(a);case"xxxx":case"xx":return S(a);default:return S(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+k(a,":");default:return"GMT"+S(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+k(a,":");default:return"GMT"+S(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return w(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return w((r._originalDate||e).getTime(),t.length)}};function k(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=t||"";return n+String(a)+o+w(i,2)}function D(e,t){return e%60==0?(e>0?"-":"+")+w(Math.abs(e)/60,2):S(e,t)}function S(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+w(Math.floor(a/60),2)+n+w(a%60,2)}var U=M,P=function(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},W=function(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},Y={p:W,P:function(e,t){var n,r=e.match(/(P+)(p+)?/)||[],a=r[1],i=r[2];if(!i)return P(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",P(a,t)).replace("{{time}}",W(i,t))}},E=Y;var N=["D","DD"],O=["YY","YYYY"];function Z(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var q={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},j=function(e,t,n){var r,a=q[e];return r="string"==typeof a?a:1===t?a.one:a.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};function H(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}var z={date:H({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:H({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:H({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},F={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},L=function(e,t,n,r){return F[e]};function A(e){return function(t,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&e.formattingValues){var a=e.defaultFormattingWidth||e.defaultWidth,i=null!=n&&n.width?String(n.width):a;r=e.formattingValues[i]||e.formattingValues[a]}else{var o=e.defaultWidth,u=null!=n&&n.width?String(n.width):e.defaultWidth;r=e.values[u]||e.values[o]}return r[e.argumentCallback?e.argumentCallback(t):t]}}var G={ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:A({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:A({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:A({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:A({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:A({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})};function Q(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],i=t.match(a);if(!i)return null;var o,u=i[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(s)?function(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n;return}(s,(function(e){return e.test(u)})):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n;return}(s,(function(e){return e.test(u)}));return o=e.valueCallback?e.valueCallback(c):c,{value:o=n.valueCallback?n.valueCallback(o):o,rest:t.slice(u.length)}}}var X,B={ordinalNumber:(X={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(X.matchPattern);if(!n)return null;var r=n[0],a=e.match(X.parsePattern);if(!a)return null;var i=X.valueCallback?X.valueCallback(a[0]):a[0];return{value:i=t.valueCallback?t.valueCallback(i):i,rest:e.slice(r.length)}}),era:Q({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:Q({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:Q({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:Q({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:Q({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},R={code:"en-US",formatDistance:j,formatLong:z,formatRelative:L,localize:G,match:B,options:{weekStartsOn:0,firstWeekContainsDate:1}},_=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,I=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,J=/^'([^]*?)'?$/,V=/''/g,K=/[a-zA-Z]/;function $(e,t,n){var s,c,d,l,h,m,g,w,v,b,y,p,T,C,x,M,k,D;(0,o.Z)(2,arguments);var S=String(t),P=f(),W=null!==(s=null!==(c=null==n?void 0:n.locale)&&void 0!==c?c:P.locale)&&void 0!==s?s:R,Y=a(null!==(d=null!==(l=null!==(h=null!==(m=null==n?void 0:n.firstWeekContainsDate)&&void 0!==m?m:null==n||null===(g=n.locale)||void 0===g||null===(w=g.options)||void 0===w?void 0:w.firstWeekContainsDate)&&void 0!==h?h:P.firstWeekContainsDate)&&void 0!==l?l:null===(v=P.locale)||void 0===v||null===(b=v.options)||void 0===b?void 0:b.firstWeekContainsDate)&&void 0!==d?d:1);if(!(Y>=1&&Y<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var q=a(null!==(y=null!==(p=null!==(T=null!==(C=null==n?void 0:n.weekStartsOn)&&void 0!==C?C:null==n||null===(x=n.locale)||void 0===x||null===(M=x.options)||void 0===M?void 0:M.weekStartsOn)&&void 0!==T?T:P.weekStartsOn)&&void 0!==p?p:null===(k=P.locale)||void 0===k||null===(D=k.options)||void 0===D?void 0:D.weekStartsOn)&&void 0!==y?y:0);if(!(q>=0&&q<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!W.localize)throw new RangeError("locale must contain localize property");if(!W.formatLong)throw new RangeError("locale must contain formatLong property");var j=(0,i.Z)(e);if(!(0,r.Z)(j))throw new RangeError("Invalid time value");var H=function(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}(j),z=u(j,H),F={firstWeekContainsDate:Y,weekStartsOn:q,locale:W,_originalDate:j};return S.match(I).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,E[t])(e,W.formatLong):e})).join("").match(_).map((function(r){if("''"===r)return"'";var a=r[0];if("'"===a)return function(e){var t=e.match(J);if(!t)return e;return t[1].replace(V,"'")}(r);var i,o=U[a];if(o)return null!=n&&n.useAdditionalWeekYearTokens||(i=r,-1===O.indexOf(i))||Z(r,t,String(e)),null!=n&&n.useAdditionalDayOfYearTokens||!function(e){return-1!==N.indexOf(e)}(r)||Z(r,t,String(e)),o(z,r,W.localize,F);if(a.match(K))throw new RangeError("Format string contains an unescaped latin alphabet character `"+a+"`");return r})).join("")}},9568:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(1002),a=n(1554);var i=n(5235);function o(e){if((0,a.Z)(1,arguments),!function(e){return(0,a.Z)(1,arguments),e instanceof Date||"object"===(0,r.Z)(e)&&"[object Date]"===Object.prototype.toString.call(e)}(e)&&"number"!=typeof e)return!1;var t=(0,i.Z)(e);return!isNaN(Number(t))}},5235:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(1002),a=n(1554);function i(e){(0,a.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===(0,r.Z)(e)&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}},9539:function(e,t,n){var r=n(7294),a=n(3723);t.Z=e=>{let{extension:t,size:i}=e;const o=t.metadata,u=o.sourceControl;let s,c,d;return o&&o.icon?(s=(0,a.c)(o.icon),s||(c=o.icon.publicURL),d="The icon of the project"):null!=u&&u.projectImage?(s=(0,a.c)(u.projectImage),d="The icon of the project"):null!=u&&u.ownerImage&&(s=(0,a.c)(u.ownerImage),d="The icon of the organisation"),c?r.createElement("img",{src:c,alt:d,height:i,width:i}):s?r.createElement(a.G,{layout:"constrained",image:s,alt:d}):r.createElement(a.S,{layout:"constrained",formats:["auto","webp","avif"],src:"../images/generic-extension-logo.png",alt:"A generic image as a placeholder for the extension icon",__imageData:n(578)})}},1002:function(e,t,n){function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}n.d(t,{Z:function(){return r}})},578:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"white","images":{"fallback":{"src":"/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/e919e/generic-extension-logo.png","srcSet":"/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/24cbc/generic-extension-logo.png 128w,\\n/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/2b17f/generic-extension-logo.png 256w,\\n/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/e919e/generic-extension-logo.png 512w","sizes":"(min-width: 512px) 512px, 100vw"},"sources":[{"srcSet":"/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/f79b7/generic-extension-logo.avif 128w,\\n/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/6a9d7/generic-extension-logo.avif 256w,\\n/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/3db2d/generic-extension-logo.avif 512w","type":"image/avif","sizes":"(min-width: 512px) 512px, 100vw"},{"srcSet":"/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/6e8d8/generic-extension-logo.webp 128w,\\n/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/b995b/generic-extension-logo.webp 256w,\\n/extensions/static/4a9cfe369cdd7220e3396b01aaf557c5/68c4e/generic-extension-logo.webp 512w","type":"image/webp","sizes":"(min-width: 512px) 512px, 100vw"}]},"width":512,"height":512}')}}]);
//# sourceMappingURL=2166d8e9646e81371f0a10fb0d98f3d0d010ab8b-6bdd2f99ccb697dcb066.js.map
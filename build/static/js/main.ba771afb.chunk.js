(this["webpackJsonplast-wmg"]=this["webpackJsonplast-wmg"]||[]).push([[1],{19:function(e,t,a){e.exports=a(35)},27:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var o=a(1),n=a.n(o),r=a(11),c=a.n(r),i=a(2);const s=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function l(e,t){navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const a=e.installing;null!=a&&(a.onstatechange=()=>{"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(e=>{console.error("Error during service worker registration:",e)})}var p=a(12),d=a.n(p),u=(a(27),a(7)),h=a.n(u),m=a(13),g=a(14),b=a(4);function f(e){let t=e.initial,a=void 0===t?{color:{group:{primary:{background:"#DC3F32",color:"#000"},dark:{background:"#000",color:"#fff"},darkPrimary:{background:"#000",color:"#DC3F32"},light:{background:"#fff",color:"#000"},lightPrimary:{background:"#fff",color:"#DC3F32"},muted:{background:"lightgray",color:"black"}}}}:t,o=Object(g.a)(e,["initial"]);const r=Object(i.n)().collection("views").doc("theme");return n.a.createElement(b.Frame,Object.assign({height:40,width:110,radius:4},a.color.group.primary,{style:{cursor:"pointer"},whileHover:{scale:1.1},shadow:"5px 15px 30px 0px rgba(0,0,0,.20)",onTap:r.set(a)},o),"setTheme")}function w(){const e=Object(i.n)().collection("views").doc("theme"),t=Object(i.o)(e);return n.a.createElement(b.Frame,{backgroundColor:"white",width:"100vw",height:"100vh"},n.a.createElement(b.Stack,{direction:"horizontal",gap:6,alignment:"start"},["GROSS INCOME","TOP SOURCES","TOP PROGRAMS","TOP PROGRAMS","TOP PROGRAMS","TOP PROGRAMS","TOP PROGRAMS"].map(e=>n.a.createElement(b.Frame,Object.assign({key:e,height:40,radius:2,width:110,whileTap:{scale:.95},whileHover:{scale:1.05},style:{fontSize:".7em",cursor:"pointer"}},t.color.group.primary,{shadow:"0px 24px 20px -10px rgba(0,0,0,.2)"}),e))),n.a.createElement(b.Page,{overflow:"visible",shadow:"12px 30px 52px 0px rgba(0,0,0,.2)",center:!0,radius:24,direction:"horizontal",currentPage:0},[{name:"Gross Income"},{name:"Top Soures"},{name:"Top"}].map(e=>n.a.createElement(b.Frame,{key:e.name,backgroundColor:"white",shadow:"5px 15px 50px 0px rgba(0,0,0,.3)"},e.name))),n.a.createElement(f,{bottom:30,center:"x"}))}function v(){return n.a.createElement(n.a.Fragment,null,n.a.createElement(i.b,{fallback:"loading",traceId:"hello"},n.a.createElement(w,null)))}const k=function(){var e=Object(m.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(i.k)(t);case 2:e.sent&&Object(i.g)(e=>e.doc("styles/dashboard"),t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var O=()=>{const e=Object(i.m)();return(e=>Promise.all([Object(i.f)({firebaseApp:e,setup:e=>e().enablePersistence()}),Object(i.j)({firebaseApp:e,setup:e=>e().setMaxUploadRetryTime(1e4)}),Object(i.e)({firebaseApp:e}),Object(i.i)({firebaseApp:e,setup:e=>(e().settings={minimumFetchIntervalMillis:1e4,fetchTimeoutMillis:1e4},e().fetchAndActivate())})]))(e).then(k(e)),n.a.createElement(i.b,{fallback:"loading",traceId:"main-app"},n.a.createElement(v,null))};const x=document.getElementById("root");c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(i.a,{firebaseConfig:{apiKey:"AIzaSyAsce1vZ82rHuTDHXlRE6wtOpeR8fo0vMM",authDomain:"watershed-app.firebaseapp.com",databaseURL:"https://watershed-app.firebaseio.com",projectId:"watershed-app",storageBucket:"watershed-app.appspot.com",messagingSenderId:"478129647871",appId:"1:478129647871:web:b3052cf16d07779fae9cca"}},n.a.createElement(d.a,{fonts:[{font:"Roboto",weights:[400,"400i"]},{font:"Roboto Mono",weights:[400,700]}],subsets:["cyrillic-ext","greek"]}),n.a.createElement(O,null))),x),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="".concat("","/service-worker.js");s?(!function(e,t){fetch(e).then(a=>{const o=a.headers.get("content-type");404===a.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):l(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):l(t,e)})}}()}},[[19,2,3]]]);
//# sourceMappingURL=main.ba771afb.chunk.js.map
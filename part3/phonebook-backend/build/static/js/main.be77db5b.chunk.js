(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{23:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var r=t(1),c=t.n(r),o=t(17),a=t.n(o),u=(t(23),t(18)),i=t(8),s=t(4),d=t(0),l=function(e){return Object(d.jsxs)("div",{children:["filter shown with"," ",Object(d.jsx)("input",{onChange:function(n){return e.setSearchFilter(n.target.value)},value:e.searchFilter||""})]})},j=function(e){return Object(d.jsxs)("form",{onSubmit:e.handleNewPerson,children:[Object(d.jsxs)("div",{children:["name: ",Object(d.jsx)("input",{onChange:e.handleNewName,value:e.newName})]}),Object(d.jsxs)("div",{children:["number:"," ",Object(d.jsx)("input",{onChange:e.handleNewNumber,value:e.newNumber})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.person,t=e.deleteContact;return Object(d.jsxs)("p",{children:[n.name," ",n.number," ",Object(d.jsx)("button",{onClick:t,children:"delete"})]})},f=function(e){var n=e.personsToShow,t=e.deleteContact;return n.length?n.map((function(e,n){return Object(d.jsx)(b,{person:e,deleteContact:function(){return t(e.id)}},e.name)})):"..."},h=t(3),m=t.n(h);m.a.defaults.baseURL="/api/persons";var O=function(e){return m.a.post("/",e).then((function(e){return e.data}))},p=function(){return m.a.get("/").then((function(e){return e.data}))},w=function(e){return m.a.delete("/".concat(e)).then((function(e){return e.data}))},v=function(e,n){return m.a.put("/".concat(e),n).then((function(e){return e.data}))},x=function(e){var n=e.message;return n?Object(d.jsx)("div",{className:"notification ".concat(n.error?"notification--error":""),children:n.msg}):null},g=function(){var e=Object(r.useState)([]),n=Object(s.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(""),a=Object(s.a)(o,2),b=a[0],h=a[1],m=Object(r.useState)(""),g=Object(s.a)(m,2),N=g[0],S=g[1],C=Object(r.useState)(null),k=Object(s.a)(C,2),T=k[0],F=k[1],y=Object(r.useState)(null),L=Object(s.a)(y,2),P=L[0],A=L[1],D=T?t.filter((function(e){return e.name.toLowerCase().includes(T.toLowerCase())})):t;Object(r.useEffect)((function(){p().then((function(e){return c(e)}))}),[]);return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Phonebook"}),Object(d.jsx)(x,{message:P}),Object(d.jsx)(l,{setSearchFilter:F,searchFilter:T}),Object(d.jsx)("h2",{children:"Add a new"}),Object(d.jsx)(j,{handleNewName:function(e){var n=e.target.value;h(n)},handleNewNumber:function(e){var n=e.target.value;S(n)},handleNewPerson:function(e){e.preventDefault();var n,r=(n=b,t.find((function(e){return e.name===n}))),o=r&&window.confirm("".concat(r.name," is already added to phonebook, replace the old number with a new one?"));if(r)return o&&v(r.id,Object(i.a)(Object(i.a)({},r),{},{number:N})).then((function(e){c(t.map((function(n){return n.id!==r.id?n:e}))),A({msg:"Updated ".concat(r.name)}),setTimeout((function(){return A(null)}),5e3)})).catch((function(e){A({msg:e.response.data.error,error:!0}),setTimeout((function(){return A(null)}),5e3)})),h(""),void S("");O({name:b,number:N}).then((function(e){c([].concat(Object(u.a)(t),[e])),A({msg:"Added ".concat(e.name)}),setTimeout((function(){return A(null)}),5e3)})).catch((function(e){A({msg:e.response.data.error,error:!0}),setTimeout((function(){return A(null)}),5e3),console.error(e.response.data)})),h(""),S("")},newName:b,newNumber:N}),Object(d.jsx)("h2",{children:"Numbers"}),Object(d.jsx)(f,{personsToShow:D,deleteContact:function(e){var n=t.find((function(n){return n.id===e}));console.log(n),window.confirm("Delete ".concat(n.name,"?"))&&w(e).then((function(){c(t.filter((function(n){return n.id!==e})))}))}})]})};a.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(g,{})}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.be77db5b.chunk.js.map
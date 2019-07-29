(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=t(2),l=function(e){var n=e.persons,t=e.filter,a=e.handleDelete,o=n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h2",null,"Numbers"),o.map(function(e,n){return r.a.createElement("div",{key:e.id},e.name," ",e.number,r.a.createElement("button",{value:e.id,onClick:a},"delete"))}))},i=function(e){var n=e.newFilter,t=e.onChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.onSubmit,t=e.newName,a=e.onNameChange,o=e.newNumber,c=e.onNumberChange;return r.a.createElement("div",null,r.a.createElement("h2",null,"Add a new"),r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:o,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},d=t(3),f=t.n(d),s="/api/persons",b=function(){return f.a.get(s).then(function(e){return e.data})},h=function(e){return f.a.post(s,e).then(function(e){return e.data})},v=function(e,n){return f.a.put("".concat(s,"/").concat(e),n).then(function(e){return e.data})},g=function(e){return f.a.delete("".concat(s,"/").concat(e)).then(function(e){return e.data})},p=function(e){var n=e.message,t={color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return e.isError&&(t.color="red"),null===n?null:r.a.createElement("div",{className:"notification",style:t},n)},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),d=Object(u.a)(c,2),f=d[0],s=d[1],E=Object(a.useState)(""),w=Object(u.a)(E,2),j=w[0],O=w[1],C=Object(a.useState)(""),S=Object(u.a)(C,2),N=S[0],y=S[1],k=Object(a.useState)(null),x=Object(u.a)(k,2),D=x[0],A=x[1],B=Object(a.useState)(!1),F=Object(u.a)(B,2),J=F[0],L=F[1];Object(a.useEffect)(function(){b().then(function(e){o(e)})},[]);var R=function(e,n){A(e),L(n),setTimeout(function(){A(null)},5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:D,isError:J}),r.a.createElement(i,{newFilter:N,onChange:function(e){y(e.target.value)}}),r.a.createElement(m,{onSubmit:function(e){e.preventDefault();var n=!0,a=!1;t.forEach(function(e,t,r){e.name===f&&(n=!1,a=window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?")))});var r={name:f,number:j};if(n&&(console.log("add"),h(r).then(function(e){o(t.concat(e)),s(""),O(""),R("Added ".concat(e.name),!1)}).catch(function(e){console.log(e.response.data),R(e.response.data.error,!0)})),a){console.log("overwrite");var c=t.find(function(e){return e.name===f}).id;v(c,r).then(function(e){console.log(e),o(t.map(function(n){return n.id!==c?n:e})),s(""),O(""),R("Modified ".concat(e.name),!1)})}},newName:f,onNameChange:function(e){s(e.target.value)},newNumber:j,onNumberChange:function(e){O(e.target.value)}}),r.a.createElement(l,{persons:t,filter:N,handleDelete:function(e){var n=e.target.value,a=t.find(function(e){return e.id===n}).name,r=window.confirm("Delete ".concat(a));console.log("remove",n),r&&g(n).then(function(e){var r=t.filter(function(e){return e.id!==n});o(r),R("Removed ".concat(a),!1)}).catch(function(e){R("".concat(a," was already deleted from the server"),!0),o(t.filter(function(e){return e.id!==n}))})}}))};c.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.e3720a57.chunk.js.map
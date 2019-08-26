(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{18:function(e,t,a){e.exports=a(41)},23:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(12),o=a.n(l),r=a(13),d=a(14),c=a(16),u=a(15),s=a(17),p=(a(23),a(2)),m=a.n(p),h=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={selectedId:-1,data:[],id:0,message:null,intervalIsSet:!1,idToDelete:null,idToUpdate:-1,updateToApply:"",objectToUpdate:null},a.getDataFromDb=function(){fetch("/api/getData").then(function(e){return e.json()}).then(function(e){return a.setState({data:e.data})})},a.putDataToDB=function(e){for(var t=a.state.data.map(function(e){return e.id}),n=0;t.includes(n);)++n;m.a.post("/api/putData",{id:n,message:e}).then(function(){a.getDataFromDb()})},a.deleteFromDB=function(e){parseInt(e);var t=null;a.state.data.forEach(function(a){a.id==e&&(t=a._id)}),m.a.delete("/api/deleteData",{data:{id:t}}).then(function(){a.getDataFromDb()})},a.updateDB=function(e,t){var n=null;parseInt(e),a.state.data.forEach(function(t){t.id==e&&(n=t._id)}),m.a.post("/api/updateData",{id:n,update:{message:t}}).then(function(){a.setState({idToUpdate:-1}),a.getDataFromDb()})},a.editData=function(e,t){a.setState({idToUpdate:e,updateToApply:t})},a}return Object(s.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.getDataFromDb()}},{key:"componentWillUnmount",value:function(){this.state.intervalIsSet&&(clearInterval(this.state.intervalIsSet),this.setState({intervalIsSet:null}))}},{key:"render",value:function(){var e=this,t=this.state.data;return i.a.createElement("div",null,i.a.createElement("div",{style:{padding:"10px"}},i.a.createElement("input",{type:"text",onChange:function(t){return e.setState({message:t.target.value})},placeholder:"add something in the database",style:{width:"200px",margin:5}}),i.a.createElement("button",{style:{margin:5},onClick:function(){return e.putDataToDB(e.state.message)}},"ADD")),i.a.createElement("div",{style:{padding:"10px"}},i.a.createElement("input",{type:"text",style:{width:"200px",margin:5},onChange:function(t){return e.setState({idToDelete:t.target.value})},placeholder:"put id of item to delete here"}),i.a.createElement("button",{style:{margin:5},onClick:function(){return e.deleteFromDB(e.state.idToDelete)}},"DELETE")),i.a.createElement("div",{style:{height:60}}),i.a.createElement("table",{className:"fixed_header"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Id"),i.a.createElement("th",null,"Message"),i.a.createElement("th",null,"Operations"))),i.a.createElement("tbody",null,t.map(function(t){return i.a.createElement("tr",{key:t.id},i.a.createElement("td",null,t.id+" : "+t._id),i.a.createElement("td",null,t.id==e.state.idToUpdate?i.a.createElement("input",{className:"edit-input",focus:"true",type:"text",value:e.state.updateToApply,onChange:function(t){return e.setState({updateToApply:t.target.value})}}):t.message),i.a.createElement("td",null,i.a.createElement("button",{style:{margin:5},onClick:function(){return e.deleteFromDB(t.id)}},"Delete"),t.id!=e.state.idToUpdate&&i.a.createElement("button",{style:{margin:5},onClick:function(){e.editData(t.id,t.message)}},"Edit"),t.id==e.state.idToUpdate&&i.a.createElement("button",{style:{margin:5},onClick:function(){e.updateDB(e.state.idToUpdate,e.state.updateToApply)}},"Update")))}))),i.a.createElement("div",{className:"vbox",style:{margin:10,width:400,height:300,border:"1px solid silver",alignItems:"center",justifyContent:"center"}},i.a.createElement("div",{alignSelf:!0},"abc")))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,1,2]]]);
//# sourceMappingURL=main.ab579e04.chunk.js.map
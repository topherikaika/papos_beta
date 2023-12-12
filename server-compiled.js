(()=>{var e={860:e=>{"use strict";e.exports=require("express")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},109:e=>{"use strict";e.exports=require("sanitize-html")}},t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}(()=>{const{MongoClient:e,ObjectId:t}=o(13),n=o(860),s=o(738)(),i=o(109);let r;const a=n();a.set("view engine","ejs"),a.set("views","./views"),a.use(n.static("public")),a.use(n.json()),a.use(n.urlencoded({extended:!1})),a.get("/",(async(e,t)=>{const o=await r.collection("recipes").find().toArray();console.log(o),t.render("home",{allRecipes:o})})),a.use((function(e,t,o){t.set("WWW-Authenticate","Basic realm='Our MERN App'"),"Basic YWRtaW46YWRtaW4="==e.headers.authorization?o():(console.log(e.headers.authorization),t.status(401).send("Try again"))})),a.get("/admin",((e,t)=>{t.render("admin")})),a.get("/api/recipes",(async(e,t)=>{const o=await r.collection("recipes").find().toArray();t.json(o)})),a.post("/create-recipe",s.single("photo"),(function(e,t,o){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.type&&(e.body.type=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:i(e.body.name.trim(),{allowedTags:[],allowedAttributes:{}}),type:i(e.body.type.trim(),{allowedTags:[],allowedAttributes:{}})},o()}),(async(e,o)=>{console.log(e.body);const n=await r.collection("recipes").insertOne(e.cleanData),s=await r.collection("recipes").findOne({_id:new t(n.insertedId)});o.send(s)})),async function(){const t=new e("mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin");await t.connect(),r=t.db(),a.listen(3e3)}()})()})();
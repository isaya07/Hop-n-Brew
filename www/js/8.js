webpackJsonp([8],{WzMt:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("eo9B"),i={props:{formData:s.a},computed:{batchSize:{get:function(){return this.formData.getBatchSize(this.$config.volUnitie)},set:function(e){this.formData.setBatchSize(e,this.$config.volUnitie)}},boilSize:{get:function(){return this.formData.getBoilSize(this.$config.volUnitie)},set:function(e){this.formData.setBoilSize(e,this.$config.volUnitie)}},tunVolume:{get:function(){return this.formData.getTunVolume(this.$config.volUnitie)},set:function(e){this.formData.setTunVolume(e,this.$config.volUnitie)}},tunWeight:{get:function(){return this.formData.getTunWeight(this.$config.weightUnitie)},set:function(e){this.formData.setTunWeight(e,this.$config.weightUnitie)}},topUpWater:{get:function(){return this.formData.getTopUpWater(this.$config.volUnitie)},set:function(e){this.formData.setTopUpWater(e,this.$config.volUnitie)}},turbChillerLoss:{get:function(){return this.formData.getTurbChillerLoss(this.$config.volUnitie)},set:function(e){this.formData.setTurbChillerLoss(e,this.$config.volUnitie)}},lauterDeadspace:{get:function(){return this.formData.getLauterDeadspace(this.$config.volUnitie)},set:function(e){this.formData.setLauterDeadspace(e,this.$config.volUnitie)}},topUpKettle:{get:function(){return this.formData.getTopUpKettle(this.$config.volUnitie)},set:function(e){this.formData.setTopUpKettle(e,this.$config.volUnitie)}}},methods:{validateBeforeSubmit:function(){var e=this;this.$validator.validateAll().then(function(){e.$emit("validated",!0,e.formData)}).catch(function(){e.$emit("validated",!1,e.formData)})}},mounted:function(){var e=this;this.$bus.$on("validateForm",function(){e.validateBeforeSubmit()})}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",[a("div",{staticClass:"grid-4"},[e._m(0),e._v(" "),a("div",{staticClass:"col is-1-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.name,expression:"formData.name"},{name:"validate",rawName:"v-validate",value:"required|myAlpha",expression:"'required|myAlpha'"}],class:{input:!0,"is-alert":e.errors.has("name")},attrs:{name:"name",type:"text",placeholder:"Nom"},domProps:{value:e.formData.name},on:{input:function(t){t.target.composing||e.$set(e.formData,"name",t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("name"),expression:"errors.has('name')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("name")))])]),e._v(" "),a("div",{staticClass:"col is-1-4"},[a("label",{},[e._v("\n        CalcBoilVolume\n        "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.calcBoilVolume,expression:"formData.calcBoilVolume"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.formData.calcBoilVolume)?e._i(e.formData.calcBoilVolume,null)>-1:e.formData.calcBoilVolume},on:{change:function(t){var a=e.formData.calcBoilVolume,s=t.target,i=!!s.checked;if(Array.isArray(a)){var r=e._i(a,null);s.checked?r<0&&(e.formData.calcBoilVolume=a.concat([null])):r>-1&&(e.formData.calcBoilVolume=a.slice(0,r).concat(a.slice(r+1)))}else e.$set(e.formData,"calcBoilVolume",i)}}})])])]),e._v(" "),a("div",{staticClass:"grid-4"},[e._m(1),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.batchSize,expression:"batchSize"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("batchSize")},attrs:{name:"batchSize",type:"text"},domProps:{value:e.batchSize},on:{input:function(t){t.target.composing||(e.batchSize=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("batchSize"),expression:"errors.has('batchSize')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("batchSize")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.volUnitie)+"\n    ")]),e._v(" "),e._m(2),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.boilSize,expression:"boilSize"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("boilSize")},attrs:{name:"boilSize",type:"text"},domProps:{value:e.boilSize},on:{input:function(t){t.target.composing||(e.boilSize=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("boilSize"),expression:"errors.has('boilSize')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("boilSize")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.volUnitie)+"\n    ")])]),e._v(" "),a("div",{staticClass:"grid-4"},[e._m(3),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.tunVolume,expression:"tunVolume"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("tunVolume")},attrs:{name:"tunVolume",type:"text"},domProps:{value:e.tunVolume},on:{input:function(t){t.target.composing||(e.tunVolume=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("tunVolume"),expression:"errors.has('tunVolume')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("tunVolume")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.volUnitie)+"\n    ")]),e._v(" "),e._m(4),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.tunWeight,expression:"tunWeight"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("tunWeight")},attrs:{name:"tunWeight",type:"text"},domProps:{value:e.tunWeight},on:{input:function(t){t.target.composing||(e.tunWeight=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("tunWeight"),expression:"errors.has('tunWeight')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("tunWeight")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.weightUnitie)+"\n    ")])]),e._v(" "),a("div",{staticClass:"grid-4"},[e._m(5),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.tunSpecificHeat,expression:"formData.tunSpecificHeat"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("tunSpecificHeat")},attrs:{name:"tunSpecificHeat",type:"text"},domProps:{value:e.formData.tunSpecificHeat},on:{input:function(t){t.target.composing||e.$set(e.formData,"tunSpecificHeat",t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("tunSpecificHeat"),expression:"errors.has('tunSpecificHeat')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("tunSpecificHeat")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      cal/g/°C\n    ")]),e._v(" "),e._m(6),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.topUpWater,expression:"topUpWater"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("topUpWater")},attrs:{name:"topUpWater",type:"text"},domProps:{value:e.topUpWater},on:{input:function(t){t.target.composing||(e.topUpWater=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("topUpWater"),expression:"errors.has('topUpWater')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("topUpWater")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.volUnitie)+"\n    ")])]),e._v(" "),a("div",{staticClass:"grid-4"},[e._m(7),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.turbChillerLoss,expression:"turbChillerLoss"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("turbChillerLoss")},attrs:{name:"turbChillerLoss",type:"text"},domProps:{value:e.turbChillerLoss},on:{input:function(t){t.target.composing||(e.turbChillerLoss=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("turbChillerLoss"),expression:"errors.has('turbChillerLoss')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("turbChillerLoss")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.volUnitie)+"\n    ")]),e._v(" "),e._m(8),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.evapRate,expression:"formData.evapRate"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("evapRate")},attrs:{name:"evapRate",type:"text"},domProps:{value:e.formData.evapRate},on:{input:function(t){t.target.composing||e.$set(e.formData,"evapRate",t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("evapRate"),expression:"errors.has('evapRate')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("evapRate")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      %/hours\n    ")])]),e._v(" "),a("div",{staticClass:"grid-4"},[e._m(9),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.boilTime,expression:"formData.boilTime"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("boilTime")},attrs:{name:"boilTime",type:"text"},domProps:{value:e.formData.boilTime},on:{input:function(t){t.target.composing||e.$set(e.formData,"boilTime",t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("boilTime"),expression:"errors.has('boilTime')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("boilTime")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.timeUnitie)+"\n    ")]),e._v(" "),e._m(10),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.lauterDeadspace,expression:"lauterDeadspace"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("lauterDeadspace")},attrs:{name:"lauterDeadspace",type:"text"},domProps:{value:e.lauterDeadspace},on:{input:function(t){t.target.composing||(e.lauterDeadspace=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("lauterDeadspace"),expression:"errors.has('lauterDeadspace')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("lauterDeadspace")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.volUnitie)+"\n    ")])]),e._v(" "),a("div",{staticClass:"grid-4"},[e._m(11),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.topUpKettle,expression:"topUpKettle"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("topUpKettle")},attrs:{name:"topUpKettle",type:"text"},domProps:{value:e.topUpKettle},on:{input:function(t){t.target.composing||(e.topUpKettle=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("topUpKettle"),expression:"errors.has('topUpKettle')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("topUpKettle")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      "+e._s(e.$config.volUnitie)+"\n    ")]),e._v(" "),e._m(12),e._v(" "),a("div",{staticClass:"col is-1-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.hopUtilization,expression:"formData.hopUtilization"},{name:"validate",rawName:"v-validate",value:"required|myNumeric",expression:"'required|myNumeric'"}],class:{input:!0,"is-alert":e.errors.has("hopUtilization")},attrs:{name:"hopUtilization",type:"text"},domProps:{value:e.formData.hopUtilization},on:{input:function(t){t.target.composing||e.$set(e.formData,"hopUtilization",t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("hopUtilization"),expression:"errors.has('hopUtilization')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("hopUtilization")))])]),e._v(" "),a("div",{staticClass:"col is-1-8"},[e._v("\n      %\n    ")])]),e._v(" "),a("div",{staticClass:"grid-4"},[e._m(13),e._v(" "),a("div",{staticClass:"col is-5-6"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.formData.notes,expression:"formData.notes"},{name:"validate",rawName:"v-validate",value:"myAlpha",expression:"'myAlpha'"}],class:{input:!0,"is-alert":e.errors.has("notes")},attrs:{name:"notes",type:"text"},domProps:{value:e.formData.notes},on:{input:function(t){t.target.composing||e.$set(e.formData,"notes",t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("notes"),expression:"errors.has('notes')"}],staticClass:"form-message is-alert"},[e._v(e._s(e.errors.first("notes")))])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"midle"},[this._v("Name")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Batch Size")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Boil Size")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Tun Volume")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Tun Weight")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Tun SpecificHeat")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("topUpWater")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Turb Chiller Loss")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Evap Rate")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Boil Time")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Lauter Dead Space")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Top Up Kettle")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-4"},[t("label",{staticClass:"label"},[this._v("Hop Utilization")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col is-1-6"},[t("label",{staticClass:"midle"},[this._v("Notes")])])}]},o=a("VU/8")(i,r,!1,null,null,null).exports,l={name:"equipment",components:{List:a("22um").a,EquipmentsEditForm:o},data:function(){return{type:"equipment",form:"card",getNew:function(e){return new s.a(e)},getStatic:function(e){return s.a.fromBeerXml(e)},formdata:null}},methods:{validated:function(e,t){console.log("test"),this.$bus.$emit("validated",e,t)},updateFormData:function(e){this.formdata=e}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("list",{attrs:{card:!0,type:e.type,newFunc:e.getNew,staticFunc:e.getStatic},on:{dataForm:e.updateFormData}},[a("equipments-edit-form",{attrs:{formData:e.formdata},on:{validated:e.validated}})],1)],1)},staticRenderFns:[]},c=a("VU/8")(l,n,!1,null,null,null);t.default=c.exports}});
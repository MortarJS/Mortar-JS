"use strict";var _extends=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},BaseStore=require("./BaseStore"),AppDispatcher=require("../dispatcher/AppDispatcher"),AppActionConstants=require("../constants/AppActionConstants"),ActionTypes=AppActionConstants.ActionTypes.alerts,_alert={isError:!1,actionOrError:"",message:""},AlertStore=_extends({},BaseStore,{isError:function(){return _alert.isError},getAlert:function(){return _alert}});AlertStore.dispatchToken=AppDispatcher.register(function(r){switch(r.type){case ActionTypes.ALERT_ERROR:_alert.isError=!0,_alert.actionOrError="Error: "+r.actionOrError,_alert.message=r.message,AlertStore.emitChange();break;case ActionTypes.ALERT_SUCCESS:_alert.isError=!1,_alert.actionOrError=r.actionOrError,_alert.message=r.message,AlertStore.emitChange()}}),module.exports=AlertStore;
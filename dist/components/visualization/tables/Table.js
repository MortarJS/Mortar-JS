"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},Rows=require("./Rows"),React=require("react"),Modal=require("../../global/modal/ModalContainer"),SumRow=require("./SumRow"),Spinner=require("../../global/spinner/Spinner"),Tooltip=require("../../global/tooltip/Tooltip"),SortButton=require("./SortButton"),Table=React.createClass({displayName:"Table",propTypes:{data:React.PropTypes.array.isRequired,dataKeys:React.PropTypes.object.isRequired,options:React.PropTypes.shape({actionableRows:React.PropTypes.bool,draggable:React.PropTypes.bool,actionsCallback:React.PropTypes.func,bulkActions:React.PropTypes.bool,summableRows:React.PropTypes.array,tooltips:React.PropTypes.objectOf(React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.shape({text:React.PropTypes.string.isRequired,width:React.PropTypes.string.isRequired,height:React.PropTypes.string.isRequired,orientation:React.PropTypes.string.isRequired})]))}).isRequired,actionCreator:React.PropTypes.object},getDefaultProps:function(){return{data:[]}},getInitialState:function(){return{selected:!1}},componentDidMount:function(){},columns:0,buildTableColumns:function(){var e=Object.keys(this.props.dataKeys).map(function(e,t){return React.createElement("th",{key:t},e," ",this._shouldRenderInfoIcon(e,this.props.dataKeys[e]))}.bind(this));if(this.props.options&&this.props.options.actionableRows&&e.push(React.createElement("th",{key:99},"Actions")),this.props.options&&this.props.options.bulkActions){var t=this.state.selected;e.unshift(React.createElement("th",{key:101},React.createElement("input",{type:"checkbox",value:t,onChange:this.toggleAllCheckboxes})))}return this.columns=e.length,React.createElement("thead",null,React.createElement("tr",null,e))},toggleAllCheckboxes:function(){var e=!this.state.selected;this.setState({selected:e}),this.props.data.forEach(function(t){t.selected=e}),this.props.options.actionsCallback("selectAllRows",this.props.data)},_shouldRenderInfoIcon:function(e,t){var o=this.props.options||{},a=[];if("object"===_typeof(o.tooltips)&&o.tooltips.hasOwnProperty(e)){var s=this.props.options.tooltips[e],r=void 0,n=void 0,i=void 0,p=void 0,l=void 0;"string"==typeof s?(r=s,l="top",n=s.length,i="250px",p=18+17*Math.ceil(n/18)+"px"):(r=s.text,i=s.width,p=s.height,l=s.orientation),a.push(React.createElement(Tooltip,{key:e,text:r,width:i,height:p,orientation:l},React.createElement("button",{key:e,className:"icon-info-circle pull-right mortar-tooltip-icon",type:"button","data-key":e})))}return"[object Array]"===Object.prototype.toString.call(o.sortable)&&o.sortable.indexOf(t)>-1&&a.push(React.createElement(SortButton,{key:o.sortable.indexOf(t),actionsCallback:o.actionsCallback,sortProperty:t})),a},_shouldLoadSpinner:function(){var e=this.props.options||{};return e.hideSpinner?!!e.hideSpinner&&React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",{colSpan:this.columns,className:"table-empty-row"},e.emptyText||"No results :(."))):React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",{colSpan:this.columns},React.createElement(Spinner,{type:"spinner",text:"Loading..",classes:"table-loader"}))))},render:function(){return React.createElement("div",{className:"table-modal-container"},React.createElement("table",{className:"table-data table table-bordered table-hover table-striped"},this.buildTableColumns(),this.props.data.length<1&&this._shouldLoadSpinner(),this.props.data.length>=1&&React.createElement(Rows,{data:this.props.data,dataKeys:this.props.dataKeys,options:this.props.options,actionCreator:this.props.actionCreator}),this.props.options.summableRows&&React.createElement(SumRow,{key:"sumRow",data:this.props.data,dataKeys:this.props.dataKeys,options:this.props.options,rows:this.props.options.summableRows})))}});module.exports=Table;
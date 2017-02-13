"use strict";var React=require("react"),classNames=require("classnames"),CharacterCount=require("./CharacterCount"),FormUtility=require("./utils/FormUtilityMixin"),TextArea=React.createClass({displayName:"TextArea",propTypes:{formKey:React.PropTypes.string,limit:React.PropTypes.number,label:React.PropTypes.string,placeholder:React.PropTypes.string,helpText:React.PropTypes.string,disabled:React.PropTypes.bool,fieldKey:React.PropTypes.string.isRequired,required:React.PropTypes.bool,changeCallback:React.PropTypes.func,rows:React.PropTypes.number},mixins:[FormUtility],getInitialState:function(){return{isValid:!0,renderCharacterCounter:!1}},handleInput:function(e){this.props.changeCallback(this.props.fieldKey,e.target.value,this)},handleBlur:function(e){this.setState({renderCharacterCounter:!1})},handleFocus:function(e){"undefined"!=typeof this.props.limit&&this.setState({renderCharacterCounter:!0})},render:function(){var e=classNames({"form-group":!0,"has-error":this._checkFieldIsValid(),disabled:this.props.disabled||!1});return React.createElement("div",{className:e},React.createElement("label",{className:"control-label"},this.props.label),React.createElement("textarea",{className:"mortar-textarea form-control "+this.props.formKey+"-"+this.props.fieldKey,rows:this.props.rows||3,placeholder:this.props.placeholder||"",disabled:this.props.disabled,onChange:this.handleInput,onFocus:this.handleFocus,onBlur:this.handleBlur,value:this._fieldValue()||""}),this.state.renderCharacterCounter&&React.createElement(CharacterCount,{input:this._fieldValue(),limit:this.props.limit}),this._shouldRenderHelpBlock(this.props.helpText))}});module.exports=TextArea;
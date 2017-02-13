"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_=require("lodash"),React=require("react"),validator=require("validator"),isEmpty=require("../../../utils/isEmpty"),Row=require("../../page-structure/Row"),Column=require("../../page-structure/Column"),FormActions=require("../../../actions/FormActionCreators"),FormValidator=require("./FormValidator"),FormStore=require("../../../stores/FormStore"),Form=React.createClass({displayName:"Form",propTypes:{formKey:React.PropTypes.string.isRequired,bindResource:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.array]).isRequired,onSubmit:React.PropTypes.func,schema:React.PropTypes.func,children:React.PropTypes.oneOfType([React.PropTypes.array,React.PropTypes.object])},getInitialState:function(){return{isValid:!0,boundResource:{}}},boundResource:{},validator:null,formFields:{},componentDidMount:function(){var e=this;e.props.schema&&(e.validator=new FormValidator(e.props.schema)),e.setState({boundResource:e.props.bindResource},function(){!isEmpty(e.state.boundResource)&&e.props.schema?e.validateAndRegisterFormAgainstSchema():FormActions.registerForm(e.props.formKey,e.props.bindResource)})},componentWillReceiveProps:function(e){this.boundResource=e.bindResource,this.setState({boundResource:e.bindResource})},componentWillMount:function(){this.traverseChildren(this.props.children)},componentWillUnmount:function(){this.boundResource={}},handleChange:function(e,r){var o=this;if(o.props.schema){var t=_.cloneDeep(FormStore.getResource(o.props.formKey));_.set(t,e,r);var i=o.validator.validate(t);if(i){var n=o.getNestedFieldKeys(i);n.forEach(function(e){FormActions.editField(o.props.formKey,e,_.get(t,e),!1)}),n.includes(e)||FormActions.editField(o.props.formKey,e,r,!0)}else FormActions.editField(o.props.formKey,e,r,!0)}else{var s=o.validate(e,r);FormActions.editField(o.props.formKey,e,r,s)}},validateAndRegisterFormAgainstSchema:function(){var e,r=this,o={},t=this.state.boundResource,i=r.validator.validate(t);if(i){var n=r.getNestedFieldKeys(i);e=!1,n.forEach(function(e){o[e]=!1})}FormActions.registerForm(this.props.formKey,t,o,e)},getNestedFieldKeys:function(e){var r=this;return Object.keys(e).map(function(o){return"object"===_typeof(e[o])?r.getNestedFieldKeys(e[o]).map(function(e){return o+"."+e}):o}).reduce(function(e,r){return e.concat(r)},[])},validate:function(e,r){var o=this.formFields[e];if(o.required&&(!r||r.length<1))return!1;if(!o.validations)return!0;var t=!0;return(r||o.required===!0)&&o.validations.split(",").forEach(function(e){var o=e.split(":"),i=o.shift();o=o.map(function(e){return JSON.parse(e)}),o=[r].concat(o),validator[i].apply(validator,o)||(t=!1)}),t},validateForm:function(){this.setState({isValid:FormStore.isFormValid()})},traverseChildren:function(e){var r=this;return React.Children.map(e,function(o){if(!o||!o.props)return o;var t=void 0,i=FormStore.getResource(r.props.formKey)||{};return t=e.props&&"function"==typeof e.props.changeCallback?e.props.changeCallback:r.handleChange,o.props.fieldKey&&(o=React.cloneElement(o,{changeCallback:t,bindResource:r.props.bindResource,formKey:r.props.formKey,resource:i}),r.formFields[o.props.fieldKey]={validations:o.props.validations||!1,required:!!o.props.required,isValid:FormStore.isFieldValid(r.props.formKey,o.props.fieldKey)}),o.props.children&&(o=React.cloneElement(o,{children:r.traverseChildren(o.props.children)})),o})},handleSubmit:function(e){e.preventDefault(),this.props.onSubmit&&this.props.onSubmit(e)},render:function(){return React.createElement("form",{role:"form",onSubmit:this.handleSubmit},this.traverseChildren(this.props.children))}});Form.Row=Row,Form.Column=Column,Form.Submit=require("./Submit"),Form.Input=require("./Input"),Form.TextArea=require("./TextArea"),Form.TypeAheadInput=require("./TypeAheadInput"),Form.File=require("./FileInput"),Form.Toggle=require("./Toggle"),Form.Checkbox=require("./Checkbox"),Form.SelectBox=require("./SelectBox"),Form.RadioButtons=require("./RadioButtons"),Form.DropdownSelect=require("./DropdownSelect"),module.exports=Form;
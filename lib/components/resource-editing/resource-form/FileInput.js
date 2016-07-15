var React       = require('react');
var classNames  = require('classnames');

var FormUtility = require('./utils/FormUtilityMixin');

/**
 * A file input component to handle uploading files
 * Very slightly modified from https://github.com/paramaggarwal/react-dropzone
 *
 * @class FileInput
 *
 * @prop {object}   options
 * @prop {function} onFileSelect
 * @prop {string}   label
 * @prop {string}   helpText
 * @prop {string}   accept
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 */
var FileInput = React.createClass({
	propTypes: {
		options: React.PropTypes.shape({
			multiple    : React.PropTypes.bool,
			height      : React.PropTypes.number,
			width       : React.PropTypes.number,
			srcProperty : React.PropTypes.string,
			b64encoded  : React.PropTypes.bool,
			bgImage     : React.PropTypes.string,
			hidePreview : React.PropTypes.bool
		}),
		onFileSelect   : React.PropTypes.func,
		label          : React.PropTypes.string,
		helpText       : React.PropTypes.string,
		accept         : React.PropTypes.string.isRequired,
		fieldKey       : React.PropTypes.string,
		changeCallback : React.PropTypes.func
	},

	mixins: [FormUtility],

	/**
	 * getInitialState
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @return {object} The initial state of this component
	 */
	getInitialState: function () {
		return {
			dragIsActive   : false,
			fileIsUploaded : false,
			imageUrl       : null,
			files          : [],
			filePreviews   : [],
			fieldValue     : []
		};
	},

	/**
	 * Opens the file input dialaog window
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @return {null}
	 */
	open: function () {
		// "Click" the file input to open the upload window
		this.refs.fileInput.click();
	},

	/**
	 * Handles when a dragged item leaves the component bounds and updates state
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @return {null}
	 */
	handleDragLeave: function () {
		this.setState({
			dragIsActive: false
		});
	},

	/**
	 * Handles when a dragged item enters the component bounds and updates state
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @param {event} event The event triggering this event.
	 *
	 * @return {null}
	 */
	handleDragOver: function (event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';

		this.setState({
			dragIsActive: true
		});
	},

	/**
	 * Calls the FormUtilityMixin's componentDidMount function to handle input changes.
	 * @see {@link FormUtility}
	 *
	 * @return {null}
	 */
	componentDidMount: function() {
		this._componentDidMount();
	},

	/**
	 * Calls the FormUtilityMixin's componentWillUnmount function to handle removing change listeners
	 * @see {@link FormUtility}
	 *
	 * @return {null}
	 */
	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	/**
	 * Handles the dropping of a file into this component.
	 * After drop, handles encoding the file to the proper encoding standard.
	 *
	 * @memberOf FormComponents.FileInput
	 * @param {event} event The drop event.
	 * @return {null}
	 */
	handleFiles: function (event) {
		event.preventDefault();

		this.setState({
			dragIsActive: false
		});

		let files;
		if (event.dataTransfer) {
			files = event.dataTransfer.files;
		} else if (event.target) {
			files = event.target.files;
		}

		let totalFiles = this.props.options.multiple ? files.length : 1;
		for (var i = 0; i < totalFiles; i++) {
			files[i].preview = URL.createObjectURL(files[i]);
		}

		files = Array.prototype.slice.call(files, 0, totalFiles);
		var filePreviews = [];

		// Base64 encode files if we need to
		if (typeof this.props.options !== 'undefined' && this.props.options.b64encoded) {
			var self          = this,
				changeHandler = this._handleChange;

			// Read each file of array, b64 encode, and bubble up to file select handler
			files.forEach(function (file, index) {
				var reader = new FileReader();

				reader.onloadend = function (e) {
					var binary = e.target.result;
					files[index] = btoa(binary);
					filePreviews[index] = file.preview;

					// @todo this handler should send to FormStore
					self.setState({
						files        : files.length > 1 ? files : files[0],
						filePreviews : filePreviews
					}, function () {
						changeHandler();
					});
				};

				reader.readAsBinaryString(file);
			});
		} else {
			if (this.props.options && this.props.options.multiple) {
				let currentFiles = this.state.fieldValue || [],
					joinedFiles = [...currentFiles, ...files].filter(f => !!f);

				this._handleChange(joinedFiles);
			} else {
				this._handleChange(files);
			}
		}
	},

	/**
	 * Handles any changes made to the bound resource at the passed field key.
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @return {null}
	 */
	_handleChange: function (value) {
		this.props.changeCallback(this.props.fieldKey, value, this);
	},

	/**
	 * Decides what background should be shown on the file upload component.
	 * Either the uploaded image's preview, the file upload status, or the help text.
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @return {jsx}
	 */
	_shouldRenderBackground: function () {
		if (this.state.files.length > 0 || this.state.files instanceof File) {
			// Hide preview and just show text
			if (this.props.options && this.props.options.hidePreview) {
				return <span>File(s) selected.</span>;
			} else if (this.state.filePreviews.length > 0) {
				// Show the image preview
				return <img src={this.state.filePreviews[0]} height={this.props.options.height - 5} width={this.props.options.width - 5} />;
			}
		}

		// Show the background image
		if (this.props.options && typeof this.props.options.bgImage !== 'undefined') {
			// If we're passing through a b64 string for a background image, we need to handle it specially
			var source = this.props.options.b64encoded && this.props.options.bgIsB64 ?
			'data:image/png;base64,' + this.props.options.bgImage :
				this.props.options.bgImage;

			return <img src={source} height={this.props.options.height - 5} width={this.props.options.width - 5} />;
		}

		// Show default text
		return <span>Drag and drop or browse for files to upload.</span>;
	},

	/**
	 * _buildAcceptString
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @return {null}
	 */
	_buildAcceptString: function () {
		// Default types
		var types = {audio: 'audio/*', video: 'video/*', image: 'image/*'};

		return types.hasOwnProperty(this.props.accept) ? types[this.props.accept] : this.props.accept;
	},

	removeUpload: function(index) {
		let files = this.state.fieldValue.slice(0); //clone the fieldValue so we don't alter state directly
		files.splice(index, 1);

		this._handleChange(files);
	},

	multipleFilePreview: function() {
		let hidePreview = this.props.options && this.props.options.hidePreview ? true : false;
		if (this.state.fieldValue &&
			this.state.fieldValue.length &&
			! hidePreview) {

			let images = this.state.fieldValue,
				options = this.props.options,
				height = options && options.height ? options.height : 200,
				width = options && options.width ? options.width : 200;

			return (
				<div id="mortar-file-upload-preview-container">
					{images.map((img, i) => {
						let source;

						if (img.preview) {
							source = img.preview;
						} else if (options.srcProperty) {
							source = img[options.srcProperty];
						} else {
							source = img;
						}

						return (
							<div key={i} className="mortar-file-upload-preview-wrapper">
								<a href="javascript:void(0)" className="mortar-file-upload remove-preview icon icon-times" onClick={this.removeUpload.bind(this, i)}></a>
								<img className="mortar-file-upload mortar-file-upload-preview" src={source} width={width} height={height} onError={function() { arguments[0].target.src = '../../../../assets/document.svg'; }} />
							</div>
						);
					})}
				</div>
			);
		}

		return null;
	},

	/**
	 * Renders the component
	 *
	 * @memberOf FormComponents.FileInput
	 *
	 * @return {jsx}
	 */
	render: function () {
		var classes = classNames({
			'file-upload' : true,
			active        : this.state.dragIsActive
		});

		var style = {
			width       : this.props.options.width || 100,
			height      : this.props.options.height || 100,
			borderStyle : ! this.state.fileIsUploaded ? this.state.dragIsActive ? 'solid' : 'dashed' : ''
		};

		if (this.props.options && this.props.options.multiple) {
			return (
				<div className="upload-file-container">
					<div className={classes} onDragLeave={this.handleDragLeave}
						 onDragOver={this.handleDragOver} onDrop={this.handleFiles}>

						<input className={`mortar-file-upload ${this.props.formKey}-${this.props.fieldKey}`}
							   style={{display: 'none'}}
							   name={this.props.fieldKey}
							   type="file"
							   ref="fileInput"
							   onChange={this.handleFiles}
							   multiple={this.props.options.multiple || false}
							   accept={this._buildAcceptString()} />

						<label className="control-label upload-label"><a onClick={this.open} href="javascript:void(0)">{this.props.label}</a></label>

					</div>
					{typeof this.props.helpText !== 'undefined' && (
						<p className="help=block upload-help-block">{this.props.helpText}</p>
					)}

					{this.multipleFilePreview()}
				</div>
			);
		}

		return (
			<div className="upload-file-container">
				<div className={classes} style={style} onClick={this.open} onDragLeave={this.handleDragLeave}
					 onDragOver={this.handleDragOver} onDrop={this.handleFiles}>

					<div className="upload-overlay">
						{this._shouldRenderBackground()}
					</div>

					<input className={`mortar-file-upload ${this.props.formKey}-${this.props.fieldKey}`}
						   style={{display: 'none'}}
						   name={this.props.fieldKey}
						   type="file"
						   ref="fileInput"
						   onChange={this.handleFiles}
						   multiple={this.props.options.multiple || false}
						   accept={this._buildAcceptString()} />
				</div>
				<label className="control-label upload-label">{this.props.label}</label>
				{typeof this.props.helpText !== 'undefined' && (
					<p className="help=block upload-help-block">{this.props.helpText}</p>
				)}
			</div>
		);
	}
});

module.exports = FileInput;

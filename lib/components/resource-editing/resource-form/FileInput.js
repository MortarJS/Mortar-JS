var React = require('react/addons');
var FormUtility = require('./FormUtilityMixin');
var classNames = require('classnames');

// Very slightly modified from https://github.com/paramaggarwal/react-dropzone
var FileInput = React.createClass({
	propTypes: {
		options: React.PropTypes.shape({
			multiple: React.PropTypes.bool,
			height: React.PropTypes.number,
			width: React.PropTypes.number,
			b64encoded: React.PropTypes.boolean,
			bgImage: React.PropTypes.String
		}),
		onFileSelect: React.PropTypes.func,
		label: React.PropTypes.string,
		helpText: React.PropTypes.string,
		accept: React.PropTypes.string.isRequired
	},

	mixins: [FormUtility],

	getInitialState: function () {
		return {
			dragIsActive: false,
			fileIsUploaded: false,
			imageUrl: null,
			files: [],
			filePreviews: []
		}
	},

	open: function () {
		// "Click" the file input to open the upload window
		this.refs.fileInput.getDOMNode().click();
	},

	handleClick: function () {
		this.open();
	},

	handleDragLeave: function (event) {
		this.setState({
			dragIsActive: false
		});
	},

	handleDragOver: function (event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';

		this.setState({
			dragIsActive: true
		});
	},

	componentWillReceiveProps: function (nextProps) {
		// Reset state if we're not passed a value for this form input
		if (typeof this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)) {
			this.setState(this.getInitialState());
		}
	},

	handleDrop: function (event) {
		event.preventDefault();

		this.setState({
			dragIsActive: false
		});

		var files;
		if (event.dataTransfer) {
			files = event.dataTransfer.files;
		} else if (event.target) {
			files = event.target.files;
		}

		var totalFiles = this.props.options.multiple ? files.length : 1;
		for (var i = 0; i < totalFiles; i++) {
			files[i].preview = URL.createObjectURL(files[i]);
		}

		files = Array.prototype.slice.call(files, 0, totalFiles);
		var filePreviews = [];

		// Base64 encode files if we need to
		if (typeof this.props.options !== 'undefined' && this.props.options.b64encoded) {
			var thisComponent = this;
			var changeHandler = this._handleChange;

			// Read each file of array, b64 encode, and bubble up to file select handler
			files = files.map(function (file, index) {
				var reader = new FileReader();

				reader.onloadend = function (event) {
					var binary = event.target.result;
					files[index] = btoa(binary);
					filePreviews[index] = file.preview;

					// @todo this handler should send to FormStore
					thisComponent.setState({
						files: files.length > 1 ? files : files[0],
						filePreviews: filePreviews
					}, function () {
						changeHandler();
					});
				};

				reader.readAsBinaryString(file);
			});
		} else {
			this.setState({
				files: files.length > 1 ? files : files[0],
				filePreviews: filePreviews
			}, function () {
				this._handleChange();
			});
		}
	},

	_handleChange: function () {
		this.props.changeCallback(this.props.fieldKey, this.state.files, this);
	},

	acceptUpload: function (imageUrl) {
		this.setState({
			imageUrl: imageUrl,
			fileIsUploaded: true
		});
	},

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

			return <img src={source} height={this.props.options.height - 5} width={this.props.options.width - 5} />
		}

		// Show default text
		return <span>Drag and drop or browse for files to upload.</span>;
	},

	_buildAcceptString: function () {
		// Default types
		var types = {audio: 'audio/*', video: 'video/*', image: 'image/*'};

		return types.hasOwnProperty(this.props.accept) ? types[this.props.accept] : this.props.accept;
	},

	render: function () {
		var classes = classNames({
			'file-upload': true,
			active: this.state.dragIsActive
		});

		var style = {
			width: this.props.options.width || 100,
			height: this.props.options.height || 100,
			borderStyle: ! this.state.fileIsUploaded ? this.state.dragIsActive ? 'solid' : 'dashed' : ''
		};

		return (
			<div className="upload-file-container">
				<div className={classes} style={style} onClick={this.handleClick} onDragLeave={this.handleDragLeave}
					 onDragOver={this.handleDragOver} onDrop={this.handleDrop}>

					<div className="upload-overlay">
						{this._shouldRenderBackground()}
					</div>

					<input style={{display: 'none'}}
						   name={this.props.fieldKey}
						   type="file"
						   ref="fileInput"
						   onChange={this.handleDrop}
						   mutiple={this.props.options.multiple}
						   accept={this._buildAcceptString()} />
				</div>
				<label className="control-label upload-label">{this.props.label}</label>
				{typeof this.props.helpText !== 'undefined' && (
					<p className="help=block upload-help-block">{this.props.helpText}</p>
				)}
			</div>
		)
	}
});

module.exports = FileInput;

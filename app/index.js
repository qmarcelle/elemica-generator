'use strict'

var generators = require('yeoman-generator'),
mkdirp = require('mkdirp'),
yosay = require('yosay'),
chalk = require('chalk');

module.exports = generators.Base.extend({
	_createProjectFileSystem: function(){
		var destRoot = this.destinationRoot(),
		    sourceRoot = this.sourceRoot(),
		    templateContext = {
		    	appname: this.appname,
		    	description: this.appdescription,
		    	version: this.appversion
		    },

		
//gateway config files



//gateway file structure
	//main dest folders
	appDir = destRoot + '/app',
	binDir = destRoot + '/bin',
	confDir = destRoot + '/conf',
	projDir = destRoot + '/project',
	pubDir = destRoot + '/public',
	testDir = destRoot + '/test',


//main src folders
	appSrc = sourceRoot + '/app',
	binSrc = sourceRoot + '/bin',
	confSrc = sourceRoot + '/conf',
	projSrc = sourceRoot + '/project',
	pubSrc = sourceRoot + '/public',
	testSrc = sourceRoot + '/test';


//copy files and folder structure from source to destination 
		    this.fs.copy(appSrc + '/**/*', appDir + '/');
		    this.fs.copy(binSrc + '/**/*', binDir + '/');
		    this.fs.copy(confSrc + '/**/*', confDir + '/');
		    this.fs.copy(projSrc + '/**/*', projDir + '/');
		    this.fs.copy(pubSrc + '/**/*', pubDir + '/');
		    this.fs.copy(testSrc + '/**/*', testDir + '/');

//copy files in root folder
		    this.fs.copy(sourceRoot + '/.editorconfig', destRoot + '/.editorconfig');
		    this.fs.copy(sourceRoot + '/activator', destRoot + '/activator');
		    this.fs.copy(sourceRoot + '/activator.bat', destRoot + '/activator.bat');
		    this.fs.copy(sourceRoot + '/activator-launch-1.3.6.jar', destRoot + '/activator-launch-1.3.6.jar');
		    this.fs.copy(sourceRoot + '/build.sbt', destRoot + '/build.sbt');
		    this.fs.copy(sourceRoot + '/Gruntfile.js', destRoot + '/Gruntfile.js');
		    this.fs.copy(sourceRoot + '/karma.conf.js', destRoot + '/karma.conf.js');
		    this.fs.copy(sourceRoot + '/LICENSE', destRoot + '/LICENSE');
		    this.fs.copy(sourceRoot + '/package.json', destRoot + '/package.json');
		    this.fs.copy(sourceRoot + '/protractor.conf.js', destRoot + '/protractor.conf.js');
		   


//
//		    this.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json',templateContext);
//		    this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json',templateContext);
//		    this.fs.copy(sourceRoot + '/.jshintrc', destRoot + '/.jshintrc');
	},
	_getPrompts: function(){
		var prompts = [
		{
			name: 'name',
			message: 'What is the name of the project?',
			default: this.appname
		},
		{
			name: 'description',
			message: 'What is the description of the project?'
		},
		{
			name: 'version',
			message: 'What is the version of the project?',
			default: '0.0.0'
		}
		];
		return prompts;
	},
	_saveAnswers: function(answers,callback){
		this.appname = answers.name;
		this.appdescription = answers.description;
		this.appversion = answers.version;
		callback();

	},	
	initializing: function(){
		var message = chalk.blue.bold('Welcome to Elemica web app!') + chalk.yellow(' A generator for Elemica web applications');
		this.log(yosay(message,{maxLength:28}));
	},
	//prompting...
	prompting: function(){
		//get all the prompts created in the helper function
		var done = this.async();

		this.prompt(this._getPrompts(),   function(answers){
			this._saveAnswers(answers,done); 
		}.bind(this));

	},
	configuring: function(){
		this.config.save();
	},
	//default...
	writing: function () {
		this._createProjectFileSystem();
	},
	//conflicts...
	install: function(){
		this.bowerInstall();
		this.npmInstall();
	}
	//end...

});
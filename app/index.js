'use strict'




var yeoman = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');
var elemUtils = require('../utils.js');



var ElemicaWebappGenerator = module.exports = function ElemicaWebappGenerator(args, options, config){
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.config.set('partialDirectory','partial/');
		this.config.set('modalDirectory','partial/');
		this.config.set('directiveDirectory','directive/');
		this.config.set('filterDirectory','filter/');
		this.config.set('serviceDirectory','service/');
		var inject = {
			js: {
				file: 'index.html',
				marker: elemUtils.JS_MARKER,
				template: '<script src="<%= filename %>"></script>'
			},
			less: {
				relativeToModule: true,
				file: '<%= module %>.less',
				marker: elemUtils.LESS_MARKER,
				template: '@import "<%= filename %>";'
			}
		};
		this.config.set('inject',inject);
		this.config.save();
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

	util.inherits(CgangularGenerator, yeoman.generators.Base);

};






module.exports = yeoman.generators.Base.extend({
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

		this.prompt(this._getPrompts(), function(answers){

			this._saveAnswers(answers,done);
		}.bind(this));

	},
	get configuring(){
		//return{
			/*save current settings*/
			/*saveSettings: function(){
				if(this.skipConfig) return;
				config.set('registerRoutesFile', 'conf/routes');
				config.set('routesNeedle', '// Insert routes below')

			}*/

/*
			ngComponent: function (){
				if(this.skipConfig) return;
				var appPath = 'public/app/';
				var extensions = [];
				var filters = [
					'ngroute',
					'uirouter',
					'jasmine',
					'mocha',
					'expect',
					'should'
				].filter(function(v) {return this.filters[v];}, this);

				if(this.filters.ngroute) filters.push('ngroute');
				if(this.filters.uirouter) filters.push('uirouter');
				if(this.filters.babel) extensions.push('babel');
				if(this.filters.ts) extensions.push('ts');
				if(this.filters.js) extensions.push('js');
				if(this.filters.html) extensions.push('html');
				if(this.filters.jade) extensions.push('jade');
				if(this.filters.css) extensions.push('css');
				if(this.filters.stylus) extensions.push('styl');
				if(this.filters.sass) extensions.push('scss');
				if(this.filters.less) extensions.push('less');

				this.composeWith('ng-component', {
					options: {
						'routeDirectory': appPath,
						'directiveDirectory': appPath,
						'filterDirectory': appPath,
						'serviceDirectory': appPath,
						'filters': filters,
						'extensions': extensions,
						'basePath': 'public',
						'forceConfig': this.forceConfig
					}
				}, { local: require.resolve('generator-ng-component/app/index.js') });

			}
		}*/


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
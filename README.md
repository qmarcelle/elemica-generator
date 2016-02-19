# elemica-generator
Prerequisites:
- install node to get NPM https://nodejs.org/en/download/
- install bower globally (npm install bower -g)
- install yeoman globally(npm install yo -g)
- install Grunt globally (npm install grunt -g)

#how to install
-CD to the path that this repo is cloned to and type the command: npm-link
#how to use
- cd to the directory that you wish to start the new project within
- type the command: yo elemica-webapp
- the webapp will be scafolfed and the node dependencies will be installed.
- after the project generation is complete cd to the "public" folder 
- run the bower install command

#launching the application
- make sure that you are on the apropriate vpn if the ports have not yet been opened to the outside
- make sure you are in the root directory 
- run the command:
"activator -Dconfig.resource=apollo-dev-beanstalk.conf run"




install node to get NPM
https://nodejs.org/en/download/

Step One  
install bower  
$npm install -g bower  
install packages for bower   
$bower install  

Step Two  
install Grunt  
$npm install -g grunt-cli  
install all packages for grunt  
$npm install  

Step 3  
Command Line  
first run   
$ npm install grunt  
$ activator run  
Note: this project use c version of sass there is no need for Ruby istallation  
http://127.0.0.1:9000/app/index.html - access your application here.  
  

run with other services with SSL  
activator -jvm-debug 9999 run -Dhttps.port=443 -Dhttp.port=8000  


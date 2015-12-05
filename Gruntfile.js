module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("bower.json"),
		watch: {
			less: {
				files: ["web/private/less/**/*.less"],
				tasks: ["less", "autoprefixer", "cssmin", "usebanner:css"]
			}
		},
		
		concat: {
			task: {
				files: [
					{
						src: ["web/private/js/**/*.js"],
						dest: "web/public/js/main.js"
					}
				]
			}
		},
		
		uglify: {
			task: {
				files: [
					{
						src: ["web/public/js/main.js"],
						dest: "web/public/js/main.min.js"
					}
				]
			}
		},
		
		less: {
			task: {
				files: {
					"web/public/css/main.css": ["web/private/less/*.less"]
				}
			}
		},
		
		autoprefixer: {
			options: {
				browsers: ["> 0.01%", "ie 9", "ie 10"]
			},
			task: {
				files: {
					"web/public/css/main.css": ["web/public/css/main.css"]
				}
			}
		},
		
		cssmin: {
			task: {
				files: {
					"web/public/css/main.min.css": ["web/public/css/main.css"]
				}
			}
		},
		
		usebanner: {
			options: {
				position: "top",
				banner: "/* (c) 2015 by David Schwarz */\n"
			},
			css: {
				files: {
					src: ["web/public/css/*.css"]
				}
			},
			js: {
				files: {
					src: ["web/public/js/*.js"]
				}
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-banner");

	grunt.registerTask("default", ["watch"]);
};
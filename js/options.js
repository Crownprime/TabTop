const aboutHtml = ajaxStorage("storage/options/about.html");
const settingsHtml = ajaxStorage("storage/options/settings.html");

const about = {template:aboutHtml};
const settings = {template:settingsHtml};


function ajaxStorage(url){
	var html;
	$.ajax({
		url:url,
		type:"get",
		async:false,
		success:function(data){
			html = data
		},
		error:function(){
			console.log("ajaxStorage:"+url+"error");
		}
	});
	return html;
}


// router

const routes = [
	{
		path:"/about",
		component:about
	},
	{
		path:"/settings",
		component:settings
	}
];

const router = new VueRouter({
	routes
});


// app

var vm = new Vue({
	el:"#options",
	router,
	data: {
		config:{
			"name":""
		},
		mark:{
			"num": 0,
			"package":new Array()
		},
		getAbout:"aaa",
	},

	created:function(){
		var that = this;
		chrome.storage.sync.get(['config'],function(data){
			if(data.config){
				that.config = data.config;
				console.log("storage-get:config");
				console.log(data.config);
			}
			else{
				chrome.storage.sync.set({"config":that.config},function(){
					console.log("storage-set:config");
				})
			}
		});
		chrome.storage.sync.get(['mark'],function(data){
			if(data.mark){
				that.mark = data.mark;
				console.log("storage-get:mark");
				console.log(data.mark);
			}
			else{
				chrome.storage.sync.set({"mark":that.mark},function(){
					console.log("storage-set:mark");
				})
			}
		});
	},

	methods:{
		saveConfig:function(){
			var that = this;
			var name = $('#configName').val();
			that.config.name = name;
			chrome.storage.sync.set({"config":that.config},function(){
					console.log("storage-set:config");
			});
		},
		addPackage:function(){
			$('#addPackage').css({
				visibility: "visible",
				display:"block"
			}).animate({
				opacity:1
			})
		},
		cancelAddPackage:function(){
			$('#addPackage').animate({
				opacity:0
			},function(){
				$(this).css({
					visiblity:"hidden",
					display:"none"
				});
			});
		},
		createPackage:function(){
			var that = this;
			var packageName = $('#packageName').val();
			var package = {
				"name": packageName,
				"num": 0,
				"list":new Array()
			}
			that.mark.package.push(package);
			that.mark.num++;
			chrome.storage.sync.set({"mark":that.mark},function(){
				console.log("storage-set:mark"+that.mark);
			});
		}
	}

})
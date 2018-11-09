var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext;

//加载媒体
var audio = new Audio("bg2.mp3");

//节点
var source = context.createMediaElementSource(audio);
var analyser = context.createAnalyser();

source.connect(analyser);
analyser.connect(context.destination);
analyser.fftSize = 4096;

//创建数据
var dataArray = new Uint8Array(analyser.fftSize);

//canvas初始化
var canvas = document.getElementById("canvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var p = canvas.getContext("2d");

var gradientRound = p.createLinearGradient(0,0,500,0);
gradientRound.addColorStop("0","#00f0ff");
gradientRound.addColorStop("1.0","#00ffb0");


//lineCanvas 初始化
// var lineCanvas = document.getElementById("lineCanvas");
// var lineCanvasWidth = lineCanvas.width;
// var lineCanvasHeight = lineCanvas.height;
// var linecanvas = lineCanvas.getContext("2d");

// var gradientLine = linecanvas.createLinearGradient(0,0,1000,0);
// gradientLine.addColorStop("0","red");
// gradientLine.addColorStop("1.0","blue");


audio.oncanplaythrough = function() {
	// audio.play();
}

function drawWave() {

	

	analyser.getByteFrequencyData(dataArray);
	
	//round

	p.clearRect(0,0,500,500);
	p.fillStyle = gradientRound;
	var deg = 0;
	var delta = Math.PI/64;
	var R = 200;

	for(var i =0;i<128;i++) {
		var r = Math.pow(dataArray[i],2)/3000 + 5;
		// 0<r<=1 递减
		// var r = Math.pow(Math.E,-dataArray[i]);
		//
		// var r = 10 - 5*r;

		var coors = coordinate(R, r, deg, delta);
		
		p.beginPath();
		p.moveTo(canvasWidth/2 + coors[0][0], canvasHeight/2 + coors[0][1]);
		p.lineTo(canvasWidth/2 + coors[1][0], canvasHeight/2 + coors[1][1]);
		p.lineTo(canvasWidth/2 + coors[3][0], canvasHeight/2 + coors[3][1]);
		p.lineTo(canvasWidth/2 + coors[2][0], canvasHeight/2 + coors[2][1]);
		p.lineTo(canvasWidth/2 + coors[0][0], canvasHeight/2 + coors[0][1]);
		p.fill();
		p.closePath();

		deg = deg + delta;
	}

	//line

	// left line

	// linecanvas.clearRect(0,0,1000,500);
	// linecanvas.beginPath();
	// linecanvas.moveTo(0,250);

	// var x = 5
	// for(var i = 0;i<100;i++) {
	// 	var lineHeight = 250 - dataArray[i]/3 - Math.floor(Math.random()*20) - 10;
	// 	linecanvas.lineTo(x,lineHeight);
	// 	x = x + 5;
	// }
	// linecanvas.strokeStyle = gradientLine;
	// linecanvas.stroke();
	// linecanvas.closePath();

	// left fill

	// linecanvas.beginPath();
	// linecanvas.moveTo(0,250);

	// var x = 5
	// for(var i = 0;i<100;i++) {
	// 	var lineHeight = 250 - dataArray[i]/3;
	// 	linecanvas.lineTo(x,lineHeight);
	// 	x = x + 5;
	// }
	// linecanvas.lineTo(500,250);
	// linecanvas.fillStyle = gradientLine;
	// linecanvas.fill();
	// linecanvas.closePath();

	// //left inverted
	// linecanvas.beginPath();
	// linecanvas.moveTo(0,255);

	// var x = 5
	// for(var i = 0;i<100;i++) {
	// 	var lineHeight = 255 + dataArray[i]/10;
	// 	linecanvas.lineTo(x,lineHeight);
	// 	x = x + 5;
	// }
	// linecanvas.lineTo(500,255);
	// linecanvas.fillStyle = gradientLine;
	// linecanvas.fill();
	// linecanvas.closePath();

	// right

	// linecanvas.beginPath();
	// linecanvas.moveTo(1000,250);

	// var x = 995;
	// for(var i = 0;i<100;i++) {
	// 	var lineHeight = 250 - dataArray[i]/3 - Math.floor(Math.random()*20) - 10;
	// 	linecanvas.lineTo(x,lineHeight);
	// 	x = x - 5;
	// }
	// linecanvas.strokeStyle = gradientLine;
	// linecanvas.stroke();
	// linecanvas.closePath();

	// right fill

	// linecanvas.beginPath();
	// linecanvas.moveTo(1000,250);

	// var x = 995
	// for(var i = 0;i<100;i++) {
	// 	var lineHeight = 250 - dataArray[i]/3;
	// 	linecanvas.lineTo(x,lineHeight);
	// 	x = x - 5;
	// }
	// linecanvas.lineTo(500,250);
	// linecanvas.fillStyle = gradientLine;
	// linecanvas.fill();
	// linecanvas.closePath();

	// right inverted

	// linecanvas.beginPath();
	// linecanvas.moveTo(1000,255);

	// var x = 995
	// for(var i = 0;i<100;i++) {
	// 	var lineHeight = 255 + dataArray[i]/10;
	// 	linecanvas.lineTo(x,lineHeight);
	// 	x = x - 5;
	// }
	// linecanvas.lineTo(500,255);
	// linecanvas.fillStyle = gradientLine;
	// linecanvas.fill();
	// linecanvas.closePath();

	window.requestAnimationFrame(drawWave);

}

function coordinate(R, r, deg, delta) {

	var coors = new Array();

	coors[0] = new Array((R - r)*Math.cos(deg),(R - r)*Math.sin(deg));
	coors[1] = new Array((R + r)*Math.cos(deg),(R + r)*Math.sin(deg));
	coors[2] = new Array((R - r)*Math.cos(deg+delta/2),(R - r)*Math.sin(deg+delta/2));
	coors[3] = new Array((R + r)*Math.cos(deg+delta/2),(R + r)*Math.sin(deg+delta/2));

	return coors;
}


window.requestAnimationFrame(drawWave);
var month = new Array("Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec");
var week = new Array("Sun","Mon","Tue","Wed","Thur","Fri","Sat");
var date = new Date();
var clock = function clock() {
	$("#hours1").text(parseInt(date.getHours()/10));
	$("#hours2").text(parseInt(date.getHours()%10));
	$("#minutes1").text(parseInt(date.getMinutes()/10));
	$("#minutes2").text(parseInt(date.getMinutes()%10));

	$("#month").text(month[date.getMonth()-1]);
	$("#day").text(date.getDate());
	$("#week").text(week[date.getDay()]);
	window.setTimeout(clock,1000);
}
clock();

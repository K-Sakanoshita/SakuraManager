/*
SakuraManager
copyright by K.Sakanoshita / Licence: MIT
*/
"use strict";

var Marker = (function (){
	// マーカー操作
	return {
		reset: function(){
			if (markers != undefined){
				markers.forEach(function(marker){	map.removeLayer(marker)	});
			};
			markers = [];
			elements = [];
		},
		set: function (json){		// マーカーを追加
			let i = 0;
			json.forEach(function(datas){
				elements.push(datas);
				markers[i] = L.marker([datas['緯度'],datas['経度']],{icon: markerIcon[datas['種別']]}).addTo(map);
				markers[i]
				.bindPopup($("#PopUp").html() + "<input type='hidden' id='index' value='"+ i + "'>", { keepInView: true,autoPanPadding: [2, 2],closeOnClick: false })
				.on('popupopen', function () { PopUpFormLoad(elements[$("#index").val()]) });
				i = i + 1;
			});
		}
	};
})();

var PoiData = (function (){

	const GET_Url 	= "https://script.google.com/macros/s/AKfycbx689YdmNnYekYuAXuy2oHyu7pMr_mIONISYSVjXPXwXJytR9I/exec";
	const POST_Ok		= "登録に成功しました。";
	const POST_Ng   = "登録エラーです。もう一度やり直してください。";

	return {
		get: function (){					// サーバーからデータを収集する
			return new Promise(function(resolve,reject){
				let date = new Date();
				$.ajax({ type : "get",	url : GET_Url,	dataType: "jsonp",	cache : false,	jsonpCallback: 'GDocReturn' }).then(function(json){
					Marker.reset();
					Marker.set(json);
					resolve();
				},function(json){
					alert(POST_Ng);
					reject(error);
				});
			});
		},

		post: function (commit){	// サーバーにデータを投稿する
			return new Promise(function(resolve,reject){
				let date = new Date();
				$.ajax({ "type" : "get", "url" : GET_Url + '?json=' + JSON.stringify(commit),	dataType: "jsonp",cache: false, jsonpCallback: 'GDocReturn' }).then(function(json){
					alert (POST_Ok);
					Marker.reset();
					Marker.set(json);
					resolve();
				},function(json){
					alert(POST_Ng);
					reject(error);
				});
			});
		}
	}
})();

// 日時フォーマット関数
function formatDate (date, format) {
	format = format.replace(/YYYY/g, date.getFullYear());
	format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
	format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
	format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
	format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
	format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
	return format;
};

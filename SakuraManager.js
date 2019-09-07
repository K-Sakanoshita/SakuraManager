/*
SakuraManager
copyright by K.Sakanoshita / Licence: MIT
*/
"use strict";

// Global Variable
const CATEGORY 	= {'ソメイヨシノ': './images/marker-icon-blue.png','シダレザクラ':'./images/marker-icon-orange.png'};
const Tile1	= {url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',			attr: {attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',		maxZoom: 19	}};
const Tile2 = {url: 'http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg',attr: {attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>", maxZoom: 18}};
var map;
var hash;
var marker;						// マーカーレイヤー
var latlng;						// マーカーの緯度経度
var osm,ort;
var L_Sel;
var Layers;						// レイヤーの一覧(地理院地図、OSMなど)
var contLayer = {};		//
var elements = [];
var markers						// マーカー群
var markerIcon = {};
var MMO;							// ManageMent Object

// main prosess
$(document).ready(function() {
	$.ajaxSetup({cache: false});
	$.get('PopUp.html',function functionName(html) {
		$("#PopUp").html(html);
		osm = L.tileLayer(Tile1.url,Tile1.attr);
		ort = L.tileLayer(Tile2.url,Tile2.attr);
		Layers = { 'OpenStreetMap': osm,'地理院（写真）': ort };
		map = L.map('mapid', {zoomControl: true,layers: [osm]});
		L.control.locate().addTo(map);
		hash = new L.Hash(map);

		// アイコン設定
		let LeafIcon = L.Icon.extend({
			options: { shadowUrl: './images/marker-icon-shadow.png',	iconSize: [25, 41],	shadowSize: [22, 25],	iconAnchor: [13, 41], shadowAnchor: [5, 25],popupAnchor:  [0, -40]}
		});
		Object.keys(CATEGORY).forEach(function(name) {
			markerIcon[name]	= new LeafIcon({iconUrl: CATEGORY[name]});
		});
		MMO = PoiData.get();
	});
});

/* eslint-disable */
import THREE from 'three.js'
import  * as d3  from 'd3'

import {geoPath, geoMercator} from "d3-geo";

export default function ToMap(dom) {
  const root = require("./china.json");
  const width = 800 || dom.style.width
  const height = 400 || dom.style.height
  console.log(dom.getAttribute('width'))
	var svg = d3.select(dom).append("svg")
	    .attr("width", 800)
	    .attr("height", 400)
	    .append("g")
	    .attr("transform", "translate(0,0)");

console.log(geoMercator);
	var projection =geoMercator()
						.center([107, 31])
						.scale(850)
    					.translate([width/2, height/2]);

	var path = geoPath()
					.projection(projection);

		console.log(root.features);

		svg.selectAll("path")
			.data( root.features )
			.enter()
			.append("path")
			.attr("stroke","#000")
			.attr("stroke-width",1)
			.attr("fill", function(d,i){
				// return color(i);
			})
			.attr("d", path )
			.on("mouseover",function(d,i){
                d3.select(this)
                    .attr("fill","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .attr("fill",color(i));
            });
}




// var width = 960,
// height = 960,
// radius = 228,
// mesh,
// graticule,
// scene = new THREE.Scene,
// camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000),
// renderer = new THREE.WebGLRenderer({alpha: true});

// camera.position.z = 400;
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(width, height);
// document.body.appendChild(renderer.domElement);

// d3.json("./china.json", function(error, topology) {
// if (error) throw error;
// scene.add(graticule = wireframe(graticule10(), new THREE.LineBasicMaterial({color: 0xaaaaaa})));
// scene.add(mesh = wireframe(topojson.mesh(topology, topology.objects.land), new THREE.LineBasicMaterial({color: 0xff0000})));
// d3.timer(function(t) {
// graticule.rotation.x = mesh.rotation.x = Math.sin(t / 11000) * Math.PI / 3 - Math.PI / 2;
// graticule.rotation.z = mesh.rotation.z = t / 10000;
// renderer.render(scene, camera);
// });
// });

// // Converts a point [longitude, latitude] in degrees to a THREE.Vector3.
// function vertex(point) {
// var lambda = point[0] * Math.PI / 180,
//   phi = point[1] * Math.PI / 180,
//   cosPhi = Math.cos(phi);
// return new THREE.Vector3(
// radius * cosPhi * Math.cos(lambda),
// radius * cosPhi * Math.sin(lambda),
// radius * Math.sin(phi)
// );
// }

// // Converts a GeoJSON MultiLineString in spherical coordinates to a THREE.LineSegments.
// function wireframe(multilinestring, material) {
// var geometry = new THREE.Geometry;
// multilinestring.coordinates.forEach(function(line) {
// d3.pairs(line.map(vertex), function(a, b) {
//   geometry.vertices.push(a, b);
// });
// });
// return new THREE.LineSegments(geometry, material);
// }

// // See https://github.com/d3/d3-geo/issues/95
// function graticule10() {
// var epsilon = 1e-6,
//   x1 = 180, x0 = -x1, y1 = 80, y0 = -y1, dx = 10, dy = 10,
//   X1 = 180, X0 = -X1, Y1 = 90, Y0 = -Y1, DX = 90, DY = 360,
//   x = graticuleX(y0, y1, 2.5), y = graticuleY(x0, x1, 2.5),
//   X = graticuleX(Y0, Y1, 2.5), Y = graticuleY(X0, X1, 2.5);

// function graticuleX(y0, y1, dy) {
// var y = d3.range(y0, y1 - epsilon, dy).concat(y1);
// return function(x) { return y.map(function(y) { return [x, y]; }); };
// }

// function graticuleY(x0, x1, dx) {
// var x = d3.range(x0, x1 - epsilon, dx).concat(x1);
// return function(y) { return x.map(function(x) { return [x, y]; }); };
// }

// return {
// type: "MultiLineString",
// coordinates: d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X)
//     .concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y))
//     .concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) { return Math.abs(x % DX) > epsilon; }).map(x))
//     .concat(d3.range(Math.ceil(y0 / dy) * dy, y1 + epsilon, dy).filter(function(y) { return Math.abs(y % DY) > epsilon; }).map(y))
// };
// }

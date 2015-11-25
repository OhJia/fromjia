var gl, prog;
var pi = Math.PI;

function draw() {
   gl = document.getElementById('canvas1').getContext('experimental-webgl');
   gl.enable(gl.DEPTH_TEST);
   gl.depthFunc(gl.LEQUAL);
   prog = gl.createProgram();
   
   /*
      add shaders
   */
   function addShader(type, str) {
      var s = gl.createShader(type);
      gl.shaderSource(s, str);
      gl.compileShader(s);
      gl.attachShader(prog, s);
   }
   addShader(gl.VERTEX_SHADER, [
      ,'attribute vec3 aPos;'
      ,'uniform mat4 uMatrix;'
      ,'varying vec3 uPos;'
      ,'void main() {'
      ,'   uPos = aPos * 0.6 + 0.3;'
      ,'   gl_Position = uMatrix * vec4(aPos, 1.);'
      ,'}',
      ].join('\n')
   );
   addShader(gl.FRAGMENT_SHADER, [
      ,'precision highp float;'
      ,'varying vec3 uPos;'
      ,'void main() {'
      ,'   gl_FragColor = vec4(uPos, 1.);'
      ,'}',
      ].join('\n')
   );
   
   
   /*
      set vertices to buffer
   */

   // cube vertices
   function createCube() {
      var vertices = [
         -.5,-.5, .5,
         -.5, .5, .5,
          .5,-.5, .5,
          .5, .5, .5,
          .5,-.5,-.5,
          .5, .5,-.5,
         -.5,-.5,-.5,
         -.5, .5,-.5,
         -.5,-.5, .5,
         -.5, .5, .5,
      ];
     return vertices;
   }

   // var vertices = createCube();

   // sphere vertices
   var vertices = [];
   var sphereNumV = 8;
   var sphereNumU = 8;
   var radius = 0.6;
   for (var v = 0; v < sphereNumV; v++){
      for (var u = 0; u < sphereNumU; u++){

         // 1
         var phi = pi * v/(sphereNumV-1) - pi/2;
         var theta = 2 * pi * u/(sphereNumU-1);
         var x = Math.cos(phi) * Math.cos(theta) * radius;
         var y = Math.cos(phi) * Math.sin(theta) * radius;
         var z = Math.sin(phi) * radius;
         vertices.push(x);
         vertices.push(y);
         vertices.push(z);

         // 2
         phi = pi * (v+1)/(sphereNumV-1) - pi/2;
         theta = 2 * pi * u/(sphereNumU-1);
         x = Math.cos(phi) * Math.cos(theta) * radius;
         y = Math.cos(phi) * Math.sin(theta) * radius;
         z = Math.sin(phi) * radius;
         vertices.push(x);
         vertices.push(y);
         vertices.push(z);
      }
   }
   
   //console.log(vertices);
   
   function address(name) { return gl.getUniformLocation(prog, name); }
   gl.linkProgram(prog);
   gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   var attr = gl.getAttribLocation(prog, 'aPos');
   gl.enableVertexAttribArray(attr);
   gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);
   gl.useProgram(prog);


   /*
      rotate
   */
   setInterval(tick, 1000 / 600);

   function tick() {
      var turn = (new Date()).getTime() / 1000.;
      var cos = Math.cos(turn);
      var sin = Math.sin(turn);
      var adjust = gl.canvas.height / gl.canvas.width;
      var matrix = [ adjust*cos,  0,sin, .1*sin,
                              0,  1,  0,  0,
                    -adjust*sin,  0,cos, .1*cos,
                              0,  0,  0,  1];
      gl.uniformMatrix4fv(address('uMatrix'), false, matrix);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 3);
   }
}




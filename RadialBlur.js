// var canvas;
// var scene;
// var camera;
// var light;
// var renderer;
// var composer;
//
// var teapot;
// var table;
// var wall;
// var imageWall = "brick.png";
//
// var arrow;
//
// var degree;
// var y;
//
// var effect;
// var time;
//
// function main()
// {
//   init();
//
//   y = arrow.position.y;
//   scene.add(addCube(1,1,1,5,5,1));
//   scene.add(addCube(1,1,1,15,5,1));
//
//   var animate = function()
//    {
//      if(time > 0.0)
//       {
//         radialBlur(new THREE.Vector3(10, 5.0, 0.0), 15.0, 13.0, time / totalTime, 2.0);
//         effect.renderToScreen = true;
//         effect.enabled = true;
//
//         time -= 0.0167;
//       }
//       else
//       {
//         effect.renderToScreen = false;
//         effect.enabled = false;
//       }
//       composer.render();
//       //(blurCenter, blurRadius, blurAttenuation, lastingTime, timeAttenuation)
//       //console.log(camera.getWorldPosition());
//
//       //renderer.render(scene, camera);
//       handleKeys();
//
//       arrow.position.y = y + Math.sin(degree);
//       degree += 0.05;
//
//       requestAnimationFrame(animate);
//   };
//
//   animate();
// }
//
// function load(objRef, path, objSelf)
// {
//   var loader = new THREE.OBJLoader();
//
//   loader.load(path,function(object)
//   {
//     scene.add(object);
//     objSelf = object;
//     objSelf.castShadow = true;
//     objSelf.receiveShadow = true;
//     objSelf.translateY(3.45);
//   },
//   function()
//   {
//
//   },
//   function(e)
//   {
//     console.error( e );
//   });
// }
//
// //cube
// function addCube(length, width, height, x, y, z)
// {
//   var obj = new THREE.CubeGeometry(length, height, width, 1, 1, 1);
//   var material = new THREE.MeshPhongMaterial( { color: 0xb6b311, specular: 0x222222, shininess: 50} );
//
//   var cube = new THREE.Mesh( obj, material );
//   cube.translateX(x);
//   cube.translateY(y);
//   cube.translateZ(z);
//   cube.castShadow = true;
//
//   scene.add(cube);
//
//   return cube;
// }
//
// //plane
// function addPlane(length, width, x, z)
// {
//   var obj = new THREE.PlaneGeometry(length, width, 1, 1);
//   var material = new THREE.MeshPhongMaterial( { color: 0x313323, specular: 0x222222, shininess: 50} );
//   var plane = new THREE.Mesh( obj, material );
//   plane.translateX(x);
//   plane.translateZ(z);
//   plane.receiveShadow = true;
//
//   scene.add(plane);
//
//   return plane;
// }
//
// //Cylinder
// function addCylinder(r, h, x, y, z)
// {
//   var obj = new THREE.CylinderGeometry(r, r, h, 40, 1);
//   var material = new THREE.MeshPhongMaterial( { color: 0x592a11, specular: 0x222222, shininess: 50} );
//
//   var cylinder = new THREE.Mesh( obj, material );
//   cylinder.translateX(x);
//   cylinder.translateY(y);
//   cylinder.translateZ(z);
//   cylinder.castShadow = true;
//   cylinder.receiveShadow = true;
//
//   scene.add(cylinder);
//
//   return cylinder;
// }
//
// function init()
// {
//   scene = new THREE.Scene();
//   // scene.fog = new THREE.Fog(0xa0a0a0, 2, 65);
//
//   camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
//   //camera.position.set( 0, 5, 20 );
// camera.position.set( -57, 23, 91 );
//
//   let light = new THREE.DirectionalLight(0xffffff);
//   light.position.set(0, 20, 10);
//   light.castShadow = true;
//   scene.add(light);
//
//   light = new THREE.SpotLight( 0xffffff );
//   light.position.set(0, 10, 3.5);
//   light.castShadow = true;
//   scene.add( light );
//   light.penumbra = 0.384;
//   light.intensity = 1.6;
//   light.shadow.mapSize.width = 100;
//   light.shadow.mapSize.height = 100;
//   light.shadow.camera.near = 0.5;
//   light.shadow.camera.far = 30;
//
//   canvas = document.getElementById('theCanvas');
//
//   renderer = new THREE.WebGLRenderer( { canvas : canvas, context : canvas.getContext( 'webgl2') });
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   renderer.shadowMap.enabled = true;
//   renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//
//   composer = new THREE.EffectComposer( renderer );
//   composer.addPass( new THREE.RenderPass( scene, camera ) );
//
//   effect = new THREE.ShaderPass(THREE.RadialBlurShader);
//   radialBlur(new THREE.Vector3(0, 0.0, 0.0), new THREE.Vector3(0, 0.0, 0.0), 0.0, 0.0, 0.0);
//   composer.addPass(effect);
//
//   window.addEventListener('resize', onWindowResize, false );
//   document.onkeydown = handleKeyDown;
//   document.onkeyup = handleKeyUp;
//
//   //object postion
//   currentlyPressedKeys = [];
//   degree = 0;
//
//   let plane = addPlane(1000, 1000, 0, 0);
//   plane.rotateX(toRadians(-90));
//
//   table = addCube(4, 3, 0.3, 0, 3, 0);
//   table.add(addCylinder(0.1, 3, 1.85, -1.5, 1.35));
//   table.add(addCylinder(0.1, 3, -1.85, -1.5, 1.35));
//   table.add(addCylinder(0.1, 3, 1.85, -1.5, -1.35));
//   table.add(addCylinder(0.1, 3, -1.85, -1.5, -1.35));
//
//   load(teapot, 'teapot.obj');
//   // load texture map
//   var loader = new THREE.TextureLoader();
//   var texture = loader.load(imageWall);
//   var geometry = new THREE.CubeGeometry(300, 300, 3, 1, 1, 1);
//   var material = new THREE.MeshPhongMaterial( { map: texture, specular: 0x222222, shininess: 50} );
//   wall = new THREE.Mesh(geometry, material);
//   wall.translateY(148.73);
//   wall.translateZ(-10);
//   wall.receiveShadow = true;
//   scene.add(wall);
//   texture.magFilter = THREE.NearestFilter;
//   texture.minFilter = THREE.NearestFilter;
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set(100, 100);
//
//   arrow = addCube(0.15, 0.15, 3, 0, 7.35, 0);
//   let leftArrow = addCube(0.15, 0.15, 2, -0.5, -0.6, 0);
//   leftArrow.rotateZ(toRadians(30));
//   let rightArrow = addCube(0.15, 0.15, 2, 0.5, -0.6, 0);
//   rightArrow.rotateZ(toRadians(-30));
//
//   arrow.add(leftArrow);
//   arrow.add(rightArrow);
//
//   imageNames = ["sky.png","sky.png","sky.png","sky.png","sky.png","sky.png"];
//   var ourCubeMap = new THREE.CubeTextureLoader().load( imageNames );
//
//   scene.background = ourCubeMap;
// }
//
// /**
//  *
//  * blurCenter: (Vector3)world space
//  * blurRadius: (float) radius in world space
//  * blurAttenuation: (float) attenuation factor of blur
//  * timeLeft: (float) a percentage of time left for blur
//  * timeAttenuation: (float) attenuation factor for time
//  *
//  */
//
// var test = 0;
//
// function radialBlur(blurCenter, blurRadius, blurAttenuation, timeLeft, timeAttenuation)
// {
//   effect.uniforms["blurDistance"].value = camera.getWorldPosition(new THREE.Vector3()).distanceTo(blurCenter) * 0.1;
//   //effect.uniforms["blurDistance"].value = 2.0;
//
//   let vecToBorder = new THREE.Vector3(1, 0, 0);
//   vecToBorder.applyMatrix3(camera.matrix);
//   vecToBorder.normalize();
//   vecToBorder.x *= blurRadius;
//   vecToBorder.z *= blurRadius;
//
//   if(test % 60 == 0)
//   {
//     console.log("vecToBorder = ");
//     console.log(vecToBorder);
//   }
//
//   let blurBorderOnScreen = vecToBorder.add(blurCenter);
//   blurBorderOnScreen.project(camera);
//   blurBorderOnScreen.x = (blurBorderOnScreen.x + 1) / 2;
//   blurBorderOnScreen.y = 1 + (blurBorderOnScreen.y - 1) / 2;
//   blurBorderOnScreen.z = 0;
//
//   blurCenter.project(camera);
//   blurCenter.x = (blurCenter.x + 1) / 2;
//   blurCenter.y = 1 + (blurCenter.y - 1) / 2;
//   blurCenter.z = 0;
//
//   if(test % 60 == 0)
//   {
//   console.log("value = ");
//   console.log(blurCenter);
//   console.log(blurBorderOnScreen);
//   console.log(camera.position);
//   }
//   test += 1;
//   effect.uniforms["blurCenter"].value = new THREE.Vector2(blurCenter.x, blurCenter.y);
//   effect.uniforms["blurRadius"].value = new THREE.Vector2(blurBorderOnScreen.x, blurBorderOnScreen.y);
//   effect.uniforms["viewPortSize"].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
//   effect.uniforms["blurAttenuation"].value = blurAttenuation;
//   effect.uniforms["timeout"].value = timeLeft;
//   effect.uniforms["timeAttenuation"].value = timeAttenuation;
// }
//
// var currentlyPressedKeys;
//
// function handleKeyDown(event)
// {
//   currentlyPressedKeys[event.keyCode] = true;
//
//   console.log(event.keyCode);
// }
//
// function handleKeyUp(event)
// {
//   currentlyPressedKeys[event.keyCode] = false;
// }
//
// var cameraMovementFactor = 1.0 / 10.0;
// var cameraRotationFactor = 1.0 / 10.0;
//
// function handleKeys()
// {
//   //w
//   if(currentlyPressedKeys[87] == true)
//   {
//     camera.translateZ(-1 * cameraMovementFactor);
//   }
//
//   //s
//   if(currentlyPressedKeys[83] == true)
//   {
//     camera.translateZ(1 * cameraMovementFactor);
//   }
//
//   //q
//   if(currentlyPressedKeys[81] == true)
//   {
//     camera.translateX(-1 * cameraMovementFactor);
//   }
//
//   //e
//   if(currentlyPressedKeys[69] == true)
//   {
//     camera.translateX(1 * cameraMovementFactor);
//   }
//
//   //a
//   if(currentlyPressedKeys[65] == true)
//   {
//     let q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), toRadians(15) * cameraRotationFactor);
//     let q2 = new THREE.Quaternion().copy(camera.quaternion);
//     camera.quaternion.copy(q).multiply(q2);
//   }
//
//   //d
//   if(currentlyPressedKeys[68] == true)
//   {
//     let q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), toRadians(-15) * cameraRotationFactor);
//     let q2 = new THREE.Quaternion().copy(camera.quaternion);
//     camera.quaternion.copy(q).multiply(q2);
//   }
//
//   //r
//   if(currentlyPressedKeys[82] == true)
//   {
//     camera.rotateX(toRadians(15) * cameraRotationFactor);
//   }
//
//   //f
//   if(currentlyPressedKeys[70] == true)
//   {
//     camera.rotateX(toRadians(-15) * cameraRotationFactor);
//   }
//
//   if(currentlyPressedKeys[66] == true)
//   {
//     time = 2.0;
//     totalTime = 2.0;
//   }
// }
//
// function onWindowResize()
//  {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//
//   renderer.setSize( window.innerWidth, window.innerHeight );
// }
//
// THREE.RadialBlurShader =
// {
//
// 	uniforms:
//   {
// 		"tDiffuse": { value: null },
//     "blurRadius": {value: null},
//     "blurCenter": {value: null},
//     "blurDistance": {value: null},
//     "viewPortSize": {value: null},
//     "blurAttenuation": {value: null},
//     "timeout": {value: null},
//     "timeAttenuation": {value: null}
// 	},
//
// 	vertexShader:
//   [
// 		"varying vec2 vUv;",
//
// 		"void main() {",
//
// 			"vUv = uv;",
// 			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
// 		"}"
//
// 	].join( "\n" ),
//
// 	fragmentShader:
//   [
// 		"uniform sampler2D tDiffuse;",
//
//     "uniform vec2 blurRadius;",
//     "uniform vec2 blurCenter;",
//
//     "uniform float blurDistance;",
//     "uniform float blurAttenuation;",
//
//     "uniform vec2 viewPortSize;",
//     "uniform float timeout;",
//     "uniform float timeAttenuation;",
//
// 		"varying vec2 vUv;",
//
// 		"void main()",
//     "{",
//       "float samples[11] = float[11](-0.08,-0.05,-0.03,-0.02,-0.01,0.0,0.01,0.02,0.03,0.05,0.08);",
//       "vec2 dir = blurCenter - vUv;",
// 			"vec4 sum = vec4(0.0, 0.0, 0.0, 0.0);",
//
//       "for(int i = 0 ; i < 11 ; i += 1)",
//       "{",
//         "vec2 pos = vUv + dir * samples[i] * blurDistance;",
//         "pos = clamp(pos, vec2(0.0, 0.0), vec2(1.0, 1.0));",
//         "sum += texture2D(tDiffuse, pos);",
//       "}",
//
//       "sum /= 11.0;",
//
//       "vec2 curPixel = vUv - blurCenter;",
//       "float rationScreen = viewPortSize.y / viewPortSize.x;",
//       "float curPixelY = curPixel.y * rationScreen;",
//       "curPixel.y = curPixelY;",
//
//       // "if(distance(curPixel, vec2(0.0, 0.0)) >= distance(blurRadius, blurCenter))",
//       // "{",
//       //   "gl_FragColor = vec4(1.0,0.0,0.0,1.0);",
//       //   "return;",
//       // "}",
//       // "else",
//       // "{",
//       //   "gl_FragColor = vec4(0.0,1.0,0.0,1.0);",
//       //   "return;",
//       // "}",
//
//       // "if(abs(vUv.x - blurCenter.x) <= 0.005 && abs(vUv.y - blurCenter.y) <= 0.005)",
//       // "{",
//       //   "gl_FragColor = vec4(1.0,0.0,0.0,1.0);",
//       //   "return;",
//       // "}",
//       // "else",
//       // "{",
//       //   "gl_FragColor = vec4(0.0,0.0,0.0,1.0);",
//       //   "return;",
//       // "}",
//
//       // "if(abs(0.73 - blurCenter.x) <= 0.01 && abs(0.73 - blurCenter.y) <= 0.01)",
//       // "{",
//       //   "gl_FragColor = vec4(1.0,0.0,0.0,1.0);",
//       //   "return;",
//       // "}",
//       // "else",
//       // "{",
//       //   "gl_FragColor = vec4(0.0,0.0,0.0,1.0);",
//       //   "return;",
//       // "}",
//
//       // "if(vUv.x >= 0.7)",
//       // "{",
//       //   "gl_FragColor = vec4(1.0,0.0,0.0,1.0);",
//       //
//       //   "if(abs(vUv.x - blurCenter.x) <= 0.005 && abs(vUv.y - blurCenter.y) <= 0.005)",
//       //   "{",
//       //     "gl_FragColor = vec4(0.0,0.0,1.0,1.0);",
//       //     "return;",
//       //   "}",
//       //
//       //   "return;",
//       // "}",
//       // "else",
//       // "{",
//       //   "gl_FragColor = vec4(0.0,0.0,0.0,1.0);",
//       //   "return;",
//       // "}",
//
//       "float factor = 1.0 - pow(distance(curPixel, vec2(0.0, 0.0)) / distance(blurRadius, blurCenter), blurAttenuation);",
//       "factor = clamp(factor, 0.0, 1.0);",
//       "factor = factor * pow(timeout, timeAttenuation);",
//
//       //lerp
//       "gl_FragColor = texture2D(tDiffuse, vUv) + vec4(factor) * (sum - texture2D(tDiffuse, vUv));",
//       "gl_FragColor.a = 1.0;",
// 		"}"
// 	].join( "\n" )
//
// };

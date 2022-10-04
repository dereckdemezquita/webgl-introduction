
import { createProgram, createShader } from './modules/webgl'

// Get A WebGL context
const canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx: WebGL2RenderingContext = canvas.getContext("webgl2") as WebGL2RenderingContext;

// Get the strings for our GLSL shaders
const vertexShaderSource: string = (document.querySelector("#vertex-shader-2d") as HTMLScriptElement).text;
const fragmentShaderSource: string = (document.querySelector("#fragment-shader-2d") as HTMLScriptElement).text;

// create GLSL shaders, upload the GLSL source, compile the shaders
const vertexShader = createShader(ctx, ctx.VERTEX_SHADER, vertexShaderSource) as WebGLShader;
const fragmentShader = createShader(ctx, ctx.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader;

// Link the two shaders into a program
const program = createProgram(ctx, vertexShader, fragmentShader);

// look up where the vertex data needs to go.
const positionAttributeLocation: number = ctx.getAttribLocation(program, "a_position");

// Create a buffer and put three 2d clip space points in it
const positionBuffer = ctx.createBuffer();

// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);

const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
];

ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

// --------------------------------
// code above this line is initialization code
// code below this line is rendering code
// --------------------------------

// Tell WebGL how to convert from clip space to pixels
ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);

// Clear the canvas
ctx.clearColor(0, 0, 0, 0);
ctx.clear(ctx.COLOR_BUFFER_BIT);

// Tell it to use our program (pair of shaders)
ctx.useProgram(program);

// Turn on the attribute
ctx.enableVertexAttribArray(positionAttributeLocation);

// Bind the position buffer.
ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
const size = 2; // 2 components per iteration
const type = ctx.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0; // start at the beginning of the buffer
ctx.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

// draw
const primitiveType = ctx.TRIANGLES;
const count = 3;
ctx.drawArrays(primitiveType, offset, count);

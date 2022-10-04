
export function createShader(ctx: WebGL2RenderingContext, type: number, source: string): WebGLShader {
    const shader = ctx.createShader(type) as WebGLShader;
    ctx.shaderSource(shader, source);
    ctx.compileShader(shader);
    const success = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);

    if (!success) throw new Error(`Failed to compile the shader: ${ctx.getShaderInfoLog(shader)}`);

    return shader;
}

export function createProgram(ctx: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = ctx.createProgram() as WebGLProgram;
    ctx.attachShader(program, vertexShader);
    ctx.attachShader(program, fragmentShader);
    ctx.linkProgram(program);

    const success = ctx.getProgramParameter(program, ctx.LINK_STATUS);

    if (!success) throw new Error(`Failed to link the program: ${ctx.getProgramInfoLog(program)}`);

    return program;
}
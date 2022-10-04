
// https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html

export class Vec2 {
    x: number; y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vec2): Vec2 {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vec2): Vec2 {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    multiply(scalar: number): Vec2 {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    divide(v: Vec2): Vec2 {
        return new Vec2(this.x / v.x, this.y / v.y);
    }

    // https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/vector-magnitude-normalization
    // gets the length of the vector
    // pythagoras theorem
    get magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // calculates the unit vector
    // this represents the direction of the vector with a magnitude of 1
    get normalised(): Vec2 {
        if (this.magnitude > 0) return new Vec2(this.x / this.magnitude, this.y / this.magnitude);

        throw new Error("Cannot normalise a vector with magnitude 0.");
    }

    // https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/x786f2022:vectors-and-matrices/a/dot-products-mvc
    // dot product tells how much vector1 points in same direction as vector2
    // let theta be angle between vector1 and vector2
    // theta = 0; cos(theta) = 1; dot(this, v) = this.magnitude * v.magnitude * 1
    // a.b = |a||b|cosθ
    // where |a| is magnitude of a
    dot(v: Vec2): number {
        return this.x * v.x + this.y * v.y;
    }

    // pythagoras theorem; find distance between two components of two vectors
    // d = sqrt((x2 - x1) ^ 2 + (y2 - y1) ^ 2)
    distance(v: Vec2): number {
        const _x = this.x - v.x;
        const _y = this.y - v.y;
        return Math.sqrt(_x ** 2 + _y ** 2);
    }

    // calculate direction vector is pointing to; returns normalised vector
    direction(v: Vec2): Vec2 {
        return v.subtract(this).normalised;
    }

    // uses Math.atan2 to calculate angle between x axis and the point
    get toRadians(): number {
        return Math.atan2(this.y, this.x);
    }

    get toDegrees(): number {
        return this.toRadians * (180 / Math.PI);
    }

    // takes a number and returns a vector from the x axis
    static fromAngle(radians: number): Vec2 {
        return new Vec2(Math.cos(radians), Math.sin(radians));
    }
}

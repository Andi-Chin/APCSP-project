class Vector {
    constructor(xV, yV) {
        this.xV = xV;
        this.yV = yV;
        this.vec = [this.xV, this.yV];
        this.mg = Math.sqrt(this.xV * this.xV + this.yV * this.yV);
        this.unitVec = [this.xV / this.mg, this.yV / this.mg];
    }
}

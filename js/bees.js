class Bee {
    constructor(ctx, posY, canvasSize) {
        this.ctx = ctx
        this.posX = 0
        this.posY = posY
        this.velX = 3
        this.velY = 1
        this.beeWidth = 70
        this.beeHeight = 70
        this.gravity = .4
        this.beeImg = document.getElementById('imgBee')
        this.canvasSize = canvasSize

    }



    drawBee() {

        this.ctx.drawImage(this.beeImg, this.posX, this.posY, this.beeWidth, this.beeHeight)
    }


    moveBee() {
        this.posX += this.velX
        this.posY += this.velY
        this.posX >= 200 ? this.velY = -1 : null
        this.posX >= 400 ? this.velY = 1 : null
        this.posX >= 600 ? this.velY = -1 : null
        this.posX >= 800 ? this.velY = 1 : null

    }


}
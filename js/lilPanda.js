class LilPanda {
    constructor(ctx, canvasSize, posX) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.posX = posX
        this.posY = 50
        this.velY = 0.5
        this.lilPandaWidth = canvasSize.w / 13
        this.lilPandaHeight = canvasSize.h / 5
        this.lilPandaimgAlive = document.getElementById("imgLilPanda")
        this.deadlilPandaimg = document.getElementById("imgLilPandaDead")

        this.lilPandaimg = this.lilPandaimgAlive
        this.deadState = false
    }
    drawLilPanda() {
        this.ctx.drawImage(this.lilPandaimg, this.posX, this.posY, this.lilPandaWidth, this.lilPandaHeight)
    }
    moveLilPanda() {

        if (this.posY < (this.canvasSize.h / 2 - this.lilPandaHeight / 2)) {
            this.posY += this.velY
        } else {
            this.lilPandaimg = this.deadlilPandaimg
            this.lilPandaHeight = this.canvasSize.h / 6
            this.posY = 600
            this.deadState = true
        }

    }



}
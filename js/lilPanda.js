class LilPanda {
    constructor(ctx, canvasSize, posX) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.posX = posX
        this.posY = 1
        this.velY = 0.5
        this.lilPandaWidth = canvasSize.w/14
        this.lilPandaHeight = canvasSize.h/5
        this.lilPandaimg = document.getElementById("imgLilPanda")
    }
    drawLilPanda() {

        this.ctx.drawImage(this.lilPandaimg, this.posX, this.posY, this.lilPandaWidth, this.lilPandaHeight)
 
    }
    moveLilPanda() {
        console.log('charini')
        this.posY += this.velY
        console.log (this.posY)
    }
}



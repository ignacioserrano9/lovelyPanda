class LilPanda {
    constructor(ctx, canvasSize, posX) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.posX = posX
        this.posY = 1
        this.velY = 0.5
        this.lilPandaWidth = canvasSize.w / 14
        this.lilPandaHeight = canvasSize.h / 5
        this.lilPandaimg = document.getElementById("imgLilPanda")
    }
    drawLilPanda() {
        this.ctx.drawImage(this.lilPandaimg, this.posX, this.posY, this.lilPandaWidth, this.lilPandaHeight)
    }
    moveLilPanda() {
          this.posY < (this.canvasSize.h / 2-this.lilPandaHeight/2) ? this.posY += this.velY : null
    }
}
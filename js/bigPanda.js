class BigPanda {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.posX = canvasSize.w - 800
        this.posY = 300
        this.bPWeigth = 350 * 2
        this.bPHeigth = 276 * 2
        this.canvasSize = canvasSize
        this.leftDownPandaImg = document.getElementById('leftDownPanda')
        this.leftMidPandaImg = document.getElementById('leftMidPanda')
        this.leftUpPandaImg = document.getElementById('leftUpPanda')
        this.rightMidPandaImg = document.getElementById('rightMidPanda')
        this.rightUpPandaImg = document.getElementById('rightUpPanda')
        this.pandaImg = this.leftMidPandaImg
        

    }
    drawBigPanda() {

        this.ctx.drawImage(this.pandaImg, this.posX, this.posY, this.bPWeigth, this.bPHeigth)
    }

    
}


class Bee {
    constructor(ctx, posY, canvasSize) {
        this.ctx = ctx
        this.posX = 0
        this.posY = posY
        this.velX = 2
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
        
        // console.log(this.posX,this.posY)
        // if (this.posX === 200) {
        //     this.velX = 0
        //     this.posY += this.velY
        //      console.log('entro')
        //     if (this.posY === 500) {
        //     this.velY = 0
        //     this.posY += this.velY
        //      console.log('entro2')
        
        // //     this.posY > 300 ? this.velY *= -1 : null
        // //     this.posY < 50 ? this.velY *= -1 : null
        // // }
        // // else if (this.posY === 300) {
        // //     this.posX += this.velX
        // //     this.posY += this.velY
        // //     this.posY > 400 ? this.velY *= -1 : null
        // //     this.posY < 200 ? this.velY *= -1 : null

        // // }

        // // else  {
        // //     this.posX += this.velX
        // //     this.posY += this.velY
        // //     this.posY > 500 ? this.velY *= -1 : null
        // //     this.posY < 350 ? this.velY *= -1 : null

        // }

    }


}
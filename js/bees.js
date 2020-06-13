class Bee {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.posX = 0
        this.posY = undefined
        this.velX = 2
        this.velY = 1
        this.beeWidth = 70
        this.beeHeight = 70
        this.gravity = .4
        this.beeImg = document.getElementById('imgBee')
        this.canvasSize = canvasSize
        this.randomNum = (Math.floor(Math.random() * 3) - 1)
         }


    randomY() {
        if (this.randomNum === 0) {
            return this.posY = 200
        }
        if (this.randomNum === 1) {
            return this.posY = 300
        } else {
            return this.posY = 400
        }
    }

   


drawBee() {
    
    this.ctx.drawImage(this.beeImg, this.posX, this.posY,this.beeWidth, this.beeHeight )
        }


 moveBee() {
        this.posX += this.velX 
        this.posY += this.velY 

        
    }

    
}






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
        // this.pandaMoves = ['brazo D abajo', 'brazo D medio', 'brazo D alto', 'brazo I abajo', 'brazo I medio'],
        // this.currentPosition = 'brazo D abajo'

    }
    drawBigPanda() {

        this.ctx.drawImage(this.pandaImg, this.posX, this.posY, this.bPWeigth, this.bPHeigth)
    }

    armMoves() {

        switch (this.pandaImg) {
            case this.leftMidPandaImg:
                document.onkeydown = e => {
                    e.keyCode === 38 ? this.pandaImg = this.leftUpPandaImg : null
                    e.keyCode === 40 ? this.pandaImg = this.leftDownPandaImg : null
                    e.keyCode === 39 ? this.pandaImg = this.rightMidPandaImg : null
                }
                
                break
            case this.leftUpPandaImg:
                document.onkeydown = e => {

                    e.keyCode === 40 ? this.pandaImg = this.leftMidPandaImg : null
                    e.keyCode === 39 ? this.pandaImg = this.rightMidPandaImg : null
                }
                break
            case this.leftDownPandaImg:
                document.onkeydown = e => {

                    e.keyCode === 38 ? this.pandaImg = this.leftMidPandaImg : null
                    e.keyCode === 39 ? this.pandaImg = this.rightMidPandaImg : null
                }
                break
            case this.rightMidPandaImg:
                document.onkeydown = e => {

                    e.keyCode === 38 ? this.pandaImg = this.rightUpPandaImg : null
                    e.keyCode === 37 ? this.pandaImg = this.leftMidPandaImg : null
                }
                break
                case this.rightUpPandaImg :
                document.onkeydown = e => {

                    e.keyCode === 40 ? this.pandaImg = this.rightMidPandaImg: null
                    e.keyCode === 37 ? this.pandaImg = this.leftMidPandaImg : null
                }
                break
        }
    }
}


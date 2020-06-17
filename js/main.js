const Game = {

    title: 'Panda',
    author: 'Ignacio y Luciana',
    license: null,
    version: '1.0',
    canvasDom: undefined,
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    pandaImg: document.getElementById("imgPanda"),
    backgroundImg: document.getElementById("imgBackground"),
    lianaImg: document.getElementById("imgLiana"),
    bees: [],
    frames: 0,
    beePosY: undefined,
    beeName: '',
    lilPanda: {},
    bigPanda: {},
    score: 0,
    lives: 3,
    interval: undefined,




    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.drawBackground()


    },
    drawBackground() {
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth * .8
        this.canvasSize.h = 900
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    start() {
        this.lilPanda = new LilPanda(this.ctx, this.canvasSize, this.canvasSize.w - 200)
        this.bigPanda = new BigPanda(this.ctx, this.canvasSize)
//meter draws en metodo singular
        this.interval = setInterval(() => {
            this.frames++
            this.clearScreen()
            this.drawBackground()
            this.drawScore()
            this.frames % 100 === 0 ? this.randomY() : null
            this.delBee()
            this.drawLiana()
            this.armMoves()
            this.killBees()
            this.deadLilPanda()
            this.bigPanda.drawBigPanda()
            this.lilPanda.drawLilPanda()
            this.lilPanda.moveLilPanda()
            this.frames % 100 === 0 ? this.bees.push(new Bee(this.ctx, this.beePosY, this.beeName, this.canvasSize)) : null
           
            this.bees.forEach(elm => {
                elm.drawBee()
                elm.moveBee()
            })
            this.gameover()
            this.winGame() 
        }, 1000 / 60)

    },
    deadLilPanda() {
        this.lilPanda.deadState ? this.lives = 0 : null

    },

    gameover() {

        if (this.lives <= 0) {

            clearInterval(this.interval)

            this.ctx.fillStyle = '#F0FFF0'
            this.ctx.fillRect(230, 200, 800, 200)

            this.ctx.font = "100px Arial"
            this.ctx.fillStyle = "black"
            this.ctx.fillText(`GAME OVER`, 300, 330)
            this.ctx.textBaseLine = 'middle'
            this.lives=3
            this.score=0
        }



    },
    winGame() {

        if (this.score >= 2000) {

            clearInterval(this.interval)

            this.ctx.fillStyle = '#F0FFF0'
            this.ctx.fillRect(230, 200, 800, 200)

            this.ctx.font = "100px Arial"
            this.ctx.fillStyle = "green"
            this.ctx.fillText(`YOU WON!!!!!`, 310, 330)
            this.ctx.textBaseLine = 'middle'

            this.lives=3
            this.score=0

        }
    },

    drawScore() {
        this.ctx.font = "30px Arial"
        this.ctx.fillStyle = "green"
        this.ctx.fillText(`SCORE ${this.score}`, 700, 70)

        this.ctx.font = "30px Arial"
        this.ctx.fillStyle = "green"
        this.ctx.fillText(`LIVES ${this.lives}`, 1000, 70)
    },
//ternarias
    randomY() {
        if ((Math.floor(Math.random() * 3) - 1) === 0) {
            return this.beePosY = 350, this.beeName = 'topBee'
        } else if ((Math.floor(Math.random() * 3) - 1) === 1) {
            return this.beePosY = 450, this.beeName = 'midBee'
        } else {
            return this.beePosY = 600, this.beeName = 'bottomBee'
        }
    },

    delBee() {


        this.bees = this.bees.filter(bee => bee.posX <= this.canvasSize.w - 810)
    },

    drawLiana() {
        this.ctx.drawImage(this.lianaImg, this.canvasSize.w - 225, 0, this.canvasSize.w / 14, this.canvasSize.h / 2)
    },

    armMoves() {

        switch (this.bigPanda.pandaImg) {
            case this.bigPanda.leftMidPandaImg:
                document.onkeydown = e => {
                    e.keyCode === 38 ? this.bigPanda.pandaImg = this.bigPanda.leftUpPandaImg : null
                    e.keyCode === 40 ? this.bigPanda.pandaImg = this.bigPanda.leftDownPandaImg : null
                    e.keyCode === 39 ? this.bigPanda.pandaImg = this.bigPanda.rightMidPandaImg : null
                }

                break
            case this.bigPanda.leftUpPandaImg:
                document.onkeydown = e => {

                    e.keyCode === 40 ? this.bigPanda.pandaImg = this.bigPanda.leftMidPandaImg : null
                    e.keyCode === 39 ? this.bigPanda.pandaImg = this.bigPanda.rightMidPandaImg : null
                }
                break
            case this.bigPanda.leftDownPandaImg:
                document.onkeydown = e => {

                    e.keyCode === 38 ? this.bigPanda.pandaImg = this.bigPanda.leftMidPandaImg : null
                    e.keyCode === 39 ? this.bigPanda.pandaImg = this.bigPanda.rightMidPandaImg : null
                }
                break
            case this.bigPanda.rightMidPandaImg:
                document.onkeydown = e => {

                    e.keyCode === 38 ? (this.bigPanda.pandaImg = this.bigPanda.rightUpPandaImg, this.lilPanda.posY = 50) : null
                    e.keyCode === 37 ? this.bigPanda.pandaImg = this.bigPanda.leftMidPandaImg : null
                }
                break
            case this.bigPanda.rightUpPandaImg:
                document.onkeydown = e => {

                    e.keyCode === 40 ? this.bigPanda.pandaImg = this.bigPanda.rightMidPandaImg : null
                    e.keyCode === 37 ? this.bigPanda.pandaImg = this.bigPanda.leftMidPandaImg : null
                }
                break
        }
    },

    killBees() {


        this.bees.forEach(elm => {

            if (elm.beeName === 'topBee' && elm.posX === 600 && this.bigPanda.pandaImg === this.bigPanda.leftUpPandaImg) {

                return this.score += 100
            }
            if (elm.beeName === 'midBee' && elm.posX === 600 && this.bigPanda.pandaImg === this.bigPanda.leftMidPandaImg) {

                return this.score += 100
            }
            if (elm.beeName === 'bottomBee' && elm.posX === 600 && this.bigPanda.pandaImg === this.bigPanda.leftDownPandaImg) {

                return this.score += 100
            }

            if (elm.beeName === 'topBee' && elm.posX === 600 && this.bigPanda.pandaImg !== this.bigPanda.leftUpPandaImg) {

                return this.lives -= 1
            }
            if (elm.beeName === 'midBee' && elm.posX === 600 && this.bigPanda.pandaImg !== this.bigPanda.leftMidPandaImg) {

                return this.lives -= 1
            }
            if (elm.beeName === 'bottomBee' && elm.posX === 600 && this.bigPanda.pandaImg !== this.bigPanda.leftDownPandaImg) {

                return this.lives -= 1
            }
        })

    }
}
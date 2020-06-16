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
    score: 5000,
    lives: 150,

    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.start()

    },
    drawBackground() {
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    setDimensions() {
        this.canvasSize.w = 1600 //window.innerWidth
        this.canvasSize.h = 900 //window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    start() {
        this.lilPanda = new LilPanda(this.ctx, this.canvasSize, this.canvasSize.w - 200)
        this.bigPanda = new BigPanda(this.ctx, this.canvasSize)

        setInterval(() => {
            this.frames++
            this.clearScreen()
            this.drawBackground()
            this.drawScore()
            this.frames % 100 === 0 ? this.randomY() : null
            this.delBee()
            this.drawLiana()
            this.armMoves()
            this.killBees()
            this.bigPanda.drawBigPanda()
            this.lilPanda.drawLilPanda()
            this.lilPanda.moveLilPanda()
            this.frames % 100 === 0 ? this.bees.push(new Bee(this.ctx, this.beePosY, this.beeName, this.canvasSize)) : null
            this.bees.forEach(elm => {

                elm.drawBee()
                elm.moveBee()

            })
        }, 1000 / 60)

    },
    drawScore() {
        this.ctx.font = "30px Arial"
        this.ctx.fillStyle = "green"
        this.ctx.fillText("SCORE: " + this.score, 700, 70)

        this.ctx.font = "30px Arial"
        this.ctx.fillStyle = "green"
        this.ctx.fillText("LIVES: " + this.lives, 1000, 70)
    },
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

        console.log(this.lives)
        this.bees = this.bees.filter(bee => bee.posX <= this.canvasSize.w - 800)
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

                    e.keyCode === 38 ? (this.bigPanda.pandaImg = this.bigPanda.rightUpPandaImg, this.lilPanda.posY = 1) : null
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

            if (elm.beeName = 'topBee' && elm.posX === this.canvasSize.w - 900 && this.bigPanda.pandaImg !== this.bigPanda.leftUpPandaImg) {
                return this.lives - 1
            }
        })

    }
    // if (this.beeName = 'topBee' && this.bee.posX === this.canvasSize.w - 700 && this.bigPanda.pandaImg === this.bigPanda.leftUpPandaImg) {
    //     return this.lives -1

}
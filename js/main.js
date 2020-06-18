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
    scoreFrameImg: document.getElementById("bambuFrame"),
    lianaImg: document.getElementById("imgLiana"),
    audioLoop: document.getElementById('audioLoop'),
    losingAudio: document.getElementById('losingSound'),
    winningAudio: document.getElementById('winningSound'),
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

    drawScoreFrame() {
        this.ctx.drawImage(this.scoreFrameImg, this.canvasSize.w - 870, 0, 620, this.canvasSize.h / 9)
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
        this.resetBees()
        this.losingAudio.pause()
        this.playAudioBackground()
        this.lilPanda = new LilPanda(this.ctx, this.canvasSize, this.canvasSize.w - 200)
        this.bigPanda = new BigPanda(this.ctx, this.canvasSize)

        this.interval = setInterval(() => {

            this.clearScreen()
            this.drawAll()
            this.frames++
            this.frames % 100 === 0 ? this.randomY() : null
            this.delBee()
            this.movingArms()
            this.killBees()
            this.deadLilPanda()
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
    drawAll() {
        this.drawBackground()
        this.drawScoreFrame()
        this.drawScore()
        this.drawLiana()
        this.bigPanda.drawBigPanda()
        this.lilPanda.drawLilPanda()
    },

    deadLilPanda() {
        this.lilPanda.deadState ? this.lives = 0 : null

    },

    gameover() {

        if (this.lives <= 0) {

            clearInterval(this.interval)
            this.ctx.fillRect(228, 198, 804, 204)
            this.ctx.fillRect(235, 205, 805, 205)
            this.ctx.fillStyle = '#F0FFF0'
            this.ctx.fillRect(230, 200, 800, 200)

            this.drawGameStatus("100px Arial", "black", "GAME OVER", 300, 330, "middle")

            this.lives = 3
            this.score = 0

            this.audioLoop.pause()
            this.losingAudio.volume = 0.1
            this.losingAudio.play()


        }



    },
    winGame() {

        if (this.score === 2000) {

            clearInterval(this.interval)
            this.ctx.fillRect(228, 198, 804, 204)
            this.ctx.fillRect(235, 205, 805, 205)
            this.ctx.fillStyle = "	#00FF00"
            this.ctx.fillRect(200, 170, 860, 260)
            this.ctx.fillStyle = '#F0FFF0'
            this.ctx.fillRect(230, 200, 800, 200)

            this.drawGameStatus("100px Arial", "green", "YOU WON!!!!!", 310, 330, "middle")


            this.lives = 3
            this.score = 0
            this.audioLoop.pause()
            this.winningAudio.volume = 0.1
            this.winningAudio.play()
        }
    },

    drawGameStatus(font, color, text, textX, textY, position) {

        this.ctx.font = font
        this.ctx.fillStyle = color
        this.ctx.fillText(`${text}`, textX, textY)
        this.ctx.textBaseLine = position


    },


    drawScore() {

        this.drawBoard("35px Arial", "#556B2F", "SCORE", this.score, 752, 60)

        this.drawBoard("35px Arial", "#556B2F", "LIVES", this.lives, 970, 60)


    },

    drawBoard(font, color, text, name, textX, textY) {

        this.ctx.font = font
        this.ctx.fillStyle = color
        this.ctx.fillText(`${text} ${name} `, textX, textY)



    },


    randomY() {

        (Math.floor(Math.random() * 3) - 1) === 0 ? (this.beePosY = 350, this.beeName = 'topBee') : null;
        (Math.floor(Math.random() * 3) - 1) === 1 ? (this.beePosY = 450, this.beeName = 'midBee') : null;
        (Math.floor(Math.random() * 3) - 1) === 2 ? (this.beePosY = 600, this.beeName = 'bottomBee') : null

    },
    resetBees() {
        this.bees = this.bees.filter(bee => bee.posX <= 0)
    },
    delBee() {

        this.bees = this.bees.filter(bee => bee.posX <= this.canvasSize.w - 810)
    },

    drawLiana() {

        this.ctx.drawImage(this.lianaImg, this.canvasSize.w - 225, 0, this.canvasSize.w / 14, this.canvasSize.h / 2)
    },

    movingArms() {

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

            elm.beeName === 'topBee' && elm.posX === 600 && this.bigPanda.pandaImg === this.bigPanda.leftUpPandaImg ? this.score += 100 : null
            elm.beeName === 'midBee' && elm.posX === 600 && this.bigPanda.pandaImg === this.bigPanda.leftMidPandaImg ? this.score += 100 : null
            elm.beeName === 'bottomBee' && elm.posX === 600 && this.bigPanda.pandaImg === this.bigPanda.leftDownPandaImg ? this.score += 100 : null

            elm.beeName === 'topBee' && elm.posX === 600 && this.bigPanda.pandaImg !== this.bigPanda.leftUpPandaImg ? this.lives -= 1 : null
            elm.beeName === 'midBee' && elm.posX === 600 && this.bigPanda.pandaImg !== this.bigPanda.leftMidPandaImg ? this.lives -= 1 : null
            elm.beeName === 'bottomBee' && elm.posX === 600 && this.bigPanda.pandaImg !== this.bigPanda.leftDownPandaImg ? this.lives -= 1 : null


        })

    },
    playAudioBackground() {

        this.audioLoop.loop = true
        this.audioLoop.volume = 0.1
        this.audioLoop.play()

    }
}
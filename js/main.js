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
    lilPanda: {},

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
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    start() {
        this.lilPanda = new LilPanda(this.ctx, this.canvasSize, this.canvasSize.w - 200)
        setInterval(() => {
            this.frames++
            this.clearScreen()
            this.drawBackground()
            this.frames % 100 === 0 ? this.randomY() : null
            this.delBee()
            this.drawLiana()
            this.drawPanda()
            
            this.lilPanda.drawLilPanda()
            this.lilPanda.moveLilPanda()
                            this.frames % 100 === 0 ? this.bees.push(new Bee(this.ctx, this.beePosY, this.canvasSize)) : null
            this.bees.forEach(elm => {
                elm.drawBee()
                elm.moveBee()

            })
        }, 1000 / 60)

    },
    randomY() {
        if ((Math.floor(Math.random() * 3) - 1) === 0) {
            return this.beePosY = 200
        } else if ((Math.floor(Math.random() * 3) - 1) === 1) {
            return this.beePosY = 350
        } else {
            return this.beePosY = 500
        }
    },
    delBee() {
        this.bees = this.bees.filter(bee => bee.posX <= this.canvasSize.w - 700 - 70)
    },

    drawPanda() {
        this.ctx.drawImage(this.pandaImg, this.canvasSize.w - 700, 200, this.canvasSize.w / 4 + 50, this.canvasSize.h / 2)
    },
    drawLiana() {
        this.ctx.drawImage(this.lianaImg, this.canvasSize.w - 225, 0, this.canvasSize.w / 14, this.canvasSize.h / 2)
    },



}
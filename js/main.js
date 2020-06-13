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
    bees: [],
    frames: 0,


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
        setInterval(() => {
            this.frames++
            this.clearScreen()
            this.drawBackground()
            this.delBee()
            this.ctx.drawImage(this.pandaImg, this.canvasSize.w - 600, 200, this.canvasSize.w / 4 + 50, this.canvasSize.h / 2)
            this.frames % 500 === 0 ? this.bees.push(new Bee(this.ctx, this.canvasSize)) : null
            this.bees.forEach(elm => {
                elm.randomY()
                elm.drawBee()
                elm.moveBee()
                
            })
        }, 10)

    },
    
    delBee() {
        console.log(this.bees)
        this.bees = this.bees.filter(bee => bee.posX <= this.canvasSize.w - 600-70)
}}

interface ShapeData {
    id:int,
    rotation:int,
    column:int
}

import * as PIXI from 'pixi.js'
import * as data from './data.json';

export class GameContainer extends PIXI.Container {

    private shift:int = 3
    private queueIndex:int = 0
    private currentShapeData: ShapeData | undefined
    private field: int[][] | undefined
    private fieldContainer: PIXI.Graphics = new PIXI.Graphics()
    private currentShape: PIXI.Container | undefined
    private currentRow: int = 0
    private currentColumn: int = 0
    private currentArrData: int[][] | undefined
    private timer: any = null

    constructor() {
        super()
        //document.addEventListener('click', this.dropDown.bind(this), false)
        this.createField()

        this.getNext()
    }

    createField(): void {
        console.log(data.types)
        const back: PIXI.Graphics = new PIXI.Graphics()
        back.beginFill(0xffffff)
        back.drawRect(0, -(this.shift * data.boxSizeV), data.boxSizeH * data.sizeH, data.boxSizeV * (data.sizeV  + this.shift))
        back.endFill()
        this.addChild(back)

        this.field = []
        for (let i = 0; i < data.sizeH; i++) {
            this.field.push([])
            for (let j = 0; j < data.sizeV + this.shift; j++) {
                this.field[i].push(0)
            }
        }

        this.addChild(this.fieldContainer)

        this.timer = setInterval(() => this.update(), 300)
    }

    update() {
        this.dropDown()
    }





    getNext(): void {
        if(this.queueIndex + 1 > data.queue.length -1) {
            alert("Lack of the symbols in JSON")
            clearInterval(this.timer)
            return
        }
        this.queueIndex ++
        this.currentShapeData = data.queue[this.queueIndex]
        this.currentArrData = this.converToArrays(data.types[this.currentShapeData.id][this.currentShapeData.rotation])


        this.currentColumn = this.currentShapeData.column
        this.currentRow = 0
    }


    dropDown(): void {
        if(this.currentArrData) {
            if (this.checkAbilityToDraw(this.currentRow + 1, this.currentColumn, this.currentArrData)) {
                this.currentRow++
                if (this.currentArrData) {
                    this.reDraw()
                }
            } else {
                this.removeCurrentShape()
                this.drawCurrentShapeOnField()
                this.getNext()
            }
        }
    }

    checkAbilityToDraw(row: int, column: int, arrData: int[][]): boolean {
        if(!this.field) {
            return false
        }
        for (let i = 0; i < arrData.length; i++) {
            for (let j = 0; j < arrData[i].length; j++) {
                if(arrData[i][j] == 1) {
                    if(row + j > this.field[0].length - 1 || this.field[column + i][row + j] == 1) {
                        return false
                    }
                }
            }
        }

        return true
    }

    drawCurrentShapeOnField():void {
        if(!this.field || !this.currentArrData) {
            return
        }
        for (let i = 0; i < this.currentArrData.length; i++) {
            for (let j = 0; j < this.currentArrData[i].length; j++) {
                if(this.currentArrData[i][j] == 1) {
                    this.field[this.currentColumn + i][this.currentRow + j] = 1
                }
            }
        }
        this.reDrawField()
    }

   /* checkForWholeLine() {
        if(!this.field) {
            return
        }
        let fallCounter:int = 0
        for (let i = this.field.length; i >= 0; i--) {
            if(this.checkTheLine(this.field[i])) {
                fallCounter ++

                for (let k = i; k >= 0; k--) {
                    for (let j = 0; j < this.field[i].length; j++) {
                        if(this.field[k][j] == 1) {
                            this.field[k][j] = 0
                            this.field[k][j + fallCounter] = 1
                        }
                    }
                }
                this.checkForWholeLine()
            }


        }
    }

    checkTheLine(arr: int[]) {
        let counter: int = 0
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] == 1) {
                counter++
            }
        }
        return counter == arr.length
    }
*/
    reDrawField() {
        if(!this.field) {
            return
        }
        this.fieldContainer.clear()
        this.fieldContainer.beginFill(0xffeee)
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if(this.field[i][j] == 1) {
                    this.fieldContainer.drawRect(data.boxSizeH * i, data.boxSizeV * (j - this.shift), data.boxSizeH, data.boxSizeV)
                }
            }
        }
        this.fieldContainer.endFill()
    }

    drawShape(shapeConfig: int[][], color:number = 0xff0000): PIXI.Container {
        const shape: PIXI.Container = new PIXI.Container()

        let box: PIXI.Graphics
        for (let i = 0; i < shapeConfig.length; i++) {
            for (let j = 0; j < shapeConfig[i].length; j++) {
                if(shapeConfig[i][j] == 1) {
                    box = this.drawBox(color)
                    box.x = data.boxSizeH * (i + this.currentColumn)
                    box.y = data.boxSizeV * (j + this.currentRow - this.shift)
                    shape.addChild(box)
                }
            }
        }
        this.addChild(shape)
        return shape
    }

    reDraw() {
        if (this.currentArrData) {
            this.removeCurrentShape()
            this.currentShape = this.drawShape(this.currentArrData)
        }
    }

    removeCurrentShape() {
        if(this.currentShape) {
            this.currentShape.destroy({children: true})
        }
    }

    drawBox(color:number): PIXI.Graphics {
        const box: PIXI.Graphics = new PIXI.Graphics()
        box.beginFill(color)
        box.drawRect(0, 0, data.boxSizeH, data.boxSizeV)
        box.endFill()
        return box
    }


    converToArrays(arr: int[]): int[][] {
        const resArr: int[][] = []
        let counter: int = 0

        for (let i = 0; i < 3; i++) {
            resArr.push([])
            for (let j = 0; j < 3; j++) {
                resArr[i].push(arr[counter])
                counter++
            }
        }
        return resArr
    }
}
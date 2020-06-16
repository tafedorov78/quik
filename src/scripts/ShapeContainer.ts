import * as PIXI from 'pixi.js'
import * as data from './data.json';

export class ShapeContainer extends PIXI.Container {

    private shapeData: int[]
    private _rotation: int = 0
    private _column: int = 0

    constructor(shapeData: int[], rotation: int, column: int) {
        super()
        this.rotation = rotation
        this.column = column
        this.shapeData = shapeData
        this.addChild(this.drawShape())
    }

    drawShape(): PIXI.Container {
        const shape: PIXI.Container = new PIXI.Container()

        let box: PIXI.Graphics
        for (let i = 0; i < this.shapeData.length; i++) {
            if(this.shapeData[i] == 1) {
                box = this.drawBox()

                let posJ: int = Math.floor(i / 3)
                let posI: int = i > 2 ? i - posJ * 3: i
                box.x = data.boxSizeH * posI
                box.y = data.boxSizeV * posJ
                shape.addChild(box)
            }
        }
        return shape
    }

    drawBox(): PIXI.Graphics {
        const box: PIXI.Graphics = new PIXI.Graphics()
        box.beginFill(0xff0000)
        box.drawRect(0, 0, data.boxSizeH, data.boxSizeV)
        box.endFill()
        return box
    }

    set rotation(value: number) {
        this._rotation = value
    }

    set column(value: number) {
        this._column = value
    }

    get rotation():int {
        return this._rotation
    }

    get column():int {
        return this._column
    }


}
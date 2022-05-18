const Emitter = require("mEmitter")
const emitName = require("emitName")

cc.Class({
    extends: cc.Component,

    properties: {
        _width: 4,
        _isMoveRight: false,
        _canMoveLeft: true,
        _canMoveRight: true,
        _canMoveUp: true,
        _canMoveDown: true,
        getParentBlock: cc.Component,
    },

    onLoad() {
        this.evtMoveUp = this.moveUpCombined.bind(this)
        this.evtMoveDown = this.moveDownCombined.bind(this)
        this.evtMoveLeft = this.moveLeftCombined.bind(this)
        this.evtMoveRight = this.moveRightCombined.bind(this)

        Emitter.instance.registerEvent(emitName.moveUp, this.evtMoveUp)
        Emitter.instance.registerEvent(emitName.moveDown, this.evtMoveDown)
        Emitter.instance.registerEvent(emitName.moveLeft, this.evtMoveLeft)
        Emitter.instance.registerEvent(emitName.moveRight, this.evtMoveRight)
    },
    start() {

    },

    moveLeft(listBlock, arrayBlock) {
        for (let index = 0; index < 4; index++) {
            let totalOne = arrayBlock[index]
            let totalTwo = arrayBlock[index + this._width]
            let totalThree = arrayBlock[index + (this._width * 2)]
            let totalFour = arrayBlock[index + (this._width * 3)]
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filterColumn = column.filter(num => num)
            let missing = this._width - filterColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filterColumn.concat(zeros)

            listBlock[index].getComponent("block").labelPrefab.string = newColumn[0]
            listBlock[index + this._width].getComponent("block").labelPrefab.string = newColumn[1]
            listBlock[index + (this._width * 2)].getComponent("block").labelPrefab.string = newColumn[2]
            listBlock[index + (this._width * 3)].getComponent("block").labelPrefab.string = newColumn[3]

            arrayBlock[index] = newColumn[0]
            arrayBlock[index + this._width] = newColumn[1]
            arrayBlock[index + (this._width * 2)] = newColumn[2]
            arrayBlock[index + (this._width * 3)] = newColumn[3]
        }
    },
    moveRight(listBlock, arrayBlock) {
        for (let index = 0; index < 4; index++) {
            let totalOne = arrayBlock[index]
            let totalTwo = arrayBlock[index + this._width]
            let totalThree = arrayBlock[index + (this._width * 2)]
            let totalFour = arrayBlock[index + (this._width * 3)]
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filterColumn = column.filter(num => num)
            let missing = this._width - filterColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filterColumn)
            

            listBlock[index].getComponent("block").labelPrefab.string = newColumn[0]
            listBlock[index + this._width].getComponent("block").labelPrefab.string = newColumn[1]
            listBlock[index + (this._width * 2)].getComponent("block").labelPrefab.string = newColumn[2]
            listBlock[index + (this._width * 3)].getComponent("block").labelPrefab.string = newColumn[3]

            arrayBlock[index] = newColumn[0]
            arrayBlock[index + this._width] = newColumn[1]
            arrayBlock[index + (this._width * 2)] = newColumn[2]
            arrayBlock[index + (this._width * 3)] = newColumn[3]

            let newX = {
                x1: listBlock[index].x,
                x2: listBlock[index + this._width].x,
                x3: listBlock[index + (this._width * 2)].x,
                x4: listBlock[index + (this._width * 3)].x,
            }
            // cc.log(listBlock[index].getComponent("block").labelPrefab.string >0)
            if(listBlock[index].getComponent("block").labelPrefab.string >0){
                cc.tween(listBlock[index])
                    .to(0,{x:0})
                    .to(5, {x:newX.x1})
                    .start()
            }
            // cc.tween(listBlock[index+ this._width])
            //     .to(0,{x:0})
            //     .to(5, {x:newX.x2})
            //     .start()
            // cc.log("new X: ",newX)

        }
    },
    moveDown(listBlock, arrayBlock) {
        for (let index = 0; index < 16; index++) {
            if (index % 4 === 0) {
                let totalOne = arrayBlock[index]
                let totalTwo = arrayBlock[index + 1]
                let totalThree = arrayBlock[index + 2]
                let totalFour = arrayBlock[index + 3]
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filterRow = row.filter(num => num)
                let missing = this._width - filterRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filterRow.concat(zeros)

                listBlock[index].getComponent("block").labelPrefab.string = newRow[0]
                listBlock[index + 1].getComponent("block").labelPrefab.string = newRow[1]
                listBlock[index + 2].getComponent("block").labelPrefab.string = newRow[2]
                listBlock[index + 3].getComponent("block").labelPrefab.string = newRow[3]

                arrayBlock[index] = newRow[0]
                arrayBlock[index + 1] = newRow[1]
                arrayBlock[index + 2] = newRow[2]
                arrayBlock[index + 3] = newRow[3]
            }
        }
    },
    moveUp(listBlock, arrayBlock) {
        this._isMoveRight = true
        for (let index = 0; index < 16; index++) {
            if (index % 4 === 0) {
                let totalOne = arrayBlock[index]
                let totalTwo = arrayBlock[index + 1]
                let totalThree = arrayBlock[index + 2]
                let totalFour = arrayBlock[index + 3]
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filterRow = row.filter(num => num)
                let missing = 4 - filterRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filterRow)

                listBlock[index].getComponent("block").labelPrefab.string = newRow[0]
                listBlock[index + 1].getComponent("block").labelPrefab.string = newRow[1]
                listBlock[index + 2].getComponent("block").labelPrefab.string = newRow[2]
                listBlock[index + 3].getComponent("block").labelPrefab.string = newRow[3]

                arrayBlock[index] = newRow[0]
                arrayBlock[index + 1] = newRow[1]
                arrayBlock[index + 2] = newRow[2]
                arrayBlock[index + 3] = newRow[3]
            }
        }
    },

    combineDown(listBlock, arrayBlock) {
        for (let index = 0; index <= 15; index++) {
            if (arrayBlock[index] === arrayBlock[index + 1]) {
                if ((index + 1) % 4 == 0) {

                }
                else {
                    let combinedTotal = arrayBlock[index] + arrayBlock[index + 1]
                    listBlock[index].getComponent("block").labelPrefab.string = combinedTotal
                    listBlock[index + 1].getComponent("block").labelPrefab.string = 0
                    arrayBlock[index] = combinedTotal
                    arrayBlock[index + 1] = 0
                }
            }

        }
    },
    combineUp(listBlock, arrayBlock) {
        for (let index = 15; index >= 0; index--) {
            if (arrayBlock[index] === arrayBlock[index + 1]) {
                if ((index + 1) % 4 == 0) {

                }
                else {
                    let combinedTotal = arrayBlock[index] + arrayBlock[index + 1]
                    listBlock[index + 1].getComponent("block").labelPrefab.string = combinedTotal
                    listBlock[index].getComponent("block").labelPrefab.string = 0
                    arrayBlock[index + 1] = combinedTotal
                    arrayBlock[index] = 0
                }
            }

        }
    },
    combineLeft(listBlock, arrayBlock) {
        for (let index = 0; index <= 15; index++) {
            if (arrayBlock[index] === arrayBlock[index + this._width]) {
                let combinedTotal = arrayBlock[index] + arrayBlock[index + this._width]
                listBlock[index].getComponent("block").labelPrefab.string = combinedTotal
                listBlock[index + this._width].getComponent("block").labelPrefab.string = 0

                arrayBlock[index] = combinedTotal
                arrayBlock[index + this._width] = 0
            }
        }
    },

    combineRight(listBlock, arrayBlock) {
        for (let index = 15; index >= 0; index--) {
            if (arrayBlock[index] == arrayBlock[index + this._width]) {
                let combinedTotal = arrayBlock[index] + arrayBlock[index + this._width]
                listBlock[index].getComponent("block").labelPrefab.string = combinedTotal
                listBlock[index + this._width].getComponent("block").labelPrefab.string = 0

                arrayBlock[index] = combinedTotal
                arrayBlock[index + this._width] = 0
            }
        }
    },

    moveRightCombined(listBlock, arrayBlock) {
        this.moveRight(listBlock, arrayBlock)
        this.combineRight(listBlock, arrayBlock)
        this.moveRight(listBlock, arrayBlock)
        if (arrayBlock.includes(0)) {
            Emitter.instance.emit(emitName.generate)
        }
        else {
           this.canMoveRow(arrayBlock)
        }
    },
    moveLeftCombined(listBlock, arrayBlock) {
        this.moveLeft(listBlock, arrayBlock)
        this.combineLeft(listBlock, arrayBlock)
        this.moveLeft(listBlock, arrayBlock)
        if (arrayBlock.includes(0)) {
            Emitter.instance.emit(emitName.generate)
        }
        else {
            this.canMoveRow(arrayBlock)
        }
    },
    moveUpCombined(listBlock, arrayBlock) {
        this.moveUp(listBlock, arrayBlock)
        this.combineUp(listBlock, arrayBlock)
        this.moveUp(listBlock, arrayBlock)
        if (arrayBlock.includes(0)) {
            Emitter.instance.emit(emitName.generate)

        }
        else {
            this.canMoveColumn(arrayBlock)
        }
    },
    moveDownCombined(listBlock, arrayBlock) {
        this.moveDown(listBlock, arrayBlock)
        this.combineDown(listBlock, arrayBlock)
        this.moveDown(listBlock, arrayBlock)
        if (arrayBlock.includes(0)) {
            Emitter.instance.emit(emitName.generate)

        }
        else {
            this.canMoveColumn(arrayBlock)
        }
    },
    canMoveRow(arrayBlock){
        for(let index =0; index<=15; index++){
            //move row
            if(arrayBlock[index] == arrayBlock[index+1] ){
                if((index + 1) % 4 == 0)
                this._canMoveRight = true
            }else{
                this._canMoveRight = false
            }
        }
        this.isLose()
        cc.log("can't move row")
    },
    canMoveColumn(arrayBlock){
        for(let index =0; index<=15; index++){
            //move column
            if (arrayBlock[index] == arrayBlock[index + this._width]){
                this._canMoveDown = true
            }else{
                cc.log('cant move column')
                this._canMoveDown = false
            }
        }
        this.isLose()
    },
    isLose(){
        cc.log(this._canMoveRight,this._canMoveRight)
        if(this._canMoveRight == false && this._canMoveDown == false){
            cc.log("you lose")
        }
        // if(this._canMoveRight){
        //     this._canMoveRight = true
        //     this._canMoveDown = true
        // }
    }

    // update (dt) {},
});

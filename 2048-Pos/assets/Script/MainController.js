const Emitter = require("mEmitter")
const emitName = require("emitName")
const Colors = require("color");

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad () {
        Emitter.instance = new Emitter()

        this.evtSetColor = this.setColor.bind(this)
        Emitter.instance.registerEvent(emitName.blockColor, this.evtSetColor)
    },

    start () {

    },
    
    setColor(listBlock,arrayBlock){
        const color = Colors
        for(let index = 0; index < 16; index++){
            if(arrayBlock[index]== 0){
                listBlock[index].getComponent("block").labelPrefab.string = ""
                listBlock[index].color = color[0]
            }
            if(arrayBlock[index]== 2){
                listBlock[index].color = color[2]
            }
            if(arrayBlock[index]== 4){
                listBlock[index].color = color[4]
            }
            if(arrayBlock[index]== 8){
                listBlock[index].color = color[8]
            }
            if(arrayBlock[index]== 16){
                listBlock[index].color = color[16]
            }
            if(arrayBlock[index]== 32){
                listBlock[index].color = color[32]
            }
            if(arrayBlock[index]== 64){
                listBlock[index].color = color[64]
            }
            if(arrayBlock[index]== 128){
                listBlock[index].color = color[128]
            }
            if(arrayBlock[index]== 256){
                listBlock[index].color = color[256]
            }
            if(arrayBlock[index]== 512){
                listBlock[index].color = color[512]
            }
            if(arrayBlock[index]== 1024){
                listBlock[index].color = color[1024]
            }
            if(arrayBlock[index]== 2048){
                listBlock[index].color = color[2048]
            }
        }
    },


    // update (dt) {},
});

import { _decorator, Color, Component, Label, Node, randomRangeInt, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rowPrefabLogic')
export class rowPrefabLogic extends Component {

    @property( {type : Label} )
    rowNumber : Label = null ;
    
    @property({ type: Node })
    userImageNode: Node = null;
    
    @property({type:Label})
    nameLabel:Label = null;
    
    @property({type:Label})
    scoreLabel:Label = null;
    
    @property({ type: Node })
    ratingImgNode: Node = null;






    @property({ type: [SpriteFrame] })
    userImg: SpriteFrame[] = [];

    @property({ type: [String] })
    names: string[] = [];

    @property({ type: [Number] })
    scores: number[] = [];

    @property({ type: [SpriteFrame] })
    ratingImg: SpriteFrame[] = [];




    setRowData(index: number , rowNum : number ) {
        // Set user image
        // this.node.getComponent(Sprite).spriteFrame = this.userImg[index];
        // this.node.getComponent(Sprite).getComponent(UITransform).setContentSize(50 , 50);
        
        
        this.rowNumber.string = rowNum.toString() ;


        this.userImageNode.getComponent(Sprite).spriteFrame = this.userImg[index];
        this.userImageNode.getComponent(UITransform).setContentSize(50 , 50) ;
        
        // set user name
        this.nameLabel.string = this.names[index];
        this.nameLabel.color = new Color( 0 , 0 , 0 )  ;
        
        // set user score
        this.scoreLabel.string = this.scores[index].toString();
        this.scoreLabel.color = new Color( 0 , 0 , 0 )  ;
        
        
        this.ratingImgNode.getComponent(Sprite).spriteFrame = this.ratingImg[randomRangeInt(0, 3)];
        this.ratingImgNode.getComponent(UITransform).setContentSize(100 , 30) ;
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


import { _decorator, Color, color, Component, instantiate, Label, Node, Prefab, randomRangeInt, ScrollView, UITransform } from 'cc';
import { rowPrefabLogic } from './rowPrefabLogic';
const { ccclass, property } = _decorator;

@ccclass('scrollViewLogic')
export class scrollViewLogic extends Component {

    @property( {type : ScrollView} )
    scrollViewNode : ScrollView | null = null ;
    @property(Node)
    contentNode: Node | null = null; 

    @property( {type : Prefab} )
    rowPrefab : Prefab | null = null ;


    private rowNum :number = 0; 
    private isBottom = true; 

    start() 
    {



        // const leaderboardData: { name: string, score: number }[] = [
        //     { name: "Player 1", score: 75 },
        //     { name: "Player 2", score: 73 },
        //     { name: "Player 3", score: 80 },
        //     { name: "Player 4", score: 68 },
        //     { name: "Player 5", score: 66 },
        //     { name: "Player 6", score: 96 },
        //     { name: "Player 7", score: 80 },
        //     { name: "Player 8", score: 76 },
        //     { name: "Player 9", score: 99 },
        //     { name: "Player 10", score: 80 },
        //     { name: "Player 11", score: 10 },
        //     { name: "Player 12", score: 40 },
        //     { name: "Player 13", score: 60 },
        //     { name: "Player 14", score: 30 },
        //     { name: "Player 15", score: 80 },
        //     // Add more entries as needed
        // ];
        // let rowGap = 100 ;
        // let contentNodeWidth = this.contentNode.getComponent(UITransform).width ;
        // let contentNodeHeight = rowGap * leaderboardData.length ;
        // this.contentNode.getComponent(UITransform).setContentSize( contentNodeWidth , contentNodeHeight + 100 );
        // leaderboardData.forEach((entry, index) => {
        //     const labelNode: Node = new Node();
        //     labelNode.setParent(this.contentNode); 
        //     const labelComponent: Label = labelNode.addComponent(Label);
        //     labelComponent.string = `${entry.name}: ${entry.score}`; // Set the text content
        //     labelComponent.fontSize = 24;
        //     labelComponent.color = new Color( 0 , 0 , 0 )  ;
        //     labelNode.setPosition(0, -(index + 1) * rowGap); // Adjust position based on index and label height
        // });

        





        this.scrollViewNode?.node.on('scroll-to-bottom', this.onScrollToBottom, this);
        this.addRow() ;



        
    }

    onScrollToBottom() {
        this.isBottom = true;
        // this.addRow();     


        // // uncomment the above if we want to make infinite scroll bar without buttom ( load more)       
        // // either comment it if we want to make infinite scroll bar with buttom ( load more)      
         
        // // if we remove it then whenever we click on loadmoe buttom only then it will      
        // // add 20 more rows ensuring that scroll bar is at the end     
        //
        // // but it we add the above it will automatically add the 20 more rows to the content    
        // // whenever scroll bar is at the end and we don't need to click on the buttom     
        //   
        //    
        // // both are infinite but one is infinite like when we click on load more buttom    
        // // and 2nd it infinite whenever scrollbar reahed at the end    
    }

    addRow()
    {
        if( ! this.isBottom ) return ;
        console.log( "add more "  ) ;
        // const rowArray:Node[] = [ ] ;
        let numrows = 10 ;
        for(let i = 0; i < numrows; i++) 
        {
            let rowInstance = instantiate(this.rowPrefab);
            // let index = randomRangeInt(0, 10) ;
            this.rowNum ++ ;
            rowInstance.getComponent(rowPrefabLogic).setRowData(i , this.rowNum); // Pass index i
            rowInstance.setParent(this.contentNode);
        }
        this.isBottom = false  ;  
    }



    update(deltaTime: number) {
        
    }
}


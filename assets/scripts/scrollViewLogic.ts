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


    private rowNum :number = -1 ; 
    private isTop = true; 
    private isBottom = true; 

    start() 
    {


        // // // // //  using array fo object and add rows only 
        // // // // //  using array fo object and add rows only 
        // // // // //  using array fo object and add rows only 
        //
        //
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

        





        //
        // // // //  Using prefab and additional functionality such as infinit scroll or on click  scroll
        // // // //  Using prefab and additional functionality such as infinit scroll or on click  scroll
        // // // //  Using prefab and additional functionality such as infinit scroll or on click  scroll
        //
        // // // also optimezed means it remove rows which is not showing
        // // // also optimezed means it remove rows which is not showing
        // // // also optimezed means it remove rows which is not showing
        //
        //


        this.scrollViewNode.node.on('scroll-to-top', this.onScrollToTop, this);
        this.scrollViewNode.node.on('scroll-to-bottom', this.onScrollToBottom, this);
        // this.addRowFromTop() ;
        this.addRowFromBottom() ;



        
    }


    //
    // // // //  Using prefab and additional functionality such as infinit scroll or on click  scroll
    // // // //  Using prefab and additional functionality such as infinit scroll or on click  scroll
    // // // //  Using prefab and additional functionality such as infinit scroll or on click  scroll
    //
    // // // also optimezed means it remove rows which is not showing
    // // // also optimezed means it remove rows which is not showing
    // // // also optimezed means it remove rows which is not showing
    //
    //

    onScrollToTop()
    {
        this.isTop = true ; 
        this.addRowFromTop() ;
    }

    onScrollToBottom() {
        this.isBottom = true;
        this.addRowFromBottom();     


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
        // // and 2nd it infinite whenever scrollbar reached at the end    
    }



    addRowFromTop()
    {
        if( ! this.isTop ) return ;
        let topSrNo = this.contentNode.children[0].getChildByName('rowNumber').getComponent(Label).string ;
        console.log( " ser no => " , topSrNo ) ;
        if( parseInt(topSrNo) == 1) return ;
        console.log( "add more row from top "  ) ;
        this.rowNum = parseInt(topSrNo);

        let numrows = 20 ;
        for(let i = 0; i < numrows+10; i++) 
        {
            let rowInstance = instantiate(this.rowPrefab);
            let index = randomRangeInt(0, 10) ;
            this.rowNum -- ;
            if( this.rowNum == 0 ) break ;
            rowInstance.getComponent(rowPrefabLogic).setRowData(index , this.rowNum); // Pass index i
            this.contentNode.insertChild(rowInstance, 0);
        }
        this.isTop = false  ; 
        let childCount = this.contentNode.children.length ;
        console.log( "  top size before => " , childCount ) ; 
        if( childCount > numrows * 2 )
        {
            console.log("Removing rows from the bottom");
            // Remove the first 10 children from the content node
            for (let i = childCount-1; i >= childCount-(numrows/2); i-- ) {
                this.contentNode.removeChild(this.contentNode.children[i]);
            }
        }
        console.log( "  top size after => " , this.contentNode.children.length ) ; 
    }



    addRowFromBottom()
    {
        if( ! this.isBottom ) return ;
        console.log( "add more from bottom "  ) ;


        let childCount = this.contentNode.children.length ;
        console.log( "  bottom size before => " , childCount , "  rowNum " , this.rowNum ) ; 
        if( this.rowNum > 0 )
        {
            let topSrNo = this.contentNode.children[childCount-1].getChildByName('rowNumber').getComponent(Label).string ;
            // console.log( " ser no => " , topSrNo ) ;
            console.log( "add more row from top "  ) ;
            this.rowNum = parseInt(topSrNo);
        }
        else this.rowNum = childCount ;

        let numrows = 10 ;
        // this.rowNum = childCount ;
        for(let i = 0; i < numrows; i++) 
        {
            let rowInstance = instantiate(this.rowPrefab);
            let index = randomRangeInt(0, 10) ;
            this.rowNum ++ ;
            rowInstance.getComponent(rowPrefabLogic).setRowData(index , this.rowNum); // Pass index i
            rowInstance.setParent(this.contentNode);
        }
        this.isBottom = false  ; 
        
        // console.log( "  bottom size before => " , childCount ) ; 
        if( childCount >= numrows * 2 )
        {
            console.log("Removing rows from the top");
            // Remove the first 10 children from the content node
            for (let i = 0; i < numrows/2; i++) 
            {
                this.contentNode.removeChild(this.contentNode.children[0]);
            }
        }
        console.log( "  bottom size after => " , this.contentNode.children.length ) ; 
    }

    


    update(deltaTime: number) {
        
    }
}


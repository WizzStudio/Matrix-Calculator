import Taro, { Component } from '@tarojs/taro'
import {AtGrid} from 'taro-ui'
export default class KeyBoard extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this)
        this.state = {
            data: [
                {value:'AC'},
                {value:'A-1'},
                {value:'行最简'},
                {value:'det'},
                {value:'+'},
                {value:'-'},
                {value:'×'},
                {value:'删除'},
                {value:'7'},
                {value:'8'},
                {value:'9'},
                {value:'→',},
                {value:'4'},
                {value:'5'},
                {value:'6'},
                {value:'回车'},
                {value:'1'},
                {value:'2'},
                {value:'3'},
                {value:'+/-'},
                {value:'.'},
                {value:'0'},
                {value:'/'},
                {value:'='}
              ],
        }
    }

    handleClick(item,index){
        
        let{line,row}=this.props
        switch(index){
          case 0:this.props.onClear();break;
          case 1:
          case 2:
          case 3:this.props.onOperate(item.value);break;
          case 4:
          case 5:this.props.onOperate(item.value);this.props.onAddMatrix(line,row);break;
          case 6:this.props.onOperate(item.value);this.props.onAddMatrix(row,line);break;
          case 7:this.props.onBackspace();break;
    
          case 15:this.props.onKeepInput('');this.props.onAddRow();break;
          case 11:this.props.onKeepInput('');this.props.onAddLine();break;
          case 8:
          case 9:
          case 10:
          case 12:
          case 13:
          case 14:
          case 16:
          case 17:
          case 18:
          case 21:
          case 20:
          case 22:this.props.onKeepInput(item.value);break;
          case 19:this.props.onKeepInput(item.value[2]);break;
          case 23:this.props.onCalculate();this.props.onClickhandle();break;
        }
        let {hasResult}=this.props
        if(hasResult!=''){
            this.props.onClear()
        }
      }

    render(){
        let {data}=this.state
        return(
            <AtGrid
            data={data} 
            onClick={this.handleClick} 
            mode='rect' 
            hasBorder={true} 
            columnNum={4} 
            />
        )
    }
}
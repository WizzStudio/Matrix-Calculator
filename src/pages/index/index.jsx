import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import {AtGrid} from 'taro-ui'
import Matrix from '../../components/Matrix/matrix'
export default class Index extends Component {
  constructor(){
    super()
    this.state={
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
      line:1,
      row:1,
      matrix:[['']],
      inputNum:'',
      focuson:[0,0]
    }
  }
  config = {
    navigationBarTitleText: '矩阵计算器'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onAddRow(){
    let {matrix,line,row} = this.state
    for(let i=0;i<line;i++){
      matrix[i].push('')
      console.log("箭头line",i,'push a',matrix[i])
      console.log("row++",++row)
    }
    this.setState({
      row,
      matrix
    })
    this.onStopInput(matrix)
  }
  onAddLine(){
    let {matrix,row,line}=this.state
    let array=new Array(row).fill('')
    
    console.log("arr",array)
    matrix.push(array)
    console.log("回车matrix",matrix)
    console.log("line++",++line)
    this.setState({
      line,
      matrix
    })
    this.onStopInput(matrix)
  }
  onStopInput(nums){
    this.setState({
      matrix:nums,
      inputNum:''
    })
  }
  onKeepInput(value){
    let{inputNum,matrix,focuson}=this.state
    inputNum+=value
    matrix[focuson[0]][focuson[1]]=inputNum
    this.setState({
      inputNum,
      matrix
    }),function(){
      console.log("inputNum",inputNum)
    }
  }
  onBackspace(){
    let {inputNum}=this.state
    let l=inputNum.length
    let newinput=inputNum.substring(0,l-1)
    this.setState({
      inputNum:newinput
    })
  }
  onFocushandle(x,y){
    let {inputNum,matrix,focuson}=this.state
    if(x==focuson[0]&&y==focuson[1]){
        this.setState({
          inputNum:matrix[x][y]
        })
    }
    else{
      matrix[focuson[0]][focuson[1]]=inputNum
      this.setState({
        matrix,
        inputNum:'',
        focuson:[x,y]
      })
    }
  }
  onUnchangeInput(x,y){
    let {inputNum}=this.state
    matrix[x][y]=inputNum
    this.setState({
      matrix,
    })
  }
  onChangefocus(x,y){
    this.setState({
      focuson:[x,y]
    })
  }
  handleClick = (item,index) => {
    // console.log(item.value,index);
    switch(index){
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:this.onStopInput();break;
      case 7:this.onBackspace();break;

      case 15:this.onAddLine();break;
      case 11:this.onAddRow();break;
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
      case 22:this.onKeepInput(item.value);break;
    }
  }
  
  render () {
    const {inputNum,matrix,data,focuson}=this.state
    return (
      <View className='index'>
  `   <h1>{inputNum}</h1>
      <h1>{focuson}</h1>
        <Matrix
          matrix={matrix}
          inputNum={inputNum}
          onFocushandle={this.onFocushandle.bind(this)}
          onKeepInput={this.onKeepInput.bind(this)}
          onStopInput={this.onStopInput.bind(this)}
        ></Matrix>
        <View className='grid'>
          <AtGrid 
            data={data} 
            onClick={this.handleClick.bind(this)} 
            mode='rect' 
            hasBorder={true} 
            columnNum={4} 
          />
        </View>
      </View>
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import {AtGrid} from 'taro-ui'
import Matrix from '../../components/Matrix/matrix'
import KeyBoard from '../../components/keyboard/keyboard'
import {add,multiply, det,subtract,transpose,inv,rref} from '../../components/operate'
import Result from '../../components/Result/result'
export default class Index extends Component {
  constructor(){
    super()
    this.state={
      line:1,
      row:1,
      onMatrix:0,
      matrix:[[['']]],
      inputNum:'',
      focuson:[0,0,0],
      isOperate:[''],
      isResult:[0,['']],
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
    let {matrix,line,row,onMatrix} = this.state
    for(let i=0;i<line;i++){
      matrix[onMatrix][i].push('')   
    }
    console.log("row++",++row)
    console.log("扩列matrix",matrix)
    this.setState({
      row,
      matrix,
      inputNum:''
    })
  }

  onAddLine(){
    let {matrix,row,line,onMatrix}=this.state
    let array=new Array(row).fill('')
    matrix[onMatrix].push(array)
    console.log("回车matrix",matrix)
    console.log("line++",++line)
    this.setState({
      line,
      matrix,
      inputNum:''
    })
    // this.onStopInput(matrix)
  }

  onAddMatrix(line,row){
    let {matrix}=this.state
    let array=new Array()
    for(let i=0;i<line;i++){
      let arr=new Array(row).fill('')
      array.push(arr)
    }
    matrix.push(array)
    this.setState({
      matrix,
      inputNum:''
    })
    console.log("按非数字键matrix")
  }

  onKeepInput(value){
    let{inputNum,matrix,focuson}=this.state
    inputNum+=value
    matrix[focuson[0]][focuson[1]][focuson[2]]=inputNum
    console.log('按数字键更新matrix',inputNum)
    this.setState({
      inputNum,
      matrix
    })
  }

  onBackspace(){
    let {focuson,inputNum,matrix}=this.state
    let l=inputNum.length
    let newinput=inputNum.substring(0,l-1)
    if(l<=0){ 
      newinput=''
    }
    matrix[focuson[0]][focuson[1]][focuson[2]]=newinput
    this.setState({
      inputNum:newinput,
      matrix
    })
  }

  onClear(){
    this.setState({
      line:1,
      row:1,
      onMatrix:0,
      matrix:[[['']]],
      inputNum:'',
      focuson:[0,0,0],
      isOperate:[''],
      isResult:[0,['']],
    })
  }
  onFocushandle(i,x,y){
    let {inputNum,matrix,focuson}=this.state
    if(x==focuson[1]&&y==focuson[2]&&i==focuson[0]){
      console.log("点击矩阵中某值",matrix[i][x][y],inputNum)
        this.setState({
          inputNum:matrix[i][x][y]
        })
    }
    else{
      this.setState({
        inputNum:matrix[i][x][y],
        focuson:[i,x,y],
        onMatrix:i
      })
    }
  }

  onOperate(operate){
    let {isOperate}=this.state
    isOperate.push(operate);  
    this.setState({
      isOperate,
    })
  }

  
  onCalculate(){
    let{isResult,isOperate,matrix,line}=this.state
    isResult[0]++
    let op=isOperate[isResult[0]]
    console.log("oper",op)
    console.log("resul",isResult[0])
    let re
    console.log("ma",matrix);
    
    switch(op){
      case 'A-1':re=inv(matrix[isResult[0]-1]);break;
      case '行最简':let array=JSON.parse(JSON.stringify(matrix[isResult[0]-1]))
                    console.log("aaray",array)
                    let ar=new Array(line).fill(0);re=rref(array,ar,line);break;
      case '+':re=add(matrix[isResult[0]],matrix[isResult[0]-1]);break;
      case '-':re=subtract(matrix[isResult[0]-1],matrix[isResult[0]]);break;
      case 'det':re=det(matrix[isResult[0]-1]);let arr=[];arr[0]=[];arr[0].push(re);re=arr;break;
      case '×':re=multiply(transpose(matrix[isResult[0]-1]),transpose(matrix[isResult[0]]));break;
    }
    console.log(re)
    isResult[1].push(re)
    console.log("isRe",isResult[1][1])
    this.setState({
      isResult:isResult,
    })  
  }
  

  
  render () {
    const {onMatrix,inputNum,matrix,focuson,isOperate,isResult,line,row}=this.state
    return (
      <View className='index'>
        <View className="operate">
          <View className="function at-row at-row__justify--end">
          {isOperate.map((val,index)=>{
            return(
                <View className="addfunction">
                <h1 className="opertext">{val}</h1>
                {val!='det'&&val!='A-1'&&val!='行最简'&&<Matrix className="Matrix"
                  posMatrix={index}
                  matrix={matrix[index]}
                  inputNum={inputNum}
                  onFocushandle={this.onFocushandle.bind(this)}
                ></Matrix>}
                </View>
                )     
              })
            }{isResult[0]!=0&&<h1>=</h1>}
          </View> 

          <View className="result at-row at-row__justify--end">
          {isResult[0]!=0&&<Result matrix={isResult[1][isResult[0]]}></Result>}
          </View>
      </View>    
      

          <View className="at-col-12">
            <KeyBoard
              line={line}
              row={row}
              hasResult={isResult[isResult[0]]}
              onClear={this.onClear.bind(this)}
              onAddRow={this.onAddRow.bind(this)}
              onAddLine={this.onAddLine.bind(this)}
              onAddMatrix={this.onAddMatrix.bind(this)}
              onBackspace={this.onBackspace.bind(this)}
              onCalculate={this.onCalculate.bind(this)}
              onKeepInput={this.onKeepInput.bind(this)}
              onOperate={this.onOperate.bind(this)}
              ></KeyBoard>
          </View> 

       
      </View>
    )
  }
}

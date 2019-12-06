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
    this.onClear=this.onClear.bind(this)
    this.onFocushandle=this.onFocushandle.bind(this)
    this.onKeepInput=this.onKeepInput.bind(this)
    this.onOperate=this.onOperate.bind(this)
    this.onAddLine=this.onAddLine.bind(this)
    this.onAddMatrix=this.onAddMatrix.bind(this)
    this.onAddRow=this.onAddRow.bind(this)
    this.onBackspace=this.onBackspace.bind(this)
    this.onCalculate=this.onCalculate.bind(this)
    this.onClickhandle=this.onClickhandle.bind(this)
    this.autoCheck=this.autoCheck.bind(this)
    this.state={
      userInfo:'',
      line:1,
      row:1,
      onMatrix:0,
      matrix:[[['']]],
      inputNum:'',
      focuson:[0,0,0],
      isonOperate:0,
      isOperate:[],
      isResult:[0,[]],
    }
    Taro.getUserInfo().then((res)=>{
      this.setState({
        userInfo:res.userInfo
      })
    });
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
    let {matrix,line,row,onMatrix,focuson} = this.state
    // if(line>1&&row>1)
      // this.autoCheck()
    for(let i=0;i<line;i++){
      matrix[onMatrix][i].push('')   
    }
    console.log("row++",++row)
    console.log("扩列matrix",matrix)
    focuson=[onMatrix,0,row-1]
    this.setState({
      row,
      matrix,
      inputNum:'',
      focuson
    })
  }

  onAddLine(){
    let {matrix,row,line,onMatrix,focuson}=this.state
    // 原本想直接用filter删去假值，但考虑到若只有部分为空重新渲染时会产生问题，没想到什么好办法
    // if(line>1&&row>1)
      // this.autoCheck()
    let array=new Array(row).fill('')
    matrix[onMatrix].push(array)
    console.log("回车matrix",matrix)
    console.log("line++",++line)
    focuson=[onMatrix,line-1,0]
    this.setState({
      line,
      matrix,
      inputNum:'',
      focuson
    })
    // this.onStopInput(matrix)
  }

  onAddMatrix(line,row){
    let {matrix,onMatrix,focuson}=this.state
    let array=new Array()
    for(let i=0;i<line;i++){
      let arr=new Array(row).fill('')
      array.push(arr)
    }
    onMatrix++
    focuson=[onMatrix,0,0]
    matrix.push(array)
    this.setState({
      matrix,
      inputNum:'',
      onMatrix,
      focuson
    }),function(){
      console.log("AddMA",matrix)
    }
  }

  onKeepInput(value){
    let{inputNum,matrix,focuson}=this.state
    inputNum+=value
    matrix[focuson[0]][focuson[1]][focuson[2]]=inputNum
    setTimeout(() => {
      this.autoCheck(matrix)
    },10000)
    this.setState({
      inputNum,
      matrix
    })
  }

  autoCheck(matrix){
    let {line,row,onMatrix}=this.state
    let i,j
    let del;
    for(i=0;i<line;i++){
      let flag=false
      for(j=0;j<row;j++){
        if(matrix[onMatrix][i][j].length)
          flag=true
      }
      if(!flag)
      {
        matrix[onMatrix].splice(i,1)
        if(line-1>=1)
          line--
      }
    }
    this.setState({
      matrix:matrix,
      line,
      row
    })
    del=[]
    for(i=0;i<line;i++){
      let flag=false
      for(j=0;j<row;j++){
        if(matrix[onMatrix][j][i].length)
          flag=true
      }
      if(!flag)
        del.push(i)
    }
    for(j=0;j<row;j++)
      for(i of del){
        matrix[onMatrix][j].splice(i,1)
      }
    row-=del.lengtH
    this.setState({
      matrix:matrix,
      line,
      row
    })
    return matrix
  }

  checkMatrix(mx){
    let i,j,flag=false
    for(i of mx){
      for(j of i)
        if(j.length!=0)
          flag=true
    }
    return flag
  }

  onBackspace(){
    let {onMatrix,focuson,inputNum,matrix,isOperate,isonOperate}=this.state
    let flag=this.checkMatrix(matrix[onMatrix])
    if(!isonOperate||flag){
      let l=inputNum.length
      let newinput=inputNum.substring(0,l-1)
      if(l<=0){ 
        newinput=''
      }
      matrix[focuson[0]][focuson[1]][focuson[2]]=newinput
      this.setState({
        inputNum:newinput,
        matrix,
        isonOperate
      })
    }
    else{
      isOperate.pop()
      if(matrix.length>0)
        matrix.pop()
      if(onMatrix)
        onMatrix--
      focuson[0]=onMatrix
      this.onFocushandle(onMatrix,focuson[1],focuson[2])
      inputNum=matrix[focuson[0]][focuson[1]][focuson[2]]
      this.setState({
        isOperate,
        isonOperate:0,
        onMatrix,
        focuson,
        inputNum,
        matrix
      })
    }
    
  }

  onClear(){
    this.setState({
      line:1,
      row:1,
      onMatrix:0,
      matrix:[[['']]],
      inputNum:'',
      focuson:[0,0,0],
      isOperate:[],
      isResult:[0,[]],
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
      isonOperate:1
    })
    console.log("isOperate",isOperate)
  }

  
  onCalculate(){
    let{isResult,isOperate,matrix,line}=this.state
    let op=isOperate[isResult[0]]
    let re
    console.log(isOperate,isResult,matrix)
    switch(op){
      case 'A-1':re=inv(matrix[isResult[0]]);break;
      case '行最简':let array=JSON.parse(JSON.stringify(matrix[isResult[0]]))
                    let ar=new Array(line).fill(0);re=rref(array,ar,line);break;
      case '+':re=add(matrix[isResult[0]],matrix[isResult[0]+1]);break;
      case '-':re=subtract(matrix[isResult[0]],matrix[isResult[0]+1]);break;
      case 'det':re=det(matrix[isResult[0]]);let arr=[];arr[0]=[];arr[0].push(re);re=arr;break;
      case '×':re=multiply(transpose(matrix[isResult[0]]),transpose(matrix[isResult[0]+1]));break;
    }
    isResult[0]++
    isResult[1].push(re)
    this.setState({
      isResult:isResult,
      isonOperate:0,
    })  
  }
  
  onClickhandle(){
    let {isOperate,isResult,userInfo}=this.state
    let Operation=isOperate[isResult[0]-1]
    switch(Operation){
      case 'det':Operation=1;break;
      case '行最简':Operation=2;break;
      case '+':Operation=3;break;
      case '-':Oeration=4;break;
      case '×':Operation=5;break;
      default:break;
    }
    let data= JSON.stringify({
      username: userInfo.nickName,
      operation:Operation
    })
    console.log("data",data)
    Taro.request({
      url: 'https://matrix.wizzstudio.com/calculater/',
      data:data,
      header: {
        'content-type': 'application/json'
      },
      method:'POST',
      success:(data)=>{console.log("sucess",data)},
      fail:(data) => {console.log(data)}
    })
      .then(res => console.log(res.data))
  }
  
  render () {
    const {onMatrix,inputNum,matrix,focuson,isOperate,isResult,line,row}=this.state
    
    return (
      <View className='index'>
        {focuson}
        <View className="operate">
          <View className="function at-row at-row__justify--end">
          <Matrix className="Matrix"
                  posMatrix={0}
                  matrix={matrix[0]}
                  inputNum={inputNum}
                  onFocushandle={this.onFocushandle.bind(this)}
            ></Matrix>
          {isOperate.map((val,index)=>(
            <View className="at-row__justify--end">
              {val!='det'&&val!='A-1'&&val!='行最简'&&
                <View className="addfunction at-row at-row__justify--end at-row__align--center">
                    <h1 className="opertext">{val}</h1>
                    <Matrix className="Matrix"
                      posMatrix={index+1}
                      matrix={matrix[index+1]}
                      inputNum={inputNum}
                      onFocushandle={this.onFocushandle.bind(this)}
                    ></Matrix>
                  </View>}
                {val=='A-1'&&<h1 className="uptext">{-1}</h1>}
                {(val=='det'||val=='行最简')&&<h1 className="downtext">{val}</h1>}
                </View>
                ))
            }{isResult[0]!=0&&<h1 className="equal">=</h1>}
          </View> 

          <View className="result at-row at-row__justify--end">
          {isResult[0]!=0&&<Result matrix={isResult[1][isResult[0]-1]}></Result>}
          </View>
      </View>    
      

          <View className="at-col-12">
            <KeyBoard
              line={line}
              row={row}
              hasResult={isResult[isResult[0]]}
              onClear={this.onClear}
              onAddRow={this.onAddRow}
              onAddLine={this.onAddLine}
              onAddMatrix={this.onAddMatrix}
              onBackspace={this.onBackspace}
              onCalculate={this.onCalculate}
              onKeepInput={this.onKeepInput}
              onOperate={this.onOperate}
              onClickhandle={this.onClickhandle}
              ></KeyBoard>
          </View> 

       
      </View>
    )
  }
}

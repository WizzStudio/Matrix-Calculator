import {AtForm,AtInput} from 'taro-ui'
import { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Unit from '../Unit/unit'
import './matrix.scss'
// import '../../pages/index/index.scss'
export default class Matrix extends Component {
  constructor(props){
    super(props)
    this.state={
      reinput:'',
      focusOn:[0,0]
    }
  } 
  onClickhandle(x,y){
    let {matrix,inputNum}=this.props
    const{focusOn}=this.state;
    this.props.onFocushandle(x,y);
    if(focusOn!=[x,y]){
      this.setState({
        focusOn:[x,y]
      }) 
    }                                 
  }

  render(){
    const {matrix,inputNum}=this.props 
    const {reinput,focusOn}=this.state
    return (
      <View className='mx'>
        {
          matrix.map((value,i)=>{
          return(
              <View className='column'>
                {
                  value.map((v,index)=>{ 
                    // {}
                    return(
                      <View className='row'>
                        <Unit
                              val={v}
                              onClickhandle={this.onClickhandle.bind(this,i,index)}
                              concentrate={focusOn[0]==i&&focusOn[1]==index?true:false}
                              position={[i,index]}>
                        </Unit>
                      </View>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>)
  }
}
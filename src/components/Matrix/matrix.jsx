import {AtForm,AtInput} from 'taro-ui'
import { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Unit from '../Unit/unit'
import './matrix.scss'
export default class Matrix extends Component {
  constructor(props){
    super(props)
    this.state={
      reinput:'',
      focusOn:[0,0,0]
    }
  } 
  onClickhandle(i,x,y){
    const{focusOn}=this.state;
    this.props.onFocushandle(i,x,y);
    if(focusOn!=[i,x,y]){
      this.setState({
        focusOn:[i,x,y]
      }) 
    }                                 
  }

  render(){
    const {matrix,inputNum,posMatrix,key}=this.props 
    const {reinput,focusOn}=this.state
    return (
      <View className='mx'>
        {
          matrix.map((value,x)=>{
          return(
              <View className='row'>
                {
                  value.map((v,y)=>{ 
                    // {}
                    return(
                      <View className='column'>
                        {/* {posMatrix},{x}{y} */}
                        <Unit
                              val={v}
                              onClickhandle={this.onClickhandle.bind(this,posMatrix,x,y)}
                              concentrate={focusOn[0]==posMatrix&&focusOn[1]==x&&focusOn[2]==y?true:false}
                              position={[posMatrix,x,y]}>
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
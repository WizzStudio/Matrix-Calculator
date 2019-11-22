import Taro from '@tarojs/taro'
import {AtInput} from 'taro-ui'
import Unit from '../Unit/unit'
import './result.scss'
class Result extends Taro.Component{
    constructor(props){
        super(props)  
    }
    
    render(){
        let {matrix}=this.props
        return <View className='result'>
            {matrix.map((value,x)=>{
                 return(
                    <View className='column'>
                        {
                        value.map((v,y)=>{ 
                            // {}
                            return(
                            <View className='row'>
                                {/* {posMatrix},{x}{y} */}
                                <Unit
                                    val={v}
                                    // onClickhandle={this.onClickhandle.bind(this,posMatrix,x,y)}
                                    // concentrate={focusOn[0]==posMatrix&&focusOn[1]==x&&focusOn[2]==y?true:false}
                                    // position={[posMatrix,x,y]}
                                    >
                                </Unit>
                            </View>
                            )
                        })
                        }
                    </View>
            )
          })}
        </View>
    }
    
}
export default Result
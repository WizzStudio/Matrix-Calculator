import Taro from '@tarojs/taro'
import {AtInput} from 'taro-ui'
import './unit.scss'
class Unit extends Taro.Component{
    constructor(props){
        super(props)  
    }
    onClick(){
        // console.log("props",this.props)
        const{position}=this.props
        let x=position[0]
        let y=position[1]
        this.props.onClickhandle(x,y)
        console.log("pos",position)
    }
    onChangeValue(value){
        // this.setState({
        //     number:value,
        // })

        return value
    }
    render(){
        const{val,position,concentrate}=this.props
        console.log(val,position,concentrate)
        return <View className={'unit'}>
            <AtInput type='number' 
            value={val} 
            autoFocus={false}
            onChange={this.onChangeValue.bind(this)}
            onFocus={this.onClick.bind(this)}
            focus={concentrate}/>
        </View>
    }
    
}
export default Unit
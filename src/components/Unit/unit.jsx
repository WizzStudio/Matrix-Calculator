import Taro from '@tarojs/taro'
import {AtInput} from 'taro-ui'
import './unit.scss'
class Unit extends Taro.Component{
    constructor(){
        super()
        this.state={
            number:'',
        }
        
    }

    render(){
        return <div className={'unit'}>
            <AtInput type='number' value={this.state.number} onChange={this.onchangeValue.bind(this)}/>
            <h1>{this.state.number}</h1>
        </div>
    }
    onchangeValue(value){
        this.setState({
            number:value
        })
        return value
        console.log(this.state.number)
    }
}
export default Unit
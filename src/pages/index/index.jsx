import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import {AtGrid} from 'taro-ui'
import Unit from '../../components/Unit/unit'
export default class Index extends Component {
  constructor(){
    super()
    this.state={
      data: [
        {value:'AC',},
        {value:'A-1',},
        {value:'行最简',},
        {value:'det',},
        {value:'+',},
        {value:'-',},
        {value:'×',},
        {value:'删除',},
        {value:'7'},
        {value:'8'},
        {value:'9'},
        {value:'→',},
        {value:'4'},
        {value:'5'},
        {value:'6'},
        {value:'回车',},
        {value:'1'},
        {value:'2'},
        {value:'3'},
        {value:'+/-'},
        {value:'.'},
        {value:'0'},
        {value:'/'},
        {value:'=',}
      ]
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

  
handleClick = (value, index) => {
  console.log(value, index)
}
  render () {
    return (
      <View className='index'>
        <Unit></Unit>
        <View className='grid'>
          <AtGrid data={this.state.data} onClick={this.handleClick} mode='rect' hasBorder={true} columnNum='4' />
          </View>
      </View>
    )
  }
}

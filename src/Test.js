import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {addTodo, deleteTodo} from './Redux/Actions/Playlist'


class Test extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        console.warn(6666, this.props.playlist)
        return(
           <ul>
               {this.props.playlist?.map((item, index)=>{
                   return <li key={index} onClick={()=>this.props.handleDelete(index)}>gulshan {item}</li>
               })}
           </ul>
        )
    }
}
function mapStateToProps(state){
    return{playlist: state.Playlist?.playList}
  }
  function matchDispatchToProps(dispatch){
    return bindActionCreators({
      handleAddToDo: addTodo,
      handleDelete: deleteTodo
    }, dispatch)
  }
  export default connect(mapStateToProps, matchDispatchToProps)(Test);
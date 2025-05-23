import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import TodoItem from '@components/TodoItem';
import { fetchAllTodos } from '@/actions'

class TodoItemList extends Component {
    /*
        true(myTodos 변수에 변동이 있으면)이면 render() 함수가 호출됨
        false(myTodos 변수에 변동이 없으면)이면 render() 함수가 skip 됨
    */
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.myTodos !== nextProps.myTodos;
    }
    //HTML DOM 렌더링 후에 호출되는 lifecycle method
    componentDidMount() {
        this.props.fetchAll();
    }
    render() {
        const { myTodos, myToggle } = this.props;
        const todoList = myTodos.map(
            ({id, text, checked}) => (
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={myToggle}
                    key={id}
                />
            )
        );
        return (
            <div>
                {todoList}
            </div>
        );
    }
}

TodoItemList.propTypes = {
    myTodos: PropTypes.array,
    myToggle: PropTypes.func,
    fetchAll : PropTypes.func
};

export default connect(
    //store에 저장된 state 객체의 todos를 가져와서 myTodos라는 이름에 매핑
    (state) => ({myTodos:state.todos}),
    //action 함수를 dispatch 하는 함수를 fetchAll라는 이름에 매핑
    { fetchAll:fetchAllTodos }
)(TodoItemList);
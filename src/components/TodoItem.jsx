import { Component } from 'react';
import PropTypes from 'prop-types';
import '@components/TodoItem.css';

import { connect } from 'react-redux';
import { removeTodo, toggleTodo } from '@/actions';

class TodoItem extends Component {
    /*
        true(myTodos 변수에 변동이 있으면)이면 render() 함수가 호출됨
        false(myTodos 변수에 변동이 없으면)이면 render() 함수가 skip 됨
    */
    shouldComponentUpdate(nextProps, nextState) {
	    return this.props.checked !== nextProps.checked;
    }

    handleRemove = (id) => {
        this.props.remove(id);
    }; //handleRemove

    handleToggle = (todo) => {
        todo.checked = !todo.checked;
        this.props.toggle(todo);
    };

    render() {
        const { text, checked, id } = this.props;
        const { handleRemove, handleToggle } = this;
        return (
            <div className="todo-item" onClick={() => handleToggle({ text, checked, id })}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle 이 실행되지 않도록 함
                    handleRemove(id)
                }
                }>&times;</div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

TodoItem.propTypes = {
    text: PropTypes.string,
    checked: PropTypes.bool,
    id: PropTypes.number,
    toggle: PropTypes.func,
    remove: PropTypes.func
};

export default connect(null, { 
    remove:removeTodo,
    toggle:toggleTodo
 })(TodoItem);
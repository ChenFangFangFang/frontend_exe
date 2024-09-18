function TodoTable(props) {
  return (
      <table>
        <tbody>
          <tr>
            <td className="title">Date</td>
            <td className="title">Priority</td>
            <td className="title">Description</td>
          </tr>
          {props.todos.map((item, index) => (
            <tr key={index}>
              <td>{item.duedate}</td>
              <td>{item.priority}</td>
              <td>{item.description}</td>
              
              {/* <td><button onclick={props.handleDelete(index)}>Done</button></td> */}
              <td>
                <button onClick={() => props.deleteTodo(index)}>Delete</button>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
    );
}

export default TodoTable;

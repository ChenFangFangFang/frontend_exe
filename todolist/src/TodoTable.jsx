
function TodoTable(props) {
    return (
        <table>
          <tbody>
            <tr>
              <td className="title">Date</td>
              <td className="title">Description</td>
            </tr>
            {props.todos.map((item, index) => (
              <tr key={index}>
                <td>{item.duedate}</td>
                <td>{item.description}</td>
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


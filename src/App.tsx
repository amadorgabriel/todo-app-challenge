import { FiCheckSquare } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

import { Container } from "./components/Layout";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <Container contentClass="gap-4">
      <div className="d-flex align-items-center gap-2">
        <FiCheckSquare size={24} />
        <h1>Task List</h1>
      </div>

      <TodoList />
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
      />
    </Container>
  );
}

export default App;

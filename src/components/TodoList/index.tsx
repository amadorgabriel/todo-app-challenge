import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import { Button, Input } from "../Form";
import { TodoItem } from "./TodoItem";

import styles from "./styles.module.scss";
import { ProgressBar } from "../ProgressBar";

interface TodoItem {
  id: number;
  status: "progress" | "done";
  title: string;
  isSelected: boolean;
}

export const TodoList = ({}) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [filteredTodoItems, setFilteredTodoItems] =
    useState<TodoItem[]>(todoItems);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [isMultiSelecting, setIsMultiSelecting] = useState<boolean>(false);
  const [filter, setFilter] = useState<"all" | "progress" | "done">("all");

  const totalTasksCompleted = todoItems.filter(
    (item) => item.status === "done"
  ).length;
  const totalTasksSelected = todoItems.filter((item) => item.isSelected).length;

  // Handle task status filters
  useEffect(() => {
    if (filter === "all") setFilteredTodoItems(todoItems);

    if (filter === "done") {
      setFilteredTodoItems(todoItems.filter((item) => item.status === "done"));
    }

    if (filter === "progress") {
      setFilteredTodoItems(todoItems.filter((item) => item.status === "progress"));
    }
  }, [todoItems, filter]);

  // Handle isMultiSelecting state
  useEffect(() => {
    if (totalTasksSelected > 1) setIsMultiSelecting(true);
    if (totalTasksSelected === 0) setIsMultiSelecting(false);
  }, [totalTasksSelected]);

  function handleAddNewItem(taskTitle: string) {
    if (!taskTitle.replace(/\s/g, "").length) {
      toast.warn("You need to write something.");
      return;
    }

    const duplicatedTask = todoItems.filter((item) => {
      return item.title === taskTitle;
    });

    if (!!duplicatedTask[0]) {
      toast.warn("A task with that name already exists.");
      return;
    }

    const itemId = Math.floor(Math.random() * 100);

    todoItems.forEach((item) => {
      if (item.id === itemId) handleAddNewItem(taskTitle);
      return;
    });

    setTodoItems([
      ...todoItems,
      {
        id: itemId,
        title: taskTitle,
        status: "progress",
        isSelected: false,
      },
    ]);
    setTaskTitle("");
  }

  function hanldleToggleStatusItem(id: number) {
    const updatedTasks: TodoItem[] = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === "done" ? "progress" : "done",
        };
      }

      return item;
    });

    setTodoItems([...updatedTasks]);
  }

  function handleDeleteItem(id: number) {
    let taskTobeDeleted = {} as TodoItem;

    const filteredTasks = todoItems.filter((item) => {
      if (item.id !== id) return item;
      taskTobeDeleted = item;
    });

    const deletItem = confirm(
      `Are you sure you want to delete the item: \n ${taskTobeDeleted.title}?`
    );

    if (deletItem) {
      toast.success("Successfully deleted!");
      setTodoItems([...filteredTasks]);
    }
  }

  function hanldleToggleSelectItem(id: number) {
    const updatedTasks: TodoItem[] = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }

      return item;
    });

    setTodoItems([...updatedTasks]);
  }

  function handleSelectAllItems() {
    if (todoItems.length === 0) {
      toast.warn("You don't have any tasks yet");
      return;
    }

    setIsMultiSelecting(true);

    const selectedItems: TodoItem[] = todoItems.map((item) => {
      return {
        ...item,
        isSelected: true,
      };
    });

    setTodoItems([...selectedItems]);
  }

  function handleUnselectAllItems() {
    if (todoItems.length === 0) {
      toast.warn("You don't have any tasks yet");
      return;
    }

    setIsMultiSelecting(false);

    const selectedItems: TodoItem[] = todoItems.map((item) => {
      return {
        ...item,
        isSelected: false,
      };
    });

    setTodoItems([...selectedItems]);
  }

  function handleRemoveAllSelectedItems() {
    let tasksTobeDeleted = [] as TodoItem[];

    const filteredTasks: TodoItem[] = todoItems.filter((item) => {
      if (!item.isSelected) return item;

      tasksTobeDeleted.push(item);
    });

    if (tasksTobeDeleted.length === 0) {
      toast.warn("You need to select some task");
      return;
    }

    const confirmRemoves = confirm(
      `Are you sure you want to exclude the following items: ${tasksTobeDeleted.map(
        (item) => `${item.title} `
      )}?`
    );

    if (confirmRemoves) {
      toast.success("Items excluidos com sucesso!");
      setTodoItems([...filteredTasks]);
    }
  }

  function handleCompleteAllSelectedItems() {
    const itemsSelected = todoItems.filter((item) => item.isSelected);

    console.log(itemsSelected);

    if (itemsSelected.length === 0) {
      toast.warn("You need to select some task");
      return;
    }

    const updatedTasks: TodoItem[] = todoItems.map((item) => {
      if (item.isSelected) {
        return {
          ...item,
          status: "done",
        };
      }

      return item;
    });

    setTodoItems([...updatedTasks]);
  }

  return (
    <>
      <div className="d-flex gap-2">
        <Input
          placeholder="Write a new Task"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleAddNewItem(taskTitle);
          }}
        />
        <Button className="gap-2" onClick={() => handleAddNewItem(taskTitle)}>
          <FiPlus size={16} />
          Add New
        </Button>
      </div>

      <div className="mb-2">
        <ProgressBar value={totalTasksCompleted} max={todoItems.length} />
      </div>

      <div className="mb-2">
        <h5 className="mb-2">Filters</h5>
        <div className="d-flex gap-2">
          <Button size="sm" variant="outlined" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button
            size="sm"
            variant="outlined"
            onClick={() => setFilter("progress")}
          >
            In Progress
          </Button>
          <Button
            size="sm"
            variant="outlined"
            onClick={() => setFilter("done")}
          >
            Done
          </Button>
        </div>
      </div>

      <div>
        <h5 className="mb-2">Multi Select</h5>
        <div className="d-flex gap-2 mb-0 pb-3 overflox-x-auto">
          <Button size="sm" variant="link" onClick={handleSelectAllItems}>
            Select all
          </Button>

          {isMultiSelecting && todoItems.length !== 0 && (
            <>
              <Button size="sm" variant="link" onClick={handleUnselectAllItems}>
                Unselect all
              </Button>
              <Button
                size="sm"
                variant="outlined"
                onClick={handleRemoveAllSelectedItems}
              >
                Remove selected
              </Button>
              <Button
                size="sm"
                variant="outlined"
                onClick={handleCompleteAllSelectedItems}
              >
                Complete selected
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="d-flex justify-content-end">
          <Button size="sm">Clear Filters</Button>
        </div>
      </div>

      <div className={styles.todoGroup}>
        {todoItems.length === 0 || filteredTodoItems.length === 0 ? (
          <p>There are no tasks. </p>
        ) : (
          filteredTodoItems.map((item, index) => {
            return (
              <>
                <TodoItem
                  key={index}
                  title={item.title}
                  status={item.status}
                  isSelected={item.isSelected}
                  onSelect={() => hanldleToggleSelectItem(item.id)}
                  onRemove={() => handleDeleteItem(item.id)}
                  onComplete={() => hanldleToggleStatusItem(item.id)}
                />
                <hr className="transparent mb-2" />
              </>
            );
          })
        )}
      </div>
    </>
  );
};

import { FiTrash2, FiCheckSquare, FiXSquare } from "react-icons/fi";

import { Button } from "../../Form";
import { CheckBox } from "../../Form/Check";

import styles from "../styles.module.scss";

interface TodoItemProps {
  title: string;
  status: "progress" | "done";
  isSelected: boolean;

  onSelect: () => void;
  onRemove: () => void;
  onComplete: () => void;
}

export const TodoItem = ({
  title,
  status,
  isSelected,
  onSelect,
  onRemove,
  onComplete,
}: TodoItemProps) => {
  return (
    <div className={`${styles.todoItem} ${styles[status]}`}>
      <CheckBox checked={isSelected} onChange={onSelect} />

      <div className="d-flex justify-content-between w-100">
        <p className="align-self-center">{title}</p>

        <div className="d-flex gap-1">
          {status !== "done" ? (
            <Button
              size="sm"
              color="secondary"
              variant="link"
              className="gap-2"
              onClick={onComplete}
            >
              <FiCheckSquare size={18} />
            </Button>
          ) : (
            <Button size="sm" variant="link" onClick={onComplete}>
              <FiXSquare size={18} />
            </Button>
          )}

          <Button size="sm" variant="link" onClick={onRemove}>
            <FiTrash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

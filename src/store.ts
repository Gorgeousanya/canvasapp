type Note = {
  id: string;
  title: string;
  completed: boolean;
};

type State = {
  notes: Array<Note>;
  value: string;
  flag: boolean;
};

type Action =
  | {
    type: "add_note";
    note: string;
  }
  | {
    type: "done_note";
    id: string;
  }
  | {
    type: "delete_note";
    id: string;
  }
  | {
    type: "change_value";
    value: string;
  }
  | {
    type: "change_flag";
    flag: boolean;
  };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add_note":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: Math.random().toString(36).substring(7),
            title: action.note,
            completed: false,
          },
        ],
      };

    case "done_note":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.id ? { ...note, completed: !note.completed } : note
        ),
      };

    case "delete_note":
      return {
        ...state,
        notes: state.notes.filter(({ id }) => id !== action.id),
      };

    case "change_value":
      return {
        ...state,
        value: action.value,
      };

    case "change_flag":
      return {
        ...state,
        flag: action.flag,
      };

    default:
      throw new Error();
  }
};

const app = Vue.createApp({
  data() {
    return {
      columns: [
        {
          title: "To do",
          tasks: ["Setup style for index.html", "Login feature"],
          newTask: "",
        },
        {
          title: "In Progress",
          tasks: ["Setup database", "Hire the new intern"],
          newTask: "",
        },
        { title: "Stuck", tasks: ["Design index.html"], newTask: "" },

        { title: "Done", tasks: ["Kanban board for Fysiofresh"], newTask: "" },
      ],
    };
  },
  methods: {
    addTask(columnIndex) {
      const column = this.columns[columnIndex];
      if (column.newTask.trim() !== "") {
        column.tasks.push(column.newTask.trim());
        column.newTask = "";
      }
    },
    mouseoverHandler(event) {
      const element = event.target;
      element.style.backgroundColor = "#d3d3d3";
      element.style.transition = "background-color 0.2s ease"; // Add transition
    },

    mouseleaveHandler(event) {
      const element = event.target;
      element.style.backgroundColor = "";
    },

    deleteTask(columnIndex, taskIndex) {
      this.columns[columnIndex].tasks.splice(taskIndex, 1);
    },
    dragStart(columnIndex, taskIndex) {
      this.draggedTask = { column: columnIndex, task: taskIndex };
    },
    dropTask(columnIndex, taskIndex) {
      if (!this.draggedTask) return;
      const { column: fromColumnIndex, task: fromTaskIndex } = this.draggedTask;
      const fromColumn = this.columns[fromColumnIndex];
      const toColumn = this.columns[columnIndex];
      const taskToMove = fromColumn.tasks.splice(fromTaskIndex, 1)[0];
      toColumn.tasks.splice(taskIndex, 0, taskToMove);
      this.draggedTask = null;
    },
  },
});

app.mount("#app");

document.addEventListener("DOMContentLoaded", function () {
  loadNotes();
  document.getElementById("addNote").addEventListener("click", addNote);
  document.getElementById("clearNotes").addEventListener("click", clearNotes);
});

function addNote() {
  let title = document.getElementById("noteText").value.trim();
  let description = document.getElementById("noteDescription").value.trim();

  if (title === "" || description === "") {
    alert("Please enter a title and description");
    return;
  }

  let notes = getNotes();
  notes.unshift({ title, description, completed: false });
  saveNotes(notes);
  renderNotes(notes);
  clearInputFields();
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  let notes = getNotes();
  renderNotes(notes);
}

function renderNotes(notes) {
  let container = document.getElementById("notesContainer");
  container.innerHTML = "";

  notes.forEach((note, index) => {
    let noteElement = document.createElement("div");
    noteElement.classList.add("note");

    let title = document.createElement("h3");
    title.innerText = note.title;

    let description = document.createElement("p");
    description.innerText = note.description;

    if (note.completed) {
      noteElement.classList.add("completed");
    }

    description.addEventListener("click", () => toggleCompleted(index));

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "🗑️";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => deleteNote(index));

    noteElement.appendChild(title);
    noteElement.appendChild(description);
    noteElement.appendChild(deleteButton);
    container.appendChild(noteElement);
  });
}

function toggleCompleted(index) {
  let notes = getNotes();
  notes[index].completed = !notes[index].completed;
  saveNotes(notes);
  renderNotes(notes);
}

function deleteNote(index) {
  let notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  renderNotes(notes);
}

function clearNotes() {
  if (confirm("Are you sure you want to delete all notes?")) {
    localStorage.removeItem("notes");
    renderNotes([]);
  }
}

function clearInputFields() {
  document.getElementById("noteText").value = "";
  document.getElementById("noteDescription").value = "";
}

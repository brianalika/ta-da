var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //imcomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //each element needs to be modified

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //each element needs to be appended
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

//Add new Task
var addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from new-task:
    var listItem = createNewTaskElement(taskInput.value);
    //append listItem to imcompleteTaskHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = " ";
};
//Edit existing tasks
var editTask = function () {
    console.log("Edit Task...");
    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    //if the class of parent is edit.mode
    if (containsClass) {
        //switch from editmode
        //label text become inputs value
        label.innerText = editInput.value;
    } else {
        //switch to edit mode
        //input value becomes the labels text
        editInput.value = label.innerText;
    }
    //toggle edit mode on parent
    listItem.classList.toggle("editMode");
};
//Delete an existing task
var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    //remove parent list item from ul
    ul.removeChild(listItem);
};
//Mark a task as completed-tasks
var taskCompleted = function () {
    console.log("Task Complete...");
    //append the tast list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};
//Mark a task as incomplete-tasks
var taskIncomplete = function () {
    console.log("Task Incomplete...");
    //when the checkbox is unchecked we want to append it to #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    //Set the click handler to the addTask function
    //select list items its children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
    editButton.onclick = editTask;
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //bind taskCompleted to the checkbox
    checkBox.onchange = checkBoxEventHandler;
};
var ajaxRequest = function () {
    console.log("ajax request");
};
//set the click handler to the addTask function
addButton.onclick = addTask;
addButton.addEventListener("click, addTask");
addButton.addEventListener("click, ajaxRequest");

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children(taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children(taskCompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};

// AUTHENTICATION FUNCTION //
var list = JSON.parse(localStorage.getItem("incomplete-tasks"));

if (!Array.isArray(list)) {
  list = [];
}

function putOnPage() {

  $("#incomplete-tasks").empty(); // empties out the html

  var insideList = JSON.parse(localStorage.getItem("incomplete-tasks"));

  if (!Array.isArray(insideList)) {
    insideList = [];
  }

  // render our insideList todos to the page
  for (var i = 0; i < insideList.length; i++) {
    var p = $("<p>").text(insideList[i]);
    var b = $("<button class='delete'>").text("x").attr("data-index", i);
    p.prepend(b);
    $("#incomplete-tasks").prepend(p);
  }
}

// render our todos on page load
putOnPage();

$(document).on("click", "button.delete", function() {
  var incompletetasks = JSON.parse(localStorage.getItem("incomplete-tasks"));
  var currentIndex = $(this).attr("data-index");

  // Deletes the item marked for deletion
  incompletetasks.splice(currentIndex, 1);
  list = incompletetasks;

  localStorage.setItem("incomplete-tasks", JSON.stringify(incompletetasks));
  putOnPage();
});

$("input[type='submit']").on("click", function(event) {
  event.preventDefault();
  // Setting the input value to a variable and then clearing the input
  var val = $("input[type='text']").val();
  $("input[type='text']").val("");

  // Adding our new todo to our local list variable and adding it to local storage
  list.push(val);
  localStorage.setItem("incomplete-tasks", JSON.stringify(list));

  putOnPage();
});
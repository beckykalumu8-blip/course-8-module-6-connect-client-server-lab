function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  document.querySelector("#event-list").appendChild(li);
}

// Get all events when the page loads
fetch("http://localhost:5000/events")
  .then(response => response.json())
  .then(events => {
    events.forEach(renderEvent);
  })
  .catch(error => {
    console.error("Error loading events:", error);
  });


// Submit a new event
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title");
  const title = titleInput.value.trim();

  // Front-end validation
  if (!title) {
    alert("Please enter an event title.");
    return;
  }

  fetch("http://localhost:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: title })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      return response.json();
    })
    .then(event => {
      renderEvent(event);
      titleInput.value = "";
    })
    .catch(error => {
      console.error("Error adding event:", error);
    });
});

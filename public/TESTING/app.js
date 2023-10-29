
function main() {
  alert("HAUhfousaidj");
  fetch('/user_did_mistake')
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
    console.log(data); // Log the response from the server
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
// document.querySelector("h1").onclick(main);
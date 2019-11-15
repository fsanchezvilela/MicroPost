import {
  http
} from './http';
import {
  ui
} from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);
// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);
// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);
// Listen for Cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

// Get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data)) // servicio
    .catch(err => console.log(err))
}

// Enable edit State
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    }
    console.log(data);
    // Fill form with current post
    ui.fillForm(data);
  }
  e.preventDefault();
}

// Submit posts
function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value;

  // es6 syntax title:tile
  const data = {
    title,
    body
  }

  //validate Input
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  } else {
    //check ID
    if (id === '') {
      //Create post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          // success post added
          ui.showAlert('Post added', 'alert alert-success');
          // clear all fields
          ui.clearFields();
          // post to the db
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update Post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          // success post added
          ui.showAlert('Post updated', 'alert alert-success');
          //Change form state back to add
          ui.changeFormState('add');
          // post to the db
          getPosts();
        })
        .catch(err => console.log(err));
    }



  }

}

// Delete Post
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

}

// Cancel Edit State
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
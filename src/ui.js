class UI {
  constructor(){
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  // Show All Post
  showPosts(posts){
    let output = '';
    posts.forEach((post)=>{
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-edit"></i>
          </a>
          <a href="#" class="delete card-link" data-id=${post.id}>
            <i class="fa fa-trash-alt"></i>
          </a>
        </div>
      </div>
      `;
    });
    this.post.innerHTML = output;
  }

  // Show Alert
  showAlert(message,className){
    this.clearAlert();
    //create div
    const div = document.createElement('div');
    // add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.postContainer');
    // Get posts
    const posts = document.querySelector('#posts');
    // Insert Alert div
    container.insertBefore(div,posts);

    // timeout
    setTimeout(()=>{this.clearAlert()},3000)
  }

  // Create alert
  clearAlert(){
    const currentAlert = document.querySelector('.alert');
    if(currentAlert){
      currentAlert.remove();
    }
  }

  // Clear all fields
  clearFields(){
    this.titleInput.value ='';
    this.bodyInput.value ='';
  }

  // Fill form to edit
  fillForm(data){
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Clear ID hidden value
  clearIdInput(){
    this.idInput.value = '';
  }

  // Change the form state
  changeFormState(type){
    console.log(type)
    if(type==='edit'){  
      console.log(this)
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');
      // Insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      // back to the normal state
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // Remove cancel btn if it is there
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }
      // Clear ID from hidden field
      this.clearIdInput();
      
        // Clear text
        this.clearFields();
      
    }
  }
}

export const ui = new UI();
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);


// Add item
function addItem(e) {
    e.preventDefault();
    var newExpense = document.getElementById('expense').value;
    var newDescription = document.getElementById('description').value;
    var newCategory = document.getElementById('category').value;

    class Myobj {
        constructor(expanse, description, category) {
            this.expanse = expanse;
            this.description = description
            this.category = category
        }
    }
    let tempObj = new Myobj(newExpense, newDescription, newCategory)
    let myobjnew = JSON.stringify(tempObj);
    localStorage.setItem(`${newDescription}`, myobjnew)


    let newItem = `${newExpense}-${newDescription}-${newCategory}`

    // Create new li element
    var li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    li.classList.add(newDescription)
    // Add text node with input value
    li.appendChild(document.createTextNode(newItem));

    // Create del button element
    var deleteBtn = document.createElement('button');

    // Add classes to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));

    let editBtn = document.createElement('button')
    editBtn.className = 'btn btn-primary btn-sm float-right edit ml-2';
    editBtn.appendChild(document.createTextNode('Edit'))

    // Append button to li
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Append li to list
    itemList.appendChild(li);

    console.log(li.classList[1]);

    form.reset()
}

// Remove item
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
            let editobjkey = li.classList[1];
            localStorage.removeItem(editobjkey)
        }
    }
}

// edit item
function editItem(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        let editobjkey = li.classList[1];
        let obj = JSON.parse(localStorage.getItem(`${editobjkey}`))
        document.getElementById('expense').value=obj.expanse;
        document.getElementById('description').value=obj.description;
       document.getElementById('category').value=obj.category;
        itemList.removeChild(li);
        localStorage.removeItem(editobjkey)
    }
}

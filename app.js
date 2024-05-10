const listMini = document.getElementById('listAccountMinimized')
const listMaxi = document.getElementById('listAccount')


class Database {

    static SaveNewData(name, pass, data) {        
        const request = indexedDB.open('UserDatabase', 1);

        // upgrade event
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
        };

        // success event
        request.onsuccess = function(event) {
            const db = event.target.result;
            
            const transaction = db.transaction(['myObjectStore'], 'readwrite');
            const objectStore = transaction.objectStore('myObjectStore');
            
            const newData = { name: name, age: pass, data: data };
            const addRequest = objectStore.add(newData);
            
            addRequest.onsuccess = function(event) {
                console.log('Data added successfully');
            };
    
            addRequest.onerror = function(event) {
                console.error('Error adding data:', event.target.error);
            };
        };

        // error event
        request.onerror = function(event) {
            console.error('Database error:', event.target.error);
        };
    }
    static RetrieveData() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('UserDatabase', 1);

            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
            };

            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(['myObjectStore'], 'readonly');
                const objectStore = transaction.objectStore('myObjectStore');

                const getAllRequest = objectStore.getAll();

                getAllRequest.onsuccess = function(event) {
                    const allData = event.target.result;
                    resolve(allData);
                };

                getAllRequest.onerror = function(event) {
                    reject(event.target.error);
                };
            };

            request.onerror = function(event) {
                reject(event.target.error);
            };
        });
    }
}
class Validate {
    static async TextValidation(uUser, uPass) {
        if (uUser === '' || uPass === '') {
            alert('Username or Password are empty, please be sure to not leave with blank input');
            return false;
        } else {
            try {
                const allData = await Database.RetrieveData();
                for (const el of allData) {
                    if (uUser === el.name) {
                        alert(`${uUser} already exists, please provide a different username!`);
                        return false;
                    }
                }
                return true; // Return true if the username is unique
            } catch (error) {
                console.error('Error retrieving data:', error);
                return false;
            }
        }
    }
}
class Username{
    constructor(uUsername, uPassword, uData){
        this.uUsername = uUsername;
        this.uPassword = uPassword;
        this.uData = uData;

        this.render()
    }
    
    render(){
        const newLiMini = document.createElement('li');
        newLiMini.innerHTML = `
            <img src="img/username.png" alt="">
        `  
        listMini.append(newLiMini);

        const newLiMaxi = document.createElement('li');
        newLiMaxi.innerHTML = `
            <img src="img/username.png" alt="">
            <div>
                <p class="name">${this.uUsername}</p>
                <div class="status">
                    <p>data register: ${this.uData}</p>
                </div>
            </div>
        `  
        listMaxi.append(newLiMaxi);
    }
}
class UserInputForm {
    constructor() {
        this.form = document.getElementById('FormSection');
        this.uUsernameInput = document.getElementById('uUsername');
        this.uPasswordInput = document.getElementById('uPassword');

        this.form.addEventListener('submit', this.signupHandler.bind(this));
    }

    async signupHandler(event) {
        event.preventDefault();
        const currentDate = new Date();

        try {
            const isValid = await Validate.TextValidation(this.uUsernameInput.value, this.uPasswordInput.value);
            
            if (isValid) {
                await Database.SaveNewData(this.uUsernameInput.value, this.uPasswordInput.value, currentDate);
                console.log('Data saved successfully');

                this.uUsernameInput.value = '';
                this.uPasswordInput.value = '';

            } else {
                console.log('Validation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}


async function renderingData() {
    try {
        const allData = await Database.RetrieveData();
         
        allData.forEach(data => {
            const newUser = new Username(data.name, data.pass, data.data);
            newUser.render();
        });

    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

new UserInputForm();
renderingData();


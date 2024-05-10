const listMini = document.getElementById('listAccountMinimized')
const listMaxi = document.getElementById('listAccount')


/* class Database{
    static OpenDatabase(){
        let db;
        const request = window.indexedDB.open('DatabaseUser', 1);

        request.onerror = function(event) {
        console.log("Database error: " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Database opened successfully");
        };

        request.onupgradeneeded = function(event) {
        db = event.target.result;
        const objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id' });
        };
    }

    static RetriveData(
    ){}
    static SaveNewData(){}
} */

class Validate{
    static TextValidation(uUser, uPass){
        if (uUser === '' || uPass === ''){
            alert('Username or Password are empty, please be sure to not leave with blank input');
            return false
        }else{
            return true
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

class UserInputForm{
    constructor(){
        this.form = document.getElementById('FormSection');
        this.uUsernameInput = document.getElementById('uUsername');
        this.uPasswordInput = document.getElementById('uPassword');

        this.form.addEventListener('submit', this.signupHandler.bind(this));
    }
    signupHandler(event){
        event.preventDefault();
        const currentDate = new Date();

        if(Validate.TextValidation(this.uUsernameInput.value, this.uPasswordInput.value)){
            const newUser = new Username(this.uUsernameInput.value, this.uPasswordInput.value, currentDate)
        }
    }
}

new UserInputForm()

/* 
const FirstUsername = new Username('vito', 'test', '10/05/2024');
FirstUsername.greet()

 */
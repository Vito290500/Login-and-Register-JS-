const allMinimized = document.getElementById('minimized');
const allMassimized = document.getElementById('massimized');

allMinimized.addEventListener('mouseover', () =>{
    allMinimized.style.display = "none";
    allMassimized.style.display = "block";
})

allMassimized.addEventListener('mouseleave', ()=>{
    allMinimized.style.display = "block";
    allMassimized.style.display = "none";
})
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; 
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

showImage(currentIndex);

document.addEventListener("DOMContentLoaded", () => {
    const ucList = document.getElementById("uc-list");
    const addUcForm = document.getElementById("add-uc-form");
    const ucNameInput = document.getElementById("uc-name");

    addUcForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addUc(ucNameInput.value);
        ucNameInput.value = "";
    });

    function addUc(name) {
        const newUcItem = document.createElement("li");
        newUcItem.className = "uc-item";
        newUcItem.draggable = true;
        newUcItem.innerHTML = `${name} 
            <button onclick="moveUp(this)">▲</button>
            <button onclick="moveDown(this)">▼</button>
            <button onclick="deleteUc(this)">❌</button>`;
        ucList.appendChild(newUcItem);

        addDragAndDrop(newUcItem);
    }

    window.moveUp = function(button) {
        const item = button.parentNode;
        const previousItem = item.previousElementSibling;
        if (previousItem) {
            ucList.insertBefore(item, previousItem);
        }
    }

    window.moveDown = function(button) {
        const item = button.parentNode;
        const nextItem = item.nextElementSibling;
        if (nextItem) {
            ucList.insertBefore(nextItem, item);
        }
    }

    window.deleteUc = function(button) {
        const item = button.parentNode;
        ucList.removeChild(item);
    }

    function addDragAndDrop(item) {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", item.innerHTML);
            item.classList.add("dragging");
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            const draggingItem = document.querySelector(".dragging");
            if (draggingItem && draggingItem !== item) {
                const rect = item.getBoundingClientRect();
                const next = (e.clientY - rect.top) > (rect.height / 2);
                ucList.insertBefore(draggingItem, next ? item.nextSibling : item);
            }
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
    }

});

function formatCPF(input) {

    const value = input.value.replace(/\D/g, '');

    if (value.length <= 3) {
        input.value = value; 
    } else if (value.length <= 6) {
        input.value = value.replace(/(\d{3})(\d+)/, '$1.$2'); 
    } else if (value.length <= 9) {
        input.value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3'); 
        input.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4'); 
    }
}

function validateCPF() {
    const cpfInput = document.getElementById('cpf').value;
    const errorMessage = document.getElementById('error-message');

    
    const cleanedCPF = cpfInput.replace(/\D/g, ''); 

    if (cleanedCPF.length !== 11) {
        errorMessage.textContent = 'CPF inválido. Deve conter 11 dígitos numéricos, incluindo ponto (.) e travessão (-).';
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        alert('CPF válido!');
    }
}

function fillEmail() {
    const emailInput = document.getElementById("email");
    const emailProvider = document.getElementById("email-provider").value;

    if (emailProvider) {
        
        const currentEmail = emailInput.value.split('@')[0]; 
        emailInput.value = currentEmail + emailProvider;
    }
}

document.getElementById("email").addEventListener("input", fillEmail);




window.onload = function(){
  
  /* Adăugați cod pentru schimbarea culorii de fundal și 
     pentru eticheta cu valoarea creditului social      */
     
  /* ... */
const colorInput = document.getElementById('culoare');
      const storageKey = 'alienColor';
      const successContainer = document.getElementById("successMessage");
      const savedColor = localStorage.getItem(storageKey);
      const form = document.getElementById("formular");

      if (savedColor) {
          colorInput.value = savedColor;
          document.body.style.backgroundColor = savedColor;
      }
      
      colorInput.addEventListener('input', (e) => {
          const newColor = e.target.value;
          
          document.body.style.backgroundColor = newColor;
          
          localStorage.setItem(storageKey, newColor);
      });

    function validateId() {
      const idInput = document.getElementById('idIntergalactic');
      const pattern = new RegExp(idInput.pattern);
      if (!pattern.test(idInput.value)) {
          alert("ID-ul Unic Intergalactic nu respectă formatul: A-1234567-Z.");
          idInput.focus();
          return false;
      }
      return true;
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
             emailInput.focus();
             return false;
        }
        return true;
    }
    
    function validateUrl() {
        const urlInput = document.getElementById('urlWeb');
        if (!urlInput.value.startsWith('http')) {
            urlInput.focus();
            return false;
        }
        return true;
    }

    function validatePhoneNumber() {
    const phoneInput = document.getElementById('telefon');
    const phoneNumber = phoneInput.value;

    const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
    if (cleanedNumber.length !== 9) {
        phoneInput.focus();
        return false;
    }
    return true;
}

    function validateForm(e) {
        console.log("salut");
        e.preventDefault(); 

        if (!form.checkValidity()) {
            return;
        }

        if (!validateId()) return;
        if (!validateEmail()) return;
        if (!validateUrl()) return;
        if (!validatePhoneNumber()) return;

        displaySuccessMessage();
    }

    function displaySuccessMessage() {
        form.style.display = 'none';
        successContainer.style.display = 'block';

        successContainer.textContent = "Formularul a fost trimis cu succes!"; 
        successContainer.style.textAlign = "center";
    }

    form.addEventListener('submit', validateForm);
}


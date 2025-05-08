'use strict';

// ARRAY & LOCALSTORAGE (Gemmer svarene i en array, og i en localStorage)
const btns = document.querySelectorAll('.btn-group button');
const boxes = document.querySelectorAll('.hidden');
const choices = JSON.parse(localStorage.getItem('choices') || '[]');

// FUNCTION
const checkAnswer = (e) => { // Funktion der tjekker hvilket valg der er trykket på, og viser det rigtige svar
    boxes.forEach(box => { 
        box.style.display = 'none'; // Går igennem alle elementer med klassen 'hidden' og skjuler dem
    })
    
    const id = e.target.id;
    if (id !== 'godkend1' && id !== 'restart' && !id.startsWith('forsæt') && !id.startsWith('slutning')) {
        choices.push(id);     // Gemmer ikke valg der kun fører en retning (Undgår gentagninger). Gemmer alt andet.
    }
    
    switch (e.target.id) { 
        case 'start': 
            choices.splice(0, choices.length); // Nulstiller arrayet fra localStorage, og begynder at gemme nye valg
            localStorage.setItem('choices', JSON.stringify(choices));
            document.querySelector('#trin1').style.display = 'flex'; // Når der trykkes på en knap med id, vises den box id'et er tilknyttet til, og skujler den tidligere box.
        break;

    // TRIN 1 - Lav en brugernavn
        case 'godkend1': 
            const inputValue = document.getElementById('kaldenavn').value;
            choices.push(inputValue);
            document.querySelector('#trin2').style.display = 'flex';
            const displayElement = document.querySelector('#visKaldenavn');
            if (displayElement) {
                displayElement.textContent = inputValue;
            } // Gemmer det navn du indtastede i inputsfeltet. Viser det også på trin 2.
        break;



    // TRIN 2 - Indtastede du rigtige eller falsk navn?
        case 'rigtige': 
            document.querySelector('#svar1a').style.display = 'flex';
            document.body.style.backgroundColor = '#380001'; // Skifter baggrundsfarve til rød. Bruges de steder hvor der svares enten rigtig eller forkert.
        break;
        case 'falske': 
            document.querySelector('#svar1b').style.display = 'flex';
            document.body.style.backgroundColor = '#00380C';
        break;



    // TRIN 3 - Locky respondere til dit valg om dit navn
        case 'forsæt1a':
            document.querySelector('#trin2a').style.display = 'flex';
        break;
        case 'forsæt1b': 
            document.querySelector('#trin2b').style.display = 'flex';
        break;


    // TRIN 4 - Locky giver dig feedback
        case 'forsæt1aa':
            document.querySelector('#retning1').style.display = 'flex';
            document.body.style.backgroundColor = '#131928';
        break;
        case 'forsæt1bb': 
            document.querySelector('#retning2').style.display = 'flex';
            document.body.style.backgroundColor = '#131928';
        break;




    

    // Trin 5 - Retning 1 - Will Smith
        case 'bloker': 
            document.querySelector('#svar2a').style.display = 'flex';
            document.body.style.backgroundColor = '#00380C';
        break;
        case 'klik': 
            document.querySelector('#svar2b').style.display = 'flex';
            document.body.style.backgroundColor = '#380001';
        break;


    // Trin 6 - Retning 1 - Locky reagere til dit valg
        case 'forsæt2a':
            document.querySelector('#trin3a').style.display = 'flex';
        break;
        case 'forsæt2b': 
            document.querySelector('#trin3b').style.display = 'flex';
        break;

    // Trin 7 - Retning 1 - Locky giver dig feedback
        case 'slutning1':
            document.querySelector('#konklusion1').style.display = 'flex';
            document.body.style.backgroundColor = '#383400';
        break;
        case 'slutning2': 
            document.querySelector('#konklusion2').style.display = 'flex';
        break;

    // SLUTNING 1 & 2 - Will Smith snød dig ikke, eller Will Smith snød dig
        case 'afrunding1': 
            document.querySelector('#endelig-feedback1').style.display = 'flex';
        break;
        case 'afrunding2': 
            document.querySelector('#endelig-feedback2').style.display = 'flex';
        break;




    // Trin 5 - Retning 2 - Anti Virus
        case 'klik-knap': 
            document.querySelector('#svar3a').style.display = 'flex';
            document.body.style.backgroundColor = '#380001';
        break;
        case 'ignorer': 
            document.querySelector('#svar3b').style.display = 'flex';
            document.body.style.backgroundColor = '#00380C';
        break;

    // Trin 6 - Retning 2 - Locky reagere til dit valg
        case 'forsæt3a':
            document.querySelector('#feedback4a').style.display = 'flex';
        break;
        case 'forsæt3b': 
            document.querySelector('#feedback4b').style.display = 'flex';
        break;

    // Konsekvens & Locky giver dig feedback
        case 'konsekvens':
            document.querySelector('#du-er-hacket').style.display = 'flex';
        break;
        case 'slutning3':
            document.querySelector('#konklusion3').style.display = 'flex';
        break;
        case 'slutning4': 
        document.querySelector('#konklusion4').style.display = 'flex';
    break;

    // SLUTNING 3 & 4
        case 'afrunding3': 
            document.querySelector('#endelig-feedback3').style.display = 'flex';
        break;
        case 'afrunding4': 
            document.querySelector('#endelig-feedback4').style.display = 'flex';
        break;
        
    // Genstart - Hvis du vil spille igen
        case 'restart':
            // clear stored choices then reload
            localStorage.removeItem('choices');
            window.location.reload();
        break;    

    // Hvis intet er rigtigt
        default: 
            console.log("Error");
            console.log('Choices array:', choices);
    }
    console.log('Choices array:', choices);
    localStorage.setItem('choices', JSON.stringify(choices)); // Gemmer arrayet i localStorage.
}

btns.forEach(btn => {
    btn.addEventListener('click', checkAnswer); // Går igennem alle knapperne og tilføjer en event listener til dem, der kalder checkAnswer funktionen når de trykkes på.
})

// KALDENAVN
function toggleButtonState() { // Funktion der tjekker om knappen skal være disabled eller ej.
    const input = document.getElementById('kaldenavn');
    const button = document.getElementById('godkend1');
    button.disabled = input.value.trim() === '';
}
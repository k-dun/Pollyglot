const generateTranslationBtn = document.querySelector('.generate-translation-btn');
const loadingArea = document.querySelector('.loading-panel');

generateTranslationBtn.addEventListener('click', handleGenerateTranslation);

document.getElementById('translation-input-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const translationInput = document.getElementById('translation-input');
    if (translationInput.value.length > 1) {
        generateTranslationBtn.disabled = false;
    } else {
        const label = document.getElementsByTagName('label')[0];
        label.style.color = 'red';
        label.textContent = 'Cannot translate this, sorry!';
    }
});

function handleLanguageChoice() {
    const form = document.getElementById('language-choice-form');
    const languageChoice = form.querySelector('input[name="chosen_language"]:checked');
    return languageChoice ? languageChoice.value : null;
}

function handleLanguageSelection() {
    const chosenLanguage = handleLanguageChoice();
    if (chosenLanguage) {
        console.log("Selected language:", chosenLanguage);
    } else {
        console.log("No language selected");
    }
}

document.querySelectorAll('input[name="chosen_language"]').forEach(radio => {
    radio.addEventListener('change', handleLanguageSelection);
});

async function handleGenerateTranslation() {
    const translationInput = document.getElementById('translation-input');
    const inputText = translationInput.value;
    const chosenLanguage = handleLanguageChoice();

    if (!chosenLanguage) {
        console.warn("No language selected. Please choose a language.");
        return;
    }

    if (inputText.length > 1) {
        generateTranslationBtn.disabled = true;
        translationInput.value = '';
        loadingArea.style.display = 'block';
        await fetchTranslation(inputText, chosenLanguage);
    }
}

async function fetchTranslation(inputText, chosenLanguage) {
    try {
        // 👇 This POSTs to your backend route
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputText, chosenLanguage })
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        const output = data.output;
        console.log('Translation:', output);
        renderInput(inputText);
        renderTranslation(output);
    } catch (err) {
        console.error('Translation error:', err);
        alert('Currently out of OpenAI credits, sorry x');
    } finally {
        loadingArea.style.display = 'none';
        generateTranslationBtn.disabled = false;
    }
}

function renderInput(inputText) {
    const outputArea = document.querySelector('.output-panel');
    const pretranslationDiv = document.createElement('div');
    pretranslationDiv.classList.add('output-pretranslation-div');
    const pretranslationOutput = document.createElement('p');
    pretranslationOutput.classList.add('output-pretranslation-p');
    pretranslationOutput.textContent = inputText;
    pretranslationDiv.appendChild(pretranslationOutput);
    outputArea.appendChild(pretranslationDiv);
    outputArea.style.display = 'flex';
}

function renderTranslation(output) {
    const outputArea = document.querySelector('.output-panel');
    const translationDiv = document.createElement('div');
    translationDiv.classList.add('output-translation-div');
    const translationOutput = document.createElement('p');
    translationOutput.classList.add('output-translation-p');
    translationOutput.textContent = output;
    translationDiv.appendChild(translationOutput);
    outputArea.appendChild(translationDiv);
    if (outputArea.scrollHeight > outputArea.clientHeight) {
        translationDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    outputArea.style.display = 'flex';
}

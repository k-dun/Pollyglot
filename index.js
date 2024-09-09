import OpenAI from "openai";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const generateTranslationBtn = document.querySelector('.generate-translation-btn');

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

    if (languageChoice) {
        return languageChoice.value;
    }

    return null;
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
        console.log("No language selected. Please choose a language.");
        return;
    }

    if (inputText.length > 1) {
        generateTranslationBtn.disabled = true;
        translationInput.value = '';
        loadingArea.style.display = 'block';

        await fetchTranslation(inputText, chosenLanguage);
    }
}

const loadingArea = document.querySelector('.loading-panel');

async function fetchTranslation(inputText, chosenLanguage) {
    const openai = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true
    });

    const messages = [
        {
            role: 'system',
            content: 'You are a person fluent in many languages, specialising in French, Spanish and German.'
        },
        {
            role: 'user',
            content: `I want your response to be strictly the translated user input. Can you translate following text into ${chosenLanguage} please: ${inputText}.`
        }
    ]
    
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.9,
            max_tokens: 20
        })
    
        const output = response.choices[0].message.content;
        console.log(messages);
        console.log(output);
        renderInput(inputText);
        renderTranslation(output);
    } catch(err) {
        console.error('error: ', err);
    } finally {
        generateTranslationBtn.disabled = false;
    }
}

function renderInput(inputText) {
    loadingArea.style.display = 'none';
    const outputArea = document.querySelector('.output-panel');
    const pretranslationDiv = document.createElement('div');
    pretranslationDiv.classList.add('output-pretranslation-div');
    const pretranslationOutput = document.createElement('p');
    pretranslationOutput.classList.add('output-pretranslation-p');
    pretranslationOutput.textContent = inputText;
    pretranslationDiv.appendChild(pretranslationOutput)
    outputArea.appendChild(pretranslationDiv);
    outputArea.style.display = 'flex';
}

function renderTranslation(output) {
    loadingArea.style.display = 'none';
    const outputArea = document.querySelector('.output-panel');
    const translationDiv = document.createElement('div');
    translationDiv.classList.add('output-translation-div');
    const translationOutput = document.createElement('p');
    translationOutput.classList.add('output-translation-p');
    translationOutput.textContent = output;
    translationDiv.appendChild(translationOutput)
    outputArea.appendChild(translationDiv);
    if (outputArea.scrollHeight > outputArea.clientHeight) {
        translationDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    outputArea.style.display = 'flex';
}

async function generatePronunciation () {
    
}

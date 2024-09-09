```markdown
# Pollyglot

Pollyglot is a web-based translation application that allows users to translate text into French, German, or Spanish using OpenAI's GPT-3.5 model.

## Features

- Translate text into French, German, or Spanish
- User-friendly interface with a mobile-first design
- Real-time translation using OpenAI's GPT-3.5 model
- Visual feedback for loading state and translation results

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenAI API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a modern web browser
- You have an OpenAI API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pollyglot.git
   ```
2. Navigate to the project directory:
   ```
   cd pollyglot
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

## Usage

1. Open `index.html` in your web browser.
2. Enter the text you want to translate in the input field.
3. Select the target language (French, German, or Spanish) by clicking on the corresponding flag.
4. Click the translate button (arrow down icon) to generate the translation.
5. The original text and its translation will appear in the output panel.

## Project Structure

- `index.html`: The main HTML file containing the structure of the web app.
- `index.css`: The stylesheet for the application.
- `index.js`: The main JavaScript file containing the application logic.
- `public/`: Directory containing static assets such as images and SVG files.

## Contributing

Contributions to Pollyglot are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you want to contact me, you can reach me at `your_email@example.com`.

## Acknowledgements

- OpenAI for providing the GPT-3.5 model used for translations.
- Flag icons from https://flagicons.lipis.dev/
```
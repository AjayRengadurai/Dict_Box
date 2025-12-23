function lookupWord() {
    const wordInput = document.getElementById("wordInput");
    const definitionOutput = document.getElementById("definitionOutput");

    const word = wordInput.value.trim();

    if (word === "") {
        definitionOutput.value = "Please enter a word.";
        return;
    }

    definitionOutput.value = "Loading...";

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(data => {
            if (data.title) {
                definitionOutput.value = "No definition found.";
                return;
            }

            let definition = "";
            let example = "No example sentence available.";

            // Get first definition
            definition = data[0].meanings[0].definitions[0].definition;

            // Search for an example safely
            for (let meaning of data[0].meanings) {
                for (let def of meaning.definitions) {
                    if (def.example) {
                        example = def.example;
                        break;
                    }
                }
                if (example !== "No example sentence available.") {
                    break;
                }
            }

            definitionOutput.value =
                "Definition:\n" + definition + "\n\n" +
                "Example:\n" + example;

            // Auto expand textarea
            definitionOutput.style.height = "auto";
            definitionOutput.style.height =
                definitionOutput.scrollHeight + "px";
        })
        .catch(() => {
            definitionOutput.value = "Error fetching data.";
        });
}

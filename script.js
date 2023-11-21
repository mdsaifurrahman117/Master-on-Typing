const quotes = [
            "The quick brown fox jumps over the lazy dog.",
            "Programming is not about what you know; it's about what you can figure out.",
            "Success is not final, failure is not fatal: It is the courage to continue that counts.",
            // Add more quotes as needed
        ];
        
        let startTime, endTime;
        
        function startTest() {
            const quoteIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[quoteIndex];
            document.getElementById("quote").innerText = quote;
            document.getElementById("input").value = "";
            document.getElementById("result").innerText = "";
        
            // Focus on the input field
            document.getElementById("input").focus();
        
            // Record start time
            startTime = new Date();
        }
        
        function endTest() {
            // Record end time
            endTime = new Date();
        
            // Calculate elapsed time in seconds
            const elapsedTime = (endTime - startTime) / 1000;
        
            // Get the typed text and the original quote
            const typedText = document.getElementById("input").value;
            const originalQuote = document.getElementById("quote").innerText;
        
            // Calculate words per minute (WPM)
            const wordCount = typedText.split(" ").length;
            const wpm = Math.round((wordCount / elapsedTime) * 60);
        
            // Check accuracy
            const accuracy = calculateAccuracy(originalQuote, typedText);
        
            // Display result
            document.getElementById("result").innerText = `Your typing speed: ${wpm} WPM\nAccuracy: ${accuracy}%`;
        }
        
        function calculateAccuracy(original, typed) {
            const originalWords = original.split(" ");
            const typedWords = typed.split(" ");
            let correctWordCount = 0;
        
            for (let i = 0; i < originalWords.length; i++) {
                if (originalWords[i] === typedWords[i]) {
                    correctWordCount++;
                }
            }
        
            const accuracy = (correctWordCount / originalWords.length) * 100;
            return Math.round(accuracy);
        }
        
        // Event listener for Enter key to end the test
        document.getElementById("input").addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                endTest();
            }
        });
        
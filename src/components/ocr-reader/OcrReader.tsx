import { useState } from "react";
import Tesseract from "tesseract.js";

function OcrReader() {
    const [imagePath, setImagePath] = useState("");
    const [text, setText] = useState("");

    const handleChange = (event: any) => {
        setImagePath(URL.createObjectURL(event.target.files[0]));
    }

    const handleClick = () => {

        Tesseract.recognize(imagePath, 'eng',
            { logger: m => console.log(m) }
        )
            .catch(err => {
                console.error(err);
            })
            .then((result: any) => {
                // Get Confidence score
                // const confidence = result.confidence
                console.log(result);

                const text = result.data.text
                console.log(text)
                setText(text);

            })
    }

    return (
        <div className="App">
            <main className="App-main">
                <h3>Uploaded Image</h3>
                <img
                    src={imagePath} className="App-image" alt="logo" />

                <h3>Extracted text</h3>
                <div className="text-box">
                    <p> {text} </p>
                </div>
                <input type="file" onChange={handleChange} />
                <button onClick={handleClick} style={{ height: 50 }}> convert to text</button>
            </main>
        </div>
    );
}

export default OcrReader;
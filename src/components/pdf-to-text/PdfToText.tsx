import { useState } from "react";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router-dom";

function PdfToText() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files?.[0];
        newFile && setFile(newFile);
    };

    const handleExtractText = async () => {
        if (!file) return;

        setIsLoading(true);

        try {
            const text = await pdfToText(file);
            console.log(text)
            setExtractedText(text);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadText = () => {
        try {
            const blob = new Blob([extractedText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'extracted_text.txt';
            link.click();

            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div style={{ marginBottom: 20, border: '1px solid black', backgroundColor: "#f9f9f9" }}>
                <button onClick={() => navigate('/ocr')}>Go to OCR Reader</button>
            </div>
            <div>
                <input type="file" accept=".pdf" onChange={handleChange} />
                <button onClick={handleExtractText} disabled={isLoading} style={{ border: '1px solid black' }}>
                    {isLoading ? 'Extracting...' : 'Extract Text'}
                </button>
                {extractedText && <p>{extractedText}</p>}
                <button hidden={!extractedText} onClick={handleDownloadText} style={{ border: '1px solid black' }}>Download Text</button>  {/* New button */}
            </div>
        </>
    )
}

export default PdfToText;
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PdfToText from './components/pdf-to-text/PdfToText';
import OcrReader from './components/ocr-reader/OcrReader';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PdfToText />} />
      <Route path="/ocr" element={<OcrReader />} />
    </Routes>
  );
}

export default App

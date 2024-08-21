/*import Navbar from "./navbar/Navbar";*/
/*function Header(){
  const title = "Hello"
  return <>
    <h1>{title}</h1>
  </>
}*/
import State from "./State";
import Api from "./Api";
import Likes from "./Likes";
import Comments from "./Comments";
import Dark from "./Dark";
import Navbar from "./Navbar";
import Filterstystem from "./Filterstystem";
import  BackgroundRemover from './BackgroundRemover'

import PdfToWordConverter from "./PdfToWordConverter";
import AddTextToPDF from "./AddTextToPDF"
import ColorPickerFromImage from "./ColorPickerFromImage";
import ImageCompressor from "./ImageCompressor";
import JpegToPngConverter from "./JpegToPngConverter";
import PngToJpegConverter from "./PngToJpegConverter";
import GraphComponent from "./GraphComponent";
import Imagefilter from "./Imagefilter";
import ImageFiler from "./ImageFiler";
import BreathingExerciseGame from './BreathingExerciseGame'
import MindfulColoringGame from './MindfulColoringGame'
import BoxMeditationGame from './BoxMeditationGame'
import SimpleBlog from "./SimpleBlog";
import Dialog from "./Dialog";
import ColorPaletteCreator from './ColorPaletteCreator'
import Home from "./Home";
import Routex from "./Routex";
import Obj from "./Obj";
import Footer from "./Footer";
import { ThemeProvider } from "./ThemeContext";
import Example from "./Example";
import ImageToTextConverter from './ImageToTextConverter'
import Form from "./Form";

function App (){
  
  return  (
    <ThemeProvider>
      
     <Form />
    </ThemeProvider>
  
  
   
   
   
  )
}

export default App;
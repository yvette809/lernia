
import {words } from "./words.js";


export default function getRandomWord(){
    let idx = Math.floor(Math.random()* words.length)
    let randomWord = words[idx]
    return randomWord
}
import applause_1 from '../assets/sound/applauses/1.wav'
import applause_2 from '../assets/sound/applauses/2.wav'
import applause_3 from '../assets/sound/applauses/3.wav'


const sounds = [
    new Audio(applause_1),
    new Audio(applause_2),
    new Audio(applause_3)
];

export const playApplause = (applause: number) => {
    const sound = sounds[applause - 1];
    sound.currentTime = 0;
    sound.play().catch(err => console.log('Error playing sound', err));
}
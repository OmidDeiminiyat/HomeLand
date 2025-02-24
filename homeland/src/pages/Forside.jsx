import { Anmel } from "../components/anmeldelser/Anmeldelser";
import Slideshow from "../components/header/Header"
import { Random } from "../components/random/Random"
import style from './Forside.module.scss';

export const Forside = () => {

    return(
        <>
            <Slideshow />
            <Random />
            <Anmel />
            
        </>
    )
}
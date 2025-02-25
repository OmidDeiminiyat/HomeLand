import { Anmel } from "../components/anmeldelser/Anmeldelser";
import { Footer } from "../components/footer/Footer";
import Slideshow from "../components/header/Header"
import { Random } from "../components/random/Random"
import { Staff } from "../components/staff/Staff";
import style from './Forside.module.scss';

export const Forside = () => {

    return(
        <>
            <Slideshow />
            <Random />
            <Anmel />
            <Staff />
        </>
    )
}
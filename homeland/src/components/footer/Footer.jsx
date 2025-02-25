import { AiOutlineFacebook } from "react-icons/ai";
import { LiaTwitterSquare } from "react-icons/lia";
import style from './Footer.module.scss';
export const Footer = () => {

    return(
        <>
            <footer className={style.footer} >
                <main>
                    <section className={style.firstSec}>
                        <h3>HomeLands</h3>
                        <p>Østre uttrupvej 5 <br /> 9000 Aalborg</p>
                        <p>Email: info@homelnd.dk <br />Telefon: +45 11223344</p>
                    </section>
                    <section className={style.secendSec}>
                        <LiaTwitterSquare />
                        <AiOutlineFacebook />
                    </section>
                </main>
            </footer>
        </>
    )
}
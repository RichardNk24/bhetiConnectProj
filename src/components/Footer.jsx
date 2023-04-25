import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '../context/themeContext';
import footerLogo from '../assets/images/footer-logo.png'


const Footer = () => {
    const theme = useTheme();
    return (
        <FooterSectionStyled theme={theme}>
            <nav className="bottom-navigation">
                <ul className="logo-con">
                    <div className="logo">
                        <img src={footerLogo} alt="Footer Logo"/>
                        <h1>BHETI CONNECT</h1>
                    </div>
                    <p>
                        Préparez votre levée de fonds avec des contenus adaptés et présentez votre projet à des investisseurs pertinents
                    </p>
                    <div className="b-nav-icons">
                        <a href='https://www.linkedin.com/company/bheti-connect'><FontAwesomeIcon icon={faLinkedin} className='icon icon-linkedin' /></a>
                        <a href='https://web.facebook.com/bheticonnect'><FontAwesomeIcon icon={faFacebook} className='icon icon-facebook' /></a>
                        <a href='https://www.instagram.com/bheticonnect/'><FontAwesomeIcon icon={faInstagram} className='icon icon-instagram'/></a>
                    </div>
                </ul>
                <ul className="nav-b nav-contact">
                    <h4>Contactez-Nous</h4>
                    <li className="nav-item">
                        <div className="icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="f-text">
                            <h6>Email</h6>
                            <span>contact@bheticonnect.com</span>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="icon">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className="f-text">
                            <h6>Numéro de contact</h6>
                            <span> +33 (0) 123-456-789</span>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="f-text">
                            <h6>Adresse</h6>
                            <span>
                            78 Avenue des Champs-Elysée 75008 Paris, France
                            </span>
                        </div>
                    </li>
                </ul>
                <ul className="nav-b company">
                    <h4>Compagnie</h4>
                    <li className="nav-item">
                        <a href="#">Contact</a>
                    </li>
                    <li className="nav-item">
                        <a href="#">F.A.Q</a>
                    </li>
                    <li className="nav-item">
                        <a href="#">Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="#">Politique de remboursements</a>
                    </li>
                    <li className="nav-item">
                        <a href="#">Politique de confidentialité</a>
                    </li>
                    <li className="nav-item">
                        <a href="#">Licence & Droits d'auteur</a>
                    </li>
                </ul>
            </nav>
            <div className="footer-copyright">
                <div className='copyright-text'>
                    Copyright © 2022 <span>Bheti Connect.</span> Tous droits réservés.
                </div>
            </div>
        </FooterSectionStyled>
        )
}

const FooterSectionStyled = styled.footer`
    background-color: ${props => props.theme.colorBg3};
    padding-top: 6rem !important;
    color: ${props => props.theme.colorFont};
    padding-bottom: 3rem !important;
    font-size: 14px;
    h6{
        font-size: 1.1rem;
    }
    h4{
        font-size: 1.3rem;
        color: ${props => props.theme.colorGrey4};
    }
    a{  
        color: ${props => props.theme.colorGre6};
        transition: all 0.3s ease-in-out;
        margin-left: 2.5rem;
        &:hover{
            color: ${props => props.theme.colorBheti};
            text-decoration: underline;
        }
    }
    i{  
        color: ${props => props.theme.colorWhite};
        font-size: 1.3rem;
        transition: all 0.3s ease-in-out;
        &:hover{
            color: ${props => props.theme.colorBheti};
        }
    }
    h1{
        color: ${props => props.theme.colorWhite};
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
    .bottom-navigation{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 3rem;
        margin: auto;
        h4{
            padding-bottom: 1.2rem;
            font-size: 1.07rem ;
        }
        .nav-b{
            margin: 0 1rem;
            .nav-item{
                margin-bottom: 1rem;
            }
            @media only screen and (max-width: 525px) and (min-width: 320px){
                margin-top: 25px;
            }
        }
        .company {
            @media all and (max-width: 768px) {
                    width: 70%;
                    margin: auto;
                }
            .nav-item a{
                font-size: 12.5px;
                color: ${props => props.theme.colorGrey6};
                @media all and (max-width: 768px) {
                    margin: auto;
                }
                @media all and (max-width: 320px) {
                    margin-left: -1px;
                }
            }
        }
        .nav-contact{
            .nav-item{
                display: grid;
                grid-template-columns: 30px auto;
                color: ${props => props.theme.colorGrey6};
                @media all and (max-width: 420px) {
                margin-left: -5px;
                }
                @media all and (max-width: 768px) {
                margin: auto;
                width: 90%;
            }
            }
            .nav-item div{
                @media all and (max-width: 768px){
                    margin-top: 15px;
                }
            }
            .f-text{
                text-align: left;
                margin-left: .5vw;
            }
            .f-text h6{
                font-size: 14px ;
            }
            @media all and (max-width: 768px) {
                margin: 10px auto;
                width: 70%;
            }
        }
        .logo-con{
            flex: 5;
            .logo img{
                width: 12%;
                @media all and (max-width: 425px) {
                    width: 22%;
                }
            }
            @media all and (max-width: 768px) {
                width: 70%;
                margin: 0 auto;
            }
    }
        .logo-con p{
            width: 80%;
            @media all and (min-width: 768px) {
                margin-left: 50px;
            }
            @media all and (max-width: 768px) {
                width: 100%;
            }
            color: ${props => props.theme.colorGrey6};
        }
        .b-nav-icons{
            display: flex;
            margin: 2rem auto;
            width: 50%;
            .icon {
                color: aliceblue;
                width: 1rem;
            }
            .icon-linkedin{
                :hover{
                    color: #2677b5;
                }
            }
            .icon-facebook{
                :hover{
                    color: #2872e7 ;
                }
            } 
            .icon-instagram{
                :hover{
                    color: #a9388b ;
                }
            }
            @media only screen and (max-width: 768px) {
                width: 55%;
            }
            @media only screen and (max-width: 425px) {
                width: 90%;
            }
        }
        .ig{
            .ig-images{
                display: grid;
                grid-template-columns: repeat(3, 90px);
                grid-template-rows: repeat(2, 90px);
                grid-gap: .5rem;
                img{
                    width: 100%;
                    object-fit: cover;
                    height: 100%;
                    cursor: pointer;
                }
            }
        }
        @media all and (max-width: 2500px){
            width: 1080px;
        }
        @media all and (max-width: 1080px){
            width: 850px;
        }
        @media all and (max-width: 1024px) {
            width: 750px;
        }
        @media all and (max-width: 768px){
            display: block !important;
            width: 90vw;
        }
        @media all and (max-width: 425px) {
            width: 90%;
        }
        @media all and (max-width: 320px) {
            width: 230px;
            margin-left: 55px;
        }
    }
    .footer-copyright{
        position: relative;
        padding-top: 3rem;
        margin: 0 auto;
        width: 60%;
        border-top: 1px solid ${props => props.theme.colorGrey9};
        text-align: center;
        align-items: center;
        span{
            color: ${props => props.theme.colorWhite};
            cursor: pointer;
            transition: all .4s ease-in-out;
            margin: 0 .3rem;
            &:hover{
                color: ${props => props.theme.colorBheti};
            }
        }
        @media all and (max-width: 425px) {
            width: 90%;
        }
    }

    .copyright-text{
        color: ${props => props.theme.colorGrey6};
        @media all and (max-width: 425px) {
            width: 100%;
            font-size: 11px;
        }
    }
`;

export default Footer
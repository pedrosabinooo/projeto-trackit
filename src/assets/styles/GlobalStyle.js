import { createGlobalStyle } from "styled-components";
import {
  accentColor,
  backgroundColor,
  inputTextColor,
  textColor,
} from "../../constants/colors";
import { footerHeight, navBarHeight } from "../../constants/dimensions";

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
        &:before, &:after {
            content: '';
            content: none;
        }
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    
    html {
        font-family: 'Lexend Deca', sans-serif;
    }
    
    * {
        box-sizing: border-box;
        font-family: 'Lexend Deca', sans-serif;
        color: ${textColor};
    }
    
    button {
        font-family: 'Lexend Deca', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        height: 45px;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        color: #FFFFFF;
        background: ${accentColor};
    }
    
    input {
        background: #FFFFFF;
        border: 1px solid ${inputTextColor};
        border-radius: 5px;
        height: 45px;
        width: 100%;
        margin-bottom: 6px;
        padding: 0 10px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        display: flex;
        align-items: center;
        &::placeholder{
            color: ${inputTextColor};
        }
    }

    .habits-page, .today-page, .history-page{
        padding: calc(${navBarHeight} + 22px) 18px calc(${footerHeight} + 30px) 18px;
        background: ${backgroundColor};
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        span{
            line-height: 23px;
        }
    }

    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 303px;
    }

    div {
    cursor: default;
    }
`;

export default GlobalStyle;

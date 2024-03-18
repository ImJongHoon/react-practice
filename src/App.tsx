import { createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools} from "react-query/devtools";
import { lightTheme, darkTheme } from './theme';
import {ThemeProvider} from "styled-components";
import {useRecoilValue} from "recoil";
import { isDarkAtom } from './atoms';

//react상에서 모든 문서에 적용할 CSS
//import방식으로 추가한 fontfamily
const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'SOGANGUNIVERSITYTTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
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
/* HTML5 display-role reset for older browsers */
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
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'SOGANGUNIVERSITYTTF';
  background-color: ${(props)=>props.theme.bgColor};
  color: ${(props)=>props.theme.textColor}
}
a{
  text-decoration: none;
  color:inherit;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
    </>
  );
}

export default App;

I. Styled Component의 기초

1. Styled Component란?
Styled Component가 적용되지 않는 방식:
첫째, Css파일을 만들고 이 css파일을 JS파일에 import한다.
둘째, CSS를 직접 js Component에 style 속성으로 추가한다.
셋째, file.module.css 파일을 만들고, 이 파일 내부에 선언된 class들을 JSX 요소에 넣어준다.
```
import font from "./font.module.css"
<div className={style.font}>
```

이렇게 선언된 class이름들은 전부 겹치지 않도록 랜덤하게 정해진다는게 장점

그리고 styled Component는 위의 세 방식보다 한단계 발전한 방식이다.

[사용 순서]
(1) ```npm i styled-components```

(2)
```
const BoxOne = styled.div`
    background-color: blue;
    width: 100px;
    height: 100px;
`
```
(백틱 사용)
위와 같은 형태로 선언
(3) <BoxOne /> 형태로 Component를 사용한다.

장점: 태그마다 정해진 기능적인 명칭(ex div, input) 대신, 개발자가 읽을때 도움이 되는 사용자지정 명칭으로 써줄 수 있다. 이와 동시에 CSS문법과 동일한 방식으로 CSS를 써줄 수 있음. 또 className을 따로 만들어줄 필요 없는 모듈 방식과 동일하게 중복되지 않는 랜덤한 classname이 만들어진다.


2. Props를 사용하여 Styled Component의 style을 변경하는 방법(핵심적인 기능1)

(1) ```<Box bgColor="blue">```
(2)
```
const Box = styled.div`
    background-color: ${(props) => props.bgColor};
`
```

3. Component의 style과 html태그 상속
```
const Circle = styled(Box)`
    border-radius: 50px;
`
```
위와같이 써서 Box의 style을 상속해줄 수 있다. 이때 물론 2번에서의 props활용도 함께 상속된다.


4. Component의 style만 상속하고 태그는 상속하지 않는 법
//Btn은 이미 button태그로 component 선언이 이루어졌다고 가정한다.
```
<Btn as="a" href="/">
```


5. Component 선언과 동시에 attribute를 생성하는 법
(JSX에 선언해줄 수 있기 때문에 자주 쓰이진 않음)
```
const Input = styled.input.attrs({required: true})
```


6. animation의 경우 keframe을 component선언하듯이 선언해준다.
```
const rotationAnimation = keframes`
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(360deg);
    }
`
```


7. styled component는 scss처럼 pseudo selector의 사용이 가능하다.
```
const Box = styled.div`
    span{
        &:hover{

        }
    }
`
```

&기호: 현재

이런 pseudo selector 기능은 태그명으로 target하는 기존 기능처럼 만들어진 styled component명을 써서도 사용 가능하다.
```
const Box = styled.div`
    ${Circle}{
    }
`
```


8. dark mode등에 사용되는 Theme 기능

(1)
```
import {ThemeProvider} from "styled-components";
```

(2)
App component에 사용하고 싶은 기능이면 그 밖에 둘러싸서 사용한다.
```
ReactDom.render(
    <ThemeProvider>
        <App/>
    </ThemeProvider>
)
```

(3)
이때 ThemeProvider 의 props로 color에 관한 정보를 담은 object를 넣어준다.
```
const darkTheme = {
    textColor: "white",
    backgroundColor: "black"
}
...
    <ThemeProvider theme={darkTheme}>
        <App/>
    </ThemeProvider>
```

(4)
이제 App component내부에서 props로 사용한다.
```
color: ${(props) => props.theme.textColor};
```

<br/>
<br/>
II. 타입스크립트와의 연계 기초

1. 프로젝트 생성 방법
```
npx create-react-app 파일명 --template typescript
```

2. JS 패키지를 TS구조에 맞게 설치하는 법
```
npm install --save-dev @types/styled-components(패키지명)
```
type은 --save-dev로 개발에 도움이 되는 패키지로 취급하는 듯함.

3. Component의 props type을 설정해주는 방법
객체 형태로 전달해주는 방식이 가장 보편적이다.
이때 interface형식을 사용한다. C++에서 구조체 선언과 유사한 형식.
```
interface CircleProps {
    bgColor: string;
}
```
이후 함수형 component의 첫번째 인자에 props가 무엇이 있는지 선언하는 object를 전달하고, 이 object의 type을 :을 붙혀서 위에서 선언한 type을 넣어주면 된다.
```
function Circle({bgColor}: CircleProps){
    return <Container />;
}
```
물론 아래처럼 간단히 쓸수도 있다.
```
function Circle(props: CircleProps){
    return <Container />;
}
```

4. styled-component의 타입 선언 방식 역시 유사하다.
```
interface ContainerProps{
    background: string;
}
const Container = styled.div<ContainerProps>`
    background-color: ${(props)=>props.background}
`;
```

5. default props와 optional props
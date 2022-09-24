import React, {useState} from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'


const Auth = () => {
  const [toggle, setToggle] = useState(false)


  const toggler = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  return (
    <div>

{toggle && 
        <SignUpPage toggler={toggler}/>
}

{!toggle && 
        <LoginPage toggler={toggler} />
 }
    </div>
  )
}

export default Auth
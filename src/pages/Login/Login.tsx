import React from "react";
import FacebookLogin from "react-facebook-login";

class Login extends React.Component {
  responseFacebook(response: any) {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="781418293227278"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends,user_actions.books"
        callback={this.responseFacebook}
      />
    );
  }
}

export default Login;

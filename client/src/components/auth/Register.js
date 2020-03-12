import React ,{ Fragment ,useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';


export const Register = ({setAlert,register,isAuthenticated}) => {
    
  const [formData, setformData] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });
    const {name, email, password, password2} = formData;

    function onChange(e){
        setformData({ ...formData, [e.target.name]:e.target.value })
    }

    async function  onSubmit(e){
        e.preventDefault();
        if (password!==password2){
            setAlert("paswords do not match","danger")
        } else {
        try {
          register(name,email,password)
        } catch (err) {
            console.error(err)
        } 
            
        }

    }
    if (isAuthenticated){
      return <Redirect to="/dashboard"/>
    }
    return (
        <Fragment>
         <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit ={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required  value={name} onChange={e=> onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>   
        </Fragment>
    )
}

Register.propTypes=
{
setAlert:PropTypes.func.isRequired,
register:PropTypes.func.isRequired,
isAuthenticated:PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  setAlert,register
}



export default connect(mapStateToProps,mapDispatchToProps)(Register)
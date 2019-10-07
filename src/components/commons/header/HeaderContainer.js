import {connect} from 'react-redux'
import Header from './Header'

 const mapStateToProps = state => ({
     authStatus: state.appStore.authStatus
 })
 const mapDispatchToProps = dispatch => {
    return {
        onClickedSigninNavHandler: () =>{
        } 
    }
 }
 const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
 export default HeaderContainer;
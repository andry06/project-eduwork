import { useSelector } from "react-redux";

const IndexAccount = () => {
    let auth = useSelector(state => state.auth);

    if(auth.user !== null){
        return(
            <h4 className="text-start">SELAMAT DATANG DI HALAMAN ACCOUNT {auth.user.full_name.toUpperCase()}</h4>
        )
    }
}

export default IndexAccount;
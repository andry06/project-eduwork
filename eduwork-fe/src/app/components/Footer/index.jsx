const Footer = () => {
    const style = { position: 'fixed', bottom: '0', width: '100%'
     }
    return(
        <footer className="bg-primary text-white pt-2" style={style}>
            <p className="align-middle " >Created By <a href="#home" className="text-white text-decoration-none fw-bold" >Andri Suryono</a></p>
        </footer>
    )
}

export default Footer;
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";

const PageNotFound = () => {
    return(
        <>
        <TopBar />        
            <div style={{ marginTop: '15%' }}>  
                <h1>ERROR 404</h1>
                <h2 className="text-center">PAGE NOT FOUND</h2>
            </div>
        <Footer />
        </>
    )
}

export default PageNotFound;
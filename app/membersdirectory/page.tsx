import Abouthero from "../about/components/hero"
import MembersDirectory from "./components/Membersdirectory"
export default async function Home() {
    
 return(
    <div>
<Abouthero text="Explore our Members Directory" gradientText="Together We Thrive!"/>
<MembersDirectory/>
    </div>
 )
}
import Abouthero from "../about/components/hero"
import About from "../components/extras/about"
// import PollSection from "./components/pollsection"
export default async function Home() {
    
 return(
    <div>
<Abouthero text="We value your opinions and insights." gradientText="Join our quick poll!"/>
{/* <PollSection /> */}
<About/>
    </div>
 )
}
import "semantic-ui-css/semantic.min.css";
import './App.css'
import { CreateToken } from './components/CreateToken'
export default async function App() {
    return (
        <div className='App'>
            <CreateToken />
        </div>
    )

}

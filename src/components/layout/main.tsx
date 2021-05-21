import routes from '@/router/index';
import {
    Switch,
    Route,
} from 'react-router-dom';

function Main() {
    return (
        <Switch>
            {
                routes.map((i, key) => (
                    <Route path={i.path} key={key}>
                        <i.component/>
                    </Route>
                ))
            }
        </Switch>
    )
}

export default Main;
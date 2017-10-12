import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import ListOrders from './pages/ListOrders'
import AddFarmer from './pages/AddFarmer'
import AllocateOrder from './pages/AllocateOrder'
import Homepage from './pages/AllocateOrder'

const routes={
    login: { screen: Login },
    placeOrder: { screen: PlaceOrder },
    listOrders: { screen: ListOrders },
    allocateOrder: { screen: AllocateOrder },
    addFarmer: { screen: AddFarmer },
    homepage: {screen: Homepage},
}

export default routes
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import ListOrders from './pages/ListOrders'
import AddFarmer from './pages/AddFarmer'
import AllocateOrder from './pages/AllocateOrder'
import Homepage from './pages/Homepage'
import OrderProgress from './pages/OrderProgress'
import ListFarmers from './pages/ListFarmers'

const routes={
    login: { screen: Login },
    placeOrder: { screen: PlaceOrder },
    listOrders: { screen: ListOrders },
    allocateOrder: { screen: AllocateOrder },
    addFarmer: { screen: AddFarmer },
    homepage: {screen: Homepage},
    orderProgress: {screen: OrderProgress},
    listFarmers: {screen: ListFarmers}
}

export default routes
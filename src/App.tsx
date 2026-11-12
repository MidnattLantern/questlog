import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './pages/RootLayout'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import GameCollection from './pages/gameCollection/GameCollection'
import CreateGame from './pages/createGame/CreateGame'
import EditGame from './pages/editGame/EditGame'
import GameDetail from './pages/gameDetail/GameDetail'

const router = createBrowserRouter([
	{
		path: '/',
		Component: RootLayout,
		children: [
			{index: true, Component: GameCollection},
			{path: '*', Component: PageNotFound},
			{path: 'create', Component: CreateGame},
			{path: 'detail/:id', Component: GameDetail},
			{path: 'details/:id', Component: GameDetail}, // in case some users manually type in URL and end with 's'
			{path: 'edit/:id', Component: EditGame}
		]
	}
])

function App() {
	return <RouterProvider router={router}/>
}

export default App

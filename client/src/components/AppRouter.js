import React, {useContext, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'


export const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Switch >
            { user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact></Route>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact></Route>
            )}
            <Redirect to={SHOP_ROUTE}></Redirect>
        </Switch>
    )
})

export default AppRouter

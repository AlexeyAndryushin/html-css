import React, { SyntheticEvent } from 'react'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import './Menu.scss'

interface IMenuProps {
	findList?: () => void;
	isAuth: boolean;
	handleLogout: (event: SyntheticEvent) => void;
}

export const Menu: React.FC<IMenuProps> = ({ findList, isAuth, handleLogout }) => {

	return (
		<menu className="menu">
			<Button title="узнать список компаний" onClick={findList} />

			{isAuth ? <> <Button title="выйти" onClick={handleLogout} /> <Link to="/about" className="menu__linkText">
				Ещё одна страница
			</Link> </> : null}
		</menu>
	)
}


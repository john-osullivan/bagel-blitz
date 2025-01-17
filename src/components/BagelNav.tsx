import { useLocation } from 'react-router';
import { Navbar, NavbarItem } from './ui/navbar';
import { useGameContext } from '../context/gameContext';

export function BagelNav() {
    const { activeGame } = useGameContext();
    const { pathname } = useLocation();
    const headerTextStyles = 'bg-steel-blue-700 text-xl font-bold py-1 px-2 text-steel-blue-100 rounded';
    const playing = activeGame && pathname == '/play';
    return (
        <Navbar className="fixed top-0 left-0 w-full bg-steel-blue-300 py-0 h-14">
            <NavbarItem className='w-1/3 justify-items-start'>
                {playing && (
                    <span className={headerTextStyles}>Round {activeGame.currentRound}</span>
                )}
            </NavbarItem>

            <NavbarItem className='w-1/3 justify-items-center'>
                {playing && activeGame?.currentPlayer && (
                    <span className={headerTextStyles}>{activeGame.currentPlayer}</span>
                )}
            </NavbarItem>

            <NavbarItem href="/" className='w-1/3 justify-items-end'>
                <img src="/simple-bagel-blitz-fullsize.png" alt="Bagel Blitz" className="h-10" />
            </NavbarItem>
        </Navbar>
    )
}

export default BagelNav;